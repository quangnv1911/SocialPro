package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.category.CategoryResponse;
import com.spring.social_pro.backend.entity.Activity;
import com.spring.social_pro.backend.entity.Category;
import com.spring.social_pro.backend.enums.BigCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID>, JpaSpecificationExecutor<Category> {
    Page<Category> findByNameContaining(String name, Pageable pageRequest);

    @Query("SELECT c FROM Category c " +
            "JOIN FETCH c.products p " +
            "WHERE p.id IN (SELECT p2.id FROM Product p2 WHERE p2.category = c ORDER BY p2.createdAt ASC LIMIT 10)")
    List<Category> findAllWithLimitedProducts();

   List<Category> findAllByBigCategoryOrderByCreatedAtDesc(BigCategory bigCategory);
}
