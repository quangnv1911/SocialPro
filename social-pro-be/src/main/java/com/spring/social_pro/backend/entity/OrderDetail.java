package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import com.spring.social_pro.backend.enums.BigCategory;
import com.spring.social_pro.backend.enums.Duration;
import com.spring.social_pro.backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import net.minidev.json.annotate.JsonIgnore;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "order_detail")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetail extends BaseEntity<UUID> {

    @Column(name = "product_id")
    UUID productId;

    @Column(name = "mmo_resource_id")
    UUID mmoResourceId;

    @Column(name = "cronjob_key")
    String cronjobKey;

    @Column(name= "status")
    @Enumerated(EnumType.STRING)
    OrderStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    BigCategory category;

    @Column(name = "quantity", nullable = false)
    @Builder.Default
    Integer quantity = 0;

    @Column(name = "duration")
    @Enumerated(EnumType.STRING)
    Duration duration;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    Order order;

    @OneToMany(mappedBy = "orderDetail", cascade = CascadeType.ALL)
    List<OrderDetailProduct> orderDetailProducts;
}
