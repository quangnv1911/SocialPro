package com.spring.social_pro.backend.dto.request.orderDetail;

import com.spring.social_pro.backend.enums.BigCategory;
import com.spring.social_pro.backend.enums.Duration;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderDetailDto {
    UUID productId;
    UUID mmoResourceId;
    String cronjobKey;

    int quantity;
    Duration duration;
    BigCategory category;
}
