package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.base.BaseController;
import com.spring.social_pro.backend.dto.request.ApiRequest;
import com.spring.social_pro.backend.dto.request.authen.RegisterRequest;
import com.spring.social_pro.backend.dto.request.user.UserCreationRequest;
import com.spring.social_pro.backend.dto.request.authen.AuthenticateRequest;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.UserResponse;
import com.spring.social_pro.backend.dto.response.authen.AuthenticateResponse;
import com.spring.social_pro.backend.service.IAuthenticationService;
import com.spring.social_pro.backend.service.Impl.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController("/auth")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController extends BaseController {

    IAuthenticationService authenticationService;

    @PostMapping("/register")
    public ApiResponse<?> createUser(@RequestBody @Valid ApiRequest<RegisterRequest> request,
                                                @RequestParam String otp) {

        var result = authenticationService.handleRegister(request.getData());
        return ApiResponse.<String>builder()
                .status(HttpStatus.CREATED.value())
                .data(result)
                .build();
    }

    @PostMapping("/authen")
    public ApiResponse<AuthenticateResponse> authenticate(@RequestBody AuthenticateRequest request) {
        var result = authenticationService.authenticate(request);

        return ApiResponse.<AuthenticateResponse>builder()
                .status(HttpStatus.OK.value())
                .data(result)
                .build();
    }

    @GetMapping("/authen")
    public ApiResponse<AuthenticateResponse> authenticateGet() {

        return ApiResponse.<AuthenticateResponse>builder()
                .status(HttpStatus.OK.value())
                .data(null)
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
    public ApiResponse<?> verifyAccount(@RequestBody @Valid ApiRequest<RegisterRequest> request,
                                     @RequestParam String otp) {

        var result = authenticationService.handleRegister(request.getData());
        return ApiResponse.<String>builder()
                .status(HttpStatus.CREATED.value())
                .data(result)
                .build();
    }
}
