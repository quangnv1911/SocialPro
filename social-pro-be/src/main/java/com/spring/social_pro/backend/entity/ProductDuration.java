package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import com.spring.social_pro.backend.enums.Duration;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "product_duration")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDuration extends BaseEntity<UUID> {
    @Column(name = "duration", nullable = false)
    @Enumerated(EnumType.STRING)
    Duration duration;

    @Column(name = "price")
    BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;
}
