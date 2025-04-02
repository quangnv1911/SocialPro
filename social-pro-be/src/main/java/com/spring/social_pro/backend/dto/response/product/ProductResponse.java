package com.spring.social_pro.backend.dto.response.product;

import com.spring.social_pro.backend.dto.response.productDuration.ProductDurationResponse;
import com.spring.social_pro.backend.enums.Duration;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    UUID id;
    String name;
    String description;
    BigDecimal price;
    Integer quantity;
    String image;
    LocalDateTime createdAt;
    List<ProductDurationResponse> durations;

}
