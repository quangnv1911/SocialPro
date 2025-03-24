package com.spring.social_pro.backend.dto.data;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentCacheData implements Serializable {
    String content;
    BigDecimal amount;
    String gate;
    UUID userId;
    Long id;
}
