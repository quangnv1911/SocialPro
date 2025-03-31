package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import com.spring.social_pro.backend.enums.Duration;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.w3c.dom.Text;

import java.math.BigDecimal;
import java.util.*;

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

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    List<ProductDuration> durations;

    @Column(name = "total_sold")
    @Builder.Default
    Integer totalSold = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    Category category;


    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    Set<ProductDetail> details;


}
