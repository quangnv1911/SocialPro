package com.spring.social_pro.backend.dto.response.order;

import com.spring.social_pro.backend.enums.BigCategory;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    UUID id;
    BigDecimal amount;
    UUID userId;
    BigCategory category;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    List<OrderDetailResponse> orderDetails;
}