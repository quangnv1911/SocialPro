package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.InvalidToken;
import com.spring.social_pro.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    Page<Product> findByNameContaining(String name, Pageable pageRequest);
}
