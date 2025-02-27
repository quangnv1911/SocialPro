package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.Activity;
import com.spring.social_pro.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
}
