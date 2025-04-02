package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.ProductDetail;
import com.spring.social_pro.backend.entity.ProductDuration;
import com.spring.social_pro.backend.enums.Duration;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductDurationRepository extends JpaRepository<ProductDuration, UUID> {
    @EntityGraph(attributePaths = "product")
    Optional<ProductDuration> findByProduct_IdAndDuration(UUID productId, Duration duration);

}
