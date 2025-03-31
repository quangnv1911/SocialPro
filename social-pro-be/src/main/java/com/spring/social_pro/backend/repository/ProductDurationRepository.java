package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.ProductDetail;
import com.spring.social_pro.backend.entity.ProductDuration;
import com.spring.social_pro.backend.enums.Duration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductDurationRepository extends JpaRepository<ProductDuration, UUID> {
    Optional<ProductDuration> findByIdAndDuration(UUID productDetail, Duration duration);
}
