package com.spring.social_pro.backend.dto.response.payment;

import co.elastic.clients.util.DateTime;
import com.spring.social_pro.backend.enums.PaymentStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentResponse {
    Long id;
    String gate;
    BigDecimal amount;
    @Enumerated(EnumType.STRING)
    PaymentStatus status;
    LocalDateTime createdAt;
    BigDecimal balanceBefore;
    BigDecimal balanceAfter;
}
