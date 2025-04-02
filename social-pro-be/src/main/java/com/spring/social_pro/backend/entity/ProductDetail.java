package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import com.spring.social_pro.backend.enums.Duration;
import com.spring.social_pro.backend.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Table(name = "product_detail")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetail extends BaseEntity<UUID> {
    String data;

    @Column(name = "duration")
    @Enumerated(EnumType.STRING)
    Duration duration;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    ProductStatus status = ProductStatus.NotPurchased;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @ManyToOne
    @JoinColumn(name = "order_detail_id")
    OrderDetail orderDetail;
}
