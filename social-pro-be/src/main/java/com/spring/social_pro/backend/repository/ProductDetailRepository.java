package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.InvalidToken;
import com.spring.social_pro.backend.entity.ProductDetail;
import com.spring.social_pro.backend.enums.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductDetailRepository extends JpaRepository<ProductDetail, UUID> {
    Page<ProductDetail> findByStatus(ProductStatus status, Pageable pageRequest);
}
