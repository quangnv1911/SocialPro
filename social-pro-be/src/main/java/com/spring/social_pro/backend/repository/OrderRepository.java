package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.Category;
import com.spring.social_pro.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

}
