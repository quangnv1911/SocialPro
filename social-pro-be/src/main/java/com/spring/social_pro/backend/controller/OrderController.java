package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.dto.request.ApiRequest;
import com.spring.social_pro.backend.dto.request.job.JobFilterRequest;
import com.spring.social_pro.backend.dto.request.order.CreateOrderDto;
import com.spring.social_pro.backend.dto.request.order.OrderFilterRequest;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.order.OrderResponse;
import com.spring.social_pro.backend.service.IOrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${apiPrefix}/order")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Orders", description = "API for order management")
public class OrderController {
    IOrderService orderService;
    
    @PostMapping("")
    public ApiResponse<?> createOrder(
            @RequestBody ApiRequest<CreateOrderDto> request) {
        
        // Create the order
        UUID orderId = orderService.createNewOrder(request.getData());
        
        return ApiResponse.<UUID>builder()
                .status(HttpStatus.CREATED.value())
                .data(orderId)
                .message("Order created successfully")
                .build();
    }

    @GetMapping("")
    public ApiResponse<?> getAllOrders(@ModelAttribute OrderFilterRequest request) {
        var orders = orderService.getOrders(request);

        return ApiResponse.<PageResponse<OrderResponse>>builder()
                .status(HttpStatus.CREATED.value())
                .data(orders)
                .message("Order created successfully")
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getOrderDetail(@PathVariable UUID id) {
        var order = orderService.getOrderDetail(id);

        return ApiResponse.<OrderResponse>builder()
                .status(HttpStatus.CREATED.value())
                .data(order)
                .message("Order created successfully")
                .build();
    }
    // Additional endpoints for order management can be added here
    // For example: getOrders, getOrderById, cancelOrder, etc.
}