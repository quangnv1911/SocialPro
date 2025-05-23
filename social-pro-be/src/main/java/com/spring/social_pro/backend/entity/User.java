package com.spring.social_pro.backend.entity;

import com.spring.social_pro.backend.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "user")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends BaseEntity<UUID> {

    @Column(name = "email", nullable = false, unique = true)
    @NotNull
    @Email
    String email;

    @Column(name = "password", nullable = false)
    String password;

    @Column(name = "name", nullable = false)
    String userName;

    @Column(name = "avatar")
    String avatar;

    @Column(name = "money")
    @Builder.Default
    BigDecimal money = BigDecimal.ZERO;

    @Column(name = "phone")
    String phone;

    @Column(name = "time_forgot_password")
    String timeForgotPassword;

    @Column(name = "dob")
    @DateTimeFormat(pattern = "yyyy/MM/dd")
    LocalDate dob;

    @Column(name = "ranking")
    String ranking;

    @Column(name = "otp")
    String otp;

    @Column(name = "otp_expiry_date")
    LocalDateTime otpExpiryDate;

    @Column(name = "enabled")
    @Builder.Default
    Boolean enabled = false;

    @Column(name = "api_key")
    String apiKey;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    Role role;

    @OneToMany
    Set<ProductDetail> productDetails;
}
