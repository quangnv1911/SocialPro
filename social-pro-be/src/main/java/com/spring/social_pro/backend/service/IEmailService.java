package com.spring.social_pro.backend.service;

public interface IEmailService {
    void sendWelcomeEmail(String to, String username, String verificationLink);
}
