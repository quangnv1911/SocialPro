package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "payment_history")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentHistory extends BaseEntity<Long> {
    @Column(precision = 19, scale = 2, name = "amount", nullable = false)
    BigDecimal amount;

    @Column(name = "message")
    String message;

    @Column(name = "balance_before")
    BigDecimal balanceBefore;

}
