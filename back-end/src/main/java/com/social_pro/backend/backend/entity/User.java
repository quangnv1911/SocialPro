package com.social_pro.backend.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends BaseEntity{
    @Column(name = "email", nullable = false, unique = true)
    @NotNull
    @Email
    String email;

    @Column(name = "password")
    String password;

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "first_name", nullable = false)
    String firstName;

    @Column(name = "last_name", nullable = false)
    String lastName;

    @Column(name = "avatar")
    String avatar;

    @Column(name = "phone")
    String phone;

    @Column(name = "dob")
    @DateTimeFormat(pattern = "yyyy/MM/dd")
    LocalDate dob;

    @Column(name = "otp")
    String otp;

    @Column(name = "otp_expiry_date")
    LocalDateTime otpExpiryDate;

    @Column(name = "address")
    String address;

    @Column(name = "description", columnDefinition = "MEDIUMTEXT")
    String description;

    @Column(name = "enabled")
    Boolean enabled;
}
