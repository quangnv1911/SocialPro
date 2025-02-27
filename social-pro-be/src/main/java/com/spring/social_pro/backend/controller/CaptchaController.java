package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.captcha.CaptchaResponse;
import com.spring.social_pro.backend.service.ICaptchaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${apiPrefix}/captcha")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Captcha", description = "API for captcha service")
public class CaptchaController {
    ICaptchaService captchaService;

    @GetMapping("")
    public ApiResponse<?> getCaptcha() {
        CaptchaResponse captcha = captchaService.generateCaptcha();

        return ApiResponse.<CaptchaResponse>builder()
                .status(HttpStatus.OK.value())
                .data(captcha)
                .message("Captcha generated")
                .build();

    }
}
