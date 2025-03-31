package com.spring.social_pro.backend.dto.data.message;

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
public class OrderDetailMessage {

    UUID orderId;
    UUID orderDetailId;
    UUID productId;
    UUID mmoResourceId;
    String cronjobKey;
    Duration duration;
    int quantity;
}