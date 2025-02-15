package com.spring.social_pro.backend.dto.response.payment;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GeneratePaymentResponse {
    String content;
    Long amount;
    String gate;
    UUID userId;
}
