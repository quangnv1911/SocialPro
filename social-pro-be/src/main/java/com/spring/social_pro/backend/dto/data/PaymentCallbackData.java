package com.spring.social_pro.backend.dto.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class PaymentCallbackData {
    @JsonProperty("transaction_id")
    String transactionId;
    Long amount;
    String content;
    LocalDate date;

    @JsonProperty("account_receiver")
    String accountReceiver;
    String gate;
}
