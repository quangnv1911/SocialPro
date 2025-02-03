package com.spring.social_pro.backend.dto.request.payment;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentGenerateRequest {
    Long amount;
    String gate;
}
