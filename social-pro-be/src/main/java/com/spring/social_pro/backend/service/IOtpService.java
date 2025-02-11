package com.spring.social_pro.backend.service;

public interface IOtpService {
    String generateOtp(String email);
    boolean validateOtp(String otp, String email);
}
