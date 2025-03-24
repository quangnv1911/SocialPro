package com.spring.social_pro.backend.dto.request.product;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductCreateDto {
    String name;
    String description;
    BigDecimal price;
    String image;
    LocalDateTime createdAt;
}
