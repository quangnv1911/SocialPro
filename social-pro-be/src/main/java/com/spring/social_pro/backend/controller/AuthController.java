package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.dto.request.ApiRequest;
import com.spring.social_pro.backend.dto.request.authen.RegisterRequest;
import com.spring.social_pro.backend.dto.request.authen.AuthenticateRequest;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.authen.AuthenticateResponse;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.service.IAuthenticationService;
import com.spring.social_pro.backend.service.ICaptchaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${apiPrefix}/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Authentication", description = "API for user authentication and registration")
public class AuthController {

    IAuthenticationService authenticationService;
    ICaptchaService captchaService;

    @PostMapping("/register")
    @Operation(
            summary = "Register a new user",
            description = "Handles user registration with OTP verification. Returns the registered user's ID."
    )
    public ApiResponse<?> createUser(@Valid @RequestBody ApiRequest<RegisterRequest> registerRequest, HttpServletRequest request
    ) {
        var validateCaptcha = captchaService.verifyCaptcha(registerRequest.getData().getCaptchaId(), registerRequest.getData().getCaptchaText());
        if(!validateCaptcha){
            log.error(ErrorCode.INVALID_CAPTCHA.getMessage());
            throw new AppException(ErrorCode.INVALID_CAPTCHA);
        }
        var result = authenticationService.handleRegister(registerRequest.getData(), request);
        return ApiResponse.<String>builder()
                .status(HttpStatus.CREATED.value())
                .data(result)
                .build();
    }

    @PostMapping("/authenticate")
    public ApiResponse<AuthenticateResponse> authenticate(@RequestBody ApiRequest<AuthenticateRequest> request, HttpServletRequest requestHeader) {
        var result = authenticationService.authenticate(request.getData(), requestHeader);

        return ApiResponse.<AuthenticateResponse>builder()
                .status(HttpStatus.OK.value())
                .data(result)
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<AuthenticateResponse> handleLogout() {


        return ApiResponse.<AuthenticateResponse>builder()
                .status(HttpStatus.OK.value())
                .data(null)
                .build();
    }

    @PostMapping("/verify-account")
    public ApiResponse<?> verifyAccount(@RequestBody @Valid ApiRequest<RegisterRequest> verifyAccountRequest,
                                        @RequestParam String otp,
                                        HttpServletRequest request) {

        var result = authenticationService.handleRegister(verifyAccountRequest.getData(), request);
        return ApiResponse.<String>builder()
                .status(HttpStatus.CREATED.value())
                .data(result)
                .build();
    }

    @PostMapping("/reset-password")
    public ApiResponse<?> resetPassword(@RequestBody @Valid ApiRequest<RegisterRequest> resetPassRequest,
                                        @RequestParam String otp,
                                        HttpServletRequest request) {

        var result = authenticationService.handleRegister(resetPassRequest.getData(), request);
        return ApiResponse.<String>builder()
                .status(HttpStatus.CREATED.value())
                .data(result)
                .build();
    }

    @PostMapping("/change-pass")
    public ApiResponse<?> changePassword(@RequestBody @Valid ApiRequest<RegisterRequest> changePassRequest,
                                         @RequestParam String otp,
                                         HttpServletRequest request) {

        var result = authenticationService.handleRegister(changePassRequest.getData(), request);
        return ApiResponse.<String>builder()
                .status(HttpStatus.CREATED.value())
                .data(result)
                .build();
    }


}
