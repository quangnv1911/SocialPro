package com.spring.social_pro.backend.mapper;

import com.spring.social_pro.backend.dto.response.order.OrderDetailResponse;
import com.spring.social_pro.backend.dto.response.order.OrderResponse;
import com.spring.social_pro.backend.entity.Order;
import com.spring.social_pro.backend.entity.OrderDetail;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(builder = @Builder(disableBuilder = true))
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    @Mapping(source = "user.id", target = "userId")
    OrderResponse toOrderResponse(Order order);
    
    OrderDetailResponse toOrderDetailResponse(OrderDetail orderDetail);
    
    default OrderResponse toOrderResponseWithDetails(Order order, List<OrderDetail> details) {
        OrderResponse response = toOrderResponse(order);
        response.setOrderDetails(details.stream()
                .map(this::toOrderDetailResponse)
                .collect(Collectors.toList()));
        return response;
    }
}
