package com.spring.social_pro.backend.service.impl;

import com.spring.social_pro.backend.dto.data.message.OrderDetailMessage;
import com.spring.social_pro.backend.dto.request.order.CreateOrderDto;
import com.spring.social_pro.backend.dto.request.order.OrderFilterRequest;
import com.spring.social_pro.backend.dto.request.orderDetail.CreateOrderDetailDto;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.order.OrderResponse;
import com.spring.social_pro.backend.entity.*;
import com.spring.social_pro.backend.enums.BigCategory;
import com.spring.social_pro.backend.enums.OrderStatus;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.mapper.OrderMapper;
import com.spring.social_pro.backend.repository.*;
import com.spring.social_pro.backend.repository.specification.OrderSpecification;
import com.spring.social_pro.backend.repository.specification.UserSpecification;
import com.spring.social_pro.backend.service.IOrderService;
import com.spring.social_pro.backend.service.ITelegramService;
import com.spring.social_pro.backend.service.IUserService;
import com.spring.social_pro.backend.util.PaginationUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Scheduler;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService implements IOrderService {
    OrderRepository orderRepository;
    IUserService userService;
    OrderDetailRepository orderDetailRepository;
    ProductRepository productRepository;
    ProductDurationRepository productDurationRepository;
    UserRepository userRepository;
    ITelegramService telegramService;
    RabbitMQSender rabbitMQSender;
    OrderMapper orderMapper;

    // Update the createNewOrder method to send messages to RabbitMQ
    @Override
    public UUID createNewOrder(CreateOrderDto createOrderDto) {
        var user = userService.getCurrentUser();
        log.info("Creating new order for user with id: {}", user.getId());

        // Calculate total price based on order details and category
        BigDecimal totalPrice = calculateTotalPrice(createOrderDto);

        // Check if user has enough balance
        BigDecimal userBalance = user.getMoney();
        if (userBalance.compareTo(totalPrice) < 0) {
            String errorMessage = String.format("Insufficient balance. Required: %s, Available: %s",
                    totalPrice, userBalance);
            log.error(errorMessage);
            telegramService
                    .sendMessage("User " + user.getEmail() + " failed to place order due to insufficient balance");
            throw new AppException(ErrorCode.INSUFFICIENT_BALANCE);
        }

        // Deduct money from user's account
        user.setMoney(userBalance.subtract(totalPrice));
        userRepository.save(user);

        // Create and save the order
        Order order = Order.builder()
                .user(user)
                .amount(totalPrice)
                .build();

        Order savedOrder = orderRepository.save(order);
        // Create and save order details
        List<OrderDetail> orderDetails = createOrderDetails(savedOrder, createOrderDto.getOrderDetails());
        var listOrderDetails = orderDetailRepository.saveAll(orderDetails);

        // Send order details to RabbitMQ for processing
        for (OrderDetail detail : listOrderDetails) {
            OrderDetailMessage message = OrderDetailMessage.builder()
                    .orderDetailId(detail.getId())
                    .orderId(savedOrder.getId())
                    .productId(detail.getProductId())
                    .mmoResourceId(detail.getMmoResourceId())
                    .cronjobKey(detail.getCronjobKey())
                    .duration(detail.getDuration())
                    .quantity(detail.getQuantity())
                    .build();

            rabbitMQSender.sendOrderDetailMessage(message);
        }

        // Send notification about successful order
        telegramService.sendMessage("User " + user.getEmail() + " placed a new order #" + savedOrder.getId() +
                " for " + totalPrice + ". New balance: " + user.getMoney());

        return savedOrder.getId();
    }

    @Override
    public PageResponse<OrderResponse> getOrders(OrderFilterRequest request) {
        Pageable pageRequest = PaginationUtil.createPageRequest(
                request.getPage(), request.getPageSize(), request.getSortBy(), request.getSortOrder()
        );
        UUID userId = userService.getCurrentUser().getId();
        Specification<Order> spec = OrderSpecification.filterOrders(request.getName(), userId);
        var orders =  orderRepository.findAll(spec, pageRequest);
        return PageResponse.fromPage(orders, orderMapper::toOrderResponse);

    }

    @Override
    public OrderResponse getOrderDetail(UUID id) {
        var order = orderRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Order not found: {}", id);
                    return new AppException(ErrorCode.ORDER_NOT_FOUND);
                });
        return orderMapper.toOrderResponse(order);
    }

    private BigDecimal calculateTotalPrice(CreateOrderDto createOrderDto) {
        return createOrderDto.getOrderDetails().stream()
                .map(this::getPriceByItem)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private List<OrderDetail> createOrderDetails(Order order, List<CreateOrderDetailDto> detailDtos) {
        List<OrderDetail> orderDetails = new ArrayList<>();

        for (CreateOrderDetailDto dto : detailDtos) {
            OrderDetail detail = OrderDetail.builder()
                    .order(order)
                    .category(dto.getCategory())
                    .productId(dto.getProductId())
                    .mmoResourceId(dto.getMmoResourceId())
                    .cronjobKey(dto.getCronjobKey())
                    .status(OrderStatus.PENDING)
                    .quantity(dto.getQuantity())
                    .duration(dto.getDuration())
                    .build();
            orderDetails.add(detail);
        }

        return orderDetails;
    }

    private void processCronJobOrder(Order order, CreateOrderDto createOrderDto) {
        // Implement cronjob-specific processing
        log.info("Processing cronjob order: {}", order.getId());
        // Example: Schedule jobs using the scheduler
        createOrderDto.getOrderDetails().forEach(detail -> {
            try {
                // Schedule job logic would go here
                log.info("Scheduling job with key: {}", detail.getCronjobKey());
            } catch (Exception e) {
                log.error("Error scheduling job: {}", e.getMessage(), e);
            }
        });
    }

    private BigDecimal getPriceByItem(CreateOrderDetailDto orderDetail) {
        return switch (orderDetail.getCategory()) {
            case Product -> productRepository.findById(orderDetail.getProductId())
                    .flatMap(product -> productDurationRepository.findByProduct_IdAndDuration(
                                    orderDetail.getProductId(), orderDetail.getDuration())
                            .map(ProductDuration::getPrice))
                    .orElse(BigDecimal.ZERO);
            case CronJob -> BigDecimal.valueOf(15000);
            // Add other category pricing as needed
            default -> BigDecimal.ZERO;
        };
    }
}
