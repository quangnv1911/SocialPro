package com.spring.social_pro.backend.dto.request.payment;

import com.spring.social_pro.backend.dto.data.PaymentCallbackData;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class PaymentCallbackRequest {
    String token;
    PaymentCallbackData payment;
}
