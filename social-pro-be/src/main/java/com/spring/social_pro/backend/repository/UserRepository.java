package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    Optional<User> findByEmail(String email);

    Boolean existsUserByEmailOrUserName(String email, String username);
}
