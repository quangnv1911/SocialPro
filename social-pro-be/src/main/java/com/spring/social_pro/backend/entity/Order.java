package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "order")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order  extends BaseEntity {
    @Column(name = "amount", nullable = false)
    Long amount;
}
