package com.spring.social_pro.backend.service.impl;

import com.spring.social_pro.backend.configuration.rabbitMQ.RabbitMQConfig;
import com.spring.social_pro.backend.dto.data.message.OrderDetailMessage;
import com.spring.social_pro.backend.entity.OrderDetail;
import com.spring.social_pro.backend.entity.OrderDetailProduct;
import com.spring.social_pro.backend.entity.Product;
import com.spring.social_pro.backend.entity.ProductDetail;
import com.spring.social_pro.backend.enums.OrderStatus;
import com.spring.social_pro.backend.enums.ProductStatus;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.repository.OrderDetailRepository;
import com.spring.social_pro.backend.repository.ProductDetailRepository;
import com.spring.social_pro.backend.repository.ProductRepository;
import com.spring.social_pro.backend.service.ITelegramService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
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
public class OrderDetailService {
    OrderDetailRepository orderDetailRepository;
    ProductRepository productRepository;
    ProductDetailRepository productDetailRepository;
    ITelegramService telegramService;

    @RabbitListener(queues = RabbitMQConfig.ORDER_QUEUE)
    @Transactional
    public void processOrderDetail(OrderDetailMessage message) {
        log.info("Processing order detail: {}", message);

        try {
            // Tìm OrderDetail
            OrderDetail orderDetail = findOrderDetail(message.getOrderDetailId());
            switch (orderDetail.getCategory()){
                case Product -> processProductOrder(orderDetail, message);
                case CronJob ->  processCronJobOrder(orderDetail);
                default -> {
                    log.warn("Order detail {} does not contain valid category", message.getOrderDetailId());
                }
            }
        } catch (Exception e) {
            handleProcessingError(message.getOrderDetailId(), e);
        }
    }

    private OrderDetail findOrderDetail(UUID orderDetailId) {
        return orderDetailRepository.findById(orderDetailId)
                .orElseThrow(() -> {
                    log.error("Order detail not found: {}", orderDetailId);
                    return new AppException(ErrorCode.ORDER_DETAIL_NOT_FOUND);
                });
    }

    private void processProductOrder(OrderDetail orderDetail, OrderDetailMessage message) {
        Product product = productRepository.findById(message.getProductId())
                .orElseThrow(() -> {
                    log.error("Product not found: {}", message.getProductId());
                    return new AppException(ErrorCode.PRODUCT_NOT_FOUND);
                });

        int quantity = message.getQuantity() > 0 ? message.getQuantity() : 1;
        
        if (productRepository.countProductDetails(product.getId(), ProductStatus.NotPurchased, message.getDuration()) < quantity) {
            handleOutOfStock(orderDetail, product, quantity);
            return;
        }

        // Get available product details based on quantity
        List<ProductDetail> availableProductDetails = productDetailRepository
                .findByProductIdAndStatusAndDurationOrderByCreatedAtAsc(product.getId(), ProductStatus.NotPurchased, message.getDuration())
                .stream()
                .limit(quantity)
                .toList();

        
        // Initialize the list if it's null
        if (orderDetail.getOrderDetailProducts() == null) {
            orderDetail.setOrderDetailProducts(new ArrayList<>());
        }
        
        // Process each product detail
        for (ProductDetail productDetail : availableProductDetails) {
            // Update the product detail status to purchased
            productDetail.setStatus(ProductStatus.Purchased);
            productDetailRepository.save(productDetail);
            
            // Create the association between order detail and product detail
            OrderDetailProduct orderDetailProduct = OrderDetailProduct.builder()
                    .orderDetail(orderDetail)
                    .productDetail(productDetail)
                    .build();
            
            // Add to the list
            orderDetail.getOrderDetailProducts().add(orderDetailProduct);
            
            log.info("Associated product detail {} with order detail {}", 
                    productDetail.getId(), orderDetail.getId());
        }
        
        // Save the order detail with the new associations
        orderDetailRepository.save(orderDetail);
        
        markOrderDetailAsDone(orderDetail);

        log.info("Successfully processed order detail: {}, assigned {} product details", 
                orderDetail.getId(), quantity);
        telegramService.sendMessage("Order detail " + orderDetail.getId() +
                " for product " + product.getName() + " processed successfully with " + 
                quantity + " items");
    }

    private void processCronJobOrder(OrderDetail orderDetail) {
        markOrderDetailAsDone(orderDetail);
        log.info("Successfully processed cron job order detail: {}", orderDetail.getId());
    }

    private void handleOutOfStock(OrderDetail orderDetail, Product product, int requiredQuantity) {
        log.error("Product out of stock. Required: {}, Available: {}", requiredQuantity, productRepository.countProductDetails(product.getId(), ProductStatus.NotPurchased, orderDetail.getDuration()));
        telegramService.sendMessage("Order detail " + orderDetail.getId() +
                " failed due to insufficient stock for product " + product.getName());

        orderDetail.setStatus(OrderStatus.OUT_OF_STOCK);
        orderDetailRepository.save(orderDetail);
    }

    private void markOrderDetailAsDone(OrderDetail orderDetail) {
        orderDetail.setStatus(OrderStatus.DONE);
        orderDetailRepository.save(orderDetail);
    }

    private void handleProcessingError(UUID orderDetailId, Exception e) {
        log.error("Error processing order detail: {}", orderDetailId, e);
        telegramService.sendMessage("Error processing order detail " + orderDetailId +
                ": " + e.getMessage());
    }

}