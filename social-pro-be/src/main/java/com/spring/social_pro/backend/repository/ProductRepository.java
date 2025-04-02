package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.dto.response.product.ProductResponse;
import com.spring.social_pro.backend.entity.Product;
import com.spring.social_pro.backend.enums.Duration;
import com.spring.social_pro.backend.enums.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    @Query("""
        SELECT p FROM Product p\s
        WHERE (:name IS NULL OR p.name LIKE %:name%)\s
          AND (:categoryId IS NULL OR p.category.id = :categoryId)
   \s""")
    Page<Product> findProducts(
            @Param("name") String name,
            @Param("categoryId") UUID categoryId,
            Pageable pageable
    );

    List<ProductResponse> findTopByTotalSold(Integer limit);

    /**
     * Count the number of product details with AVAILABLE status for a specific product
     * @param productId The product ID
     * @return The count of available product details
     */
    @Query("SELECT COUNT(pd) FROM ProductDetail pd WHERE pd.product.id = :productId AND pd.status = :status AND pd.duration = :duration")
    int countProductDetails(@Param("productId") UUID productId, @Param("status") ProductStatus status, @Param("duration") Duration duration);
}
