package com.spring.social_pro.backend.dto.response.payment;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GeneratePaymentResponse {
    Long id;
    String content;
    BigDecimal amount;
    String gate;
    String accountName;
    String accountNumber;
    String qrCodeUrl;
}
