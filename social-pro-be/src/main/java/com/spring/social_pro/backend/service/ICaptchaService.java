package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.response.captcha.CaptchaResponse;

public interface ICaptchaService {
    CaptchaResponse generateCaptcha();
    boolean verifyCaptcha(int id, String userInput);
}
