package com.spring.social_pro.backend.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;

public interface INotifyService {
    void addEmitter(UUID userId, SseEmitter emitter);
    void removeEmitter(UUID userId);
    void sendNotificationToUser(UUID userId, String message);
    void sendNotificationToAll(String message);
}
