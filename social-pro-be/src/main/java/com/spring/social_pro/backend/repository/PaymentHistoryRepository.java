package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.InvalidToken;
import com.spring.social_pro.backend.entity.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PaymentHistoryRepository extends JpaRepository<PaymentHistory, UUID> {
}
