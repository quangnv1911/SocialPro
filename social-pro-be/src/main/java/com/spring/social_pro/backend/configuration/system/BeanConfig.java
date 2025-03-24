package com.spring.social_pro.backend.configuration.system;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class BeanConfig {
    @Bean
    public ConcurrentHashMap<UUID, SseEmitter> emitters() {
        return new ConcurrentHashMap<>();
    }
}
