package com.spring.social_pro.backend.base;


import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

import lombok.AccessLevel;
import jakarta.persistence.*;

import java.time.LocalDateTime;

import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@MappedSuperclass
@SQLRestriction("is_deleted = false")
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    UUID id;


    // Auditable
    @Column(name = "created_by", updatable = false)
    @CreatedBy
    String createdBy;

    @Column(name = "updated_by")
    @LastModifiedBy
    String updatedBy;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    LocalDateTime updatedAt;


    // Deleteable
    @Column(name = "is_deleted", nullable = false)
    boolean isDeleted = false; // Trạng thái xóa

    @Column(name = "deleted_at")
    LocalDateTime deletedAt; // Thời gian bị xóa

    @Column(name = "deleted_by")
    String deletedBy; // Ai thực hiện xóa
}
