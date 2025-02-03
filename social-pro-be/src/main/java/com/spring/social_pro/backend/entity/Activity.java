package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import com.spring.social_pro.backend.enums.ActivityType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "activity")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Activity extends BaseEntity {
    @Column(name = "type", nullable = false, unique = true)
    ActivityType type;
}