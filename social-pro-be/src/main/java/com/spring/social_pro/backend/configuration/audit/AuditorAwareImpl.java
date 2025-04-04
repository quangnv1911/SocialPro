package com.spring.social_pro.backend.configuration.audit;

import com.spring.social_pro.backend.entity.User;
import com.spring.social_pro.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import reactor.util.annotation.NonNullApi;

import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<String> {
    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<String> getCurrentAuditor() {
        var userData = SecurityContextHolder.getContext().getAuthentication();
        if (userData == null) {
            return Optional.of("System");
        }
        return userRepository.findByEmail(userData.getName())
                .map(User::getEmail) // Lấy email của User nếu tìm thấy
                .or(() -> Optional.of("System"));
    }

}