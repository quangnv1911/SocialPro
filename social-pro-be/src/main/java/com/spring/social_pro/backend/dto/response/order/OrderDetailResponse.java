package com.spring.social_pro.backend.dto.response.order;

import com.spring.social_pro.backend.dto.response.productDetail.ProductDetailResponse;
import com.spring.social_pro.backend.entity.ProductDetail;
import com.spring.social_pro.backend.enums.BigCategory;
import com.spring.social_pro.backend.enums.Duration;
import com.spring.social_pro.backend.enums.OrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailResponse {
    UUID id;
    UUID productId;
    UUID mmoResourceId;
    String cronjobKey;
    OrderStatus status;
    BigCategory category;
    Integer quantity = 0;
    Duration duration;
    List<ProductDetailResponse> productDetails = new ArrayList<>();
}