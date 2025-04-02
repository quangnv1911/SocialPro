package com.spring.social_pro.backend.service;

import com.nimbusds.jose.JOSEException;
import com.spring.social_pro.backend.dto.request.authen.AuthenticateRequest;
import com.spring.social_pro.backend.dto.request.authen.LogoutRequest;
import com.spring.social_pro.backend.dto.request.authen.RegisterRequest;
import com.spring.social_pro.backend.dto.request.authen.VerifyAccountRequest;
import com.spring.social_pro.backend.dto.response.authen.AuthenticateResponse;
import com.spring.social_pro.backend.entity.User;
import jakarta.servlet.http.HttpServletRequest;

import java.text.ParseException;

public interface IAuthenticationService {
    void handleLogout(LogoutRequest request) throws ParseException, JOSEException;
    String handleRegister(RegisterRequest registerRequest, HttpServletRequest request);
    AuthenticateResponse authenticate(AuthenticateRequest request, HttpServletRequest requestHeader);
    void handleVerifyAccount(VerifyAccountRequest request);
}
