package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.UUID;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "invalid_token")
public class InvalidToken extends BaseEntity<UUID> {
    @Column(name = "token_value", nullable = false)
    String tokenValue;

    @Column(name = "expiry_time", nullable = false)
    Date expiryTime;
}
