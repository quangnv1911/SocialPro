package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.request.order.CreateOrderDto;
import com.spring.social_pro.backend.dto.request.order.OrderFilterRequest;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.order.OrderResponse;

import java.util.UUID;

public interface IOrderService {
    UUID createNewOrder(CreateOrderDto createOrderDto);
    PageResponse<OrderResponse> getOrders(OrderFilterRequest request);
}
