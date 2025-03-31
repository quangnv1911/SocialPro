package com.spring.social_pro.backend.dto.response.productDuration;


import com.spring.social_pro.backend.enums.Duration;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDurationResponse {
    UUID id;
    Duration duration;
    BigDecimal price;
}
