package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "coupon")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Coupon  extends BaseEntity {
    @Column(name = "code", nullable = false)
    String code;

    @Column(name = "amount", nullable = false)
    Integer amount;

    @Column(name = "used", nullable = false)
    Integer used;

    @Column(name = "discount", nullable = false)
    Long discount;
}
