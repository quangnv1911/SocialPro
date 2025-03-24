package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.request.authen.AuthenticateRequest;
import com.spring.social_pro.backend.dto.request.authen.RegisterRequest;
import com.spring.social_pro.backend.dto.request.authen.VerifyAccountRequest;
import com.spring.social_pro.backend.dto.response.authen.AuthenticateResponse;
import com.spring.social_pro.backend.entity.User;
import jakarta.servlet.http.HttpServletRequest;

public interface IAuthenticationService {
    String handleLogout(String accessToken);
    String handleRegister(RegisterRequest registerRequest, HttpServletRequest request);
    AuthenticateResponse authenticate(AuthenticateRequest request, HttpServletRequest requestHeader);
    Boolean handleVerifyAccount(VerifyAccountRequest request);
}
