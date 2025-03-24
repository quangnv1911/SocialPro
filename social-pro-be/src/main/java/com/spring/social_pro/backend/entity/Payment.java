package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import com.spring.social_pro.backend.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Entity
@Table(name = "payment")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Payment extends BaseEntity<Long> {
    @Column(precision = 19, scale = 2, name = "amount", nullable = false)
    BigDecimal amount;

    @Column(name = "gate")
    String gate;

    @Column(name = "transaction_id")
    String transactionId;

    @Column(name = "content")
    String content;

    @Column(name = "balance_before")
    BigDecimal balanceBefore;

    @Column(name = "balance_after")
    BigDecimal balanceAfter;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    PaymentStatus status = PaymentStatus.Pending;

    @Version
    @Column(name = "VERSION")
    long version;
}
