package com.spring.social_pro.backend.repository;

import com.spring.social_pro.backend.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> , JpaSpecificationExecutor<User> {
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    Optional<User> findByEmailIgnoreCaseOrUserNameIgnoreCase(@NotNull @Email String email, String userName);

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    Optional<User> findByEmail(String email);
    Boolean existsUserByEmailIgnoreCase(String email);
    Boolean existsUserByUserNameIgnoreCase(String username);

}
