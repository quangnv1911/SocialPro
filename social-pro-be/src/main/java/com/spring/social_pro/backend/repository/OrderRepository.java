package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.Category;
import com.spring.social_pro.backend.entity.Order;
import com.spring.social_pro.backend.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID>, JpaSpecificationExecutor<Order> {
    @EntityGraph(attributePaths = {"orderDetails.productDetails"})
    List<Order> findAllByUserId(UUID userId);
}
