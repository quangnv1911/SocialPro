package com.spring.social_pro.backend.dto.request.payment;

import com.spring.social_pro.backend.dto.data.PaymentCallbackData;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentCallbackRequest {
    String token;
    PaymentCallbackData payment;
}
