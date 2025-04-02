package com.spring.social_pro.backend.dto.response.productDetail;

import com.spring.social_pro.backend.enums.Duration;
import com.spring.social_pro.backend.enums.ProductStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetailResponse {
    UUID id;
    String data;
    Duration duration;
    ProductStatus status;
}
