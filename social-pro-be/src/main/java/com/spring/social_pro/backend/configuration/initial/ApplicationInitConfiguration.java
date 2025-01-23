package com.spring.social_pro.backend.configuration.initial;

import com.spring.social_pro.backend.aspects.LoggingAspect;
import com.spring.social_pro.backend.constant.PredefinedRole;
import com.spring.social_pro.backend.entity.Role;
import com.spring.social_pro.backend.repository.RoleRepository;
import com.spring.social_pro.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Optional;
import java.util.logging.Logger;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfiguration {
    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver"
    )
    ApplicationRunner applicationRunner(RoleRepository roleRepository) {
        log.info("Initializing application.....");

        return args -> {
            Optional<Role> userRole = roleRepository.findByRoleName(PredefinedRole.USER_ROLE);
            if (userRole.isEmpty()) {
                roleRepository.save(Role.builder()
                        .roleName(PredefinedRole.USER_ROLE)
                        .description("User role")
                        .build());
            }

            Optional<Role> adminRole = roleRepository.findByRoleName(PredefinedRole.ADMIN_ROLE);
            if (adminRole.isEmpty()) {
                roleRepository.save(Role.builder()
                        .roleName(PredefinedRole.ADMIN_ROLE)
                        .description("Admin role")
                        .build());
            }

            log.info("Application initialization completed .....");
        };
    }
}
