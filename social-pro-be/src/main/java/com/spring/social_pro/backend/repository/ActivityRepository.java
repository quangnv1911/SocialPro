package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.Activity;
import com.spring.social_pro.backend.entity.InvalidToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ActivityRepository extends JpaRepository<Activity, UUID> {
}
