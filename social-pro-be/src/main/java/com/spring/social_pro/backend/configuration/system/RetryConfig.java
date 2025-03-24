package com.spring.social_pro.backend.configuration.system;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.retry.annotation.EnableRetry;

@Slf4j
@Configuration
@EnableRetry(proxyTargetClass=true)
public class RetryConfig {
    @PostConstruct
    public void init() {
        log.info("RetryConfig initialized with @EnableRetry");
    }
}
