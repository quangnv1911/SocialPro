package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import com.spring.social_pro.backend.enums.BigCategory;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order extends BaseEntity<UUID> {
    @Column(name = "amount", nullable = false)
    BigDecimal amount;

    @Column(name = "user_id", insertable = false, updatable = false)
    UUID userId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    List<OrderDetail> orderDetails;

}
