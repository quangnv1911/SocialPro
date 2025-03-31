package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.InvalidToken;
import com.spring.social_pro.backend.entity.ProductDetail;
import com.spring.social_pro.backend.enums.Duration;
import com.spring.social_pro.backend.enums.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductDetailRepository extends JpaRepository<ProductDetail, UUID> {
    Page<ProductDetail> findByStatus(ProductStatus status, Pageable pageRequest);
    Optional<ProductDetail> findFirstByProductIdAndStatus(UUID productId, ProductStatus status);
    /**
     * Find a specific number of product details by product ID and status, ordered by creation date
     * 
     * @param productId The product ID
     * @param status The status to filter by
     * @return A list of product details
     */
    List<ProductDetail> findByProductIdAndStatusAndDurationOrderByCreatedAtAsc(UUID productId, ProductStatus status, Duration duration);
}
