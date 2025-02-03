package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.ValidateToken;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ValidateTokenRepository extends JpaRepository<ValidateToken, UUID> {
    boolean existsById(@NonNull UUID id);
}

