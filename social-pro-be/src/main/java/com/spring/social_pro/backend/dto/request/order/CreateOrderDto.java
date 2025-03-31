package com.spring.social_pro.backend.dto.request.order;

import com.spring.social_pro.backend.dto.request.orderDetail.CreateOrderDetailDto;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderDto {
    List<CreateOrderDetailDto> orderDetails;
}
