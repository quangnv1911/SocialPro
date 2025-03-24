package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import com.spring.social_pro.backend.enums.ActivityType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@Table(name = "activity")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Activity extends BaseEntity<UUID> {
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    ActivityType type;

    @Column(name = "ip", nullable = false)
    String ip;

    @Column(name = "message", nullable = true)
    String message;
}