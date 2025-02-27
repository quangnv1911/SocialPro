package com.spring.social_pro.backend.dto.request.paymentHistory;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreatePaymentHistoryRequest {
    String bankName;
}
