package com.spring.social_pro.backend.dto.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentCallbackData {
    @JsonProperty("transaction_id")
    String transactionId;
    BigDecimal amount;
    String content;
    LocalDate date;

    @JsonProperty("account_receiver")
    String accountReceiver;
    String gate;
}
