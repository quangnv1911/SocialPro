package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.w3c.dom.Text;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "product")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product extends BaseEntity<UUID> {
    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "price", nullable = false)
    @Builder.Default
    BigDecimal price = BigDecimal.valueOf(0);

    @Column(name = "image")
    String image;
    @Column(name = "description", columnDefinition = "Text")
    String description;

    @Column(name = "quantity")
    @Builder.Default
    Integer quantity = 0;

    @OneToMany
    Set<ProductDetail> details;
}
