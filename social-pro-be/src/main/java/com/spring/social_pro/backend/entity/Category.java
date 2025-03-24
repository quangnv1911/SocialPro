package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import com.spring.social_pro.backend.enums.BigCategory;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Table(name = "category")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Category  extends BaseEntity<UUID> {
    @Column(name = "name")
    String name;
    @Column(name = "description")
    String description;
    @Column(name = "image")
    String image;

    @Enumerated(EnumType.STRING)
    @Column(name = "big_category", nullable = false)
    BigCategory bigCategory;
}
