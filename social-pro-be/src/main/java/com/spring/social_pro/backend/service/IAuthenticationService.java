package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.request.authen.AuthenticateRequest;
import com.spring.social_pro.backend.dto.request.authen.RegisterRequest;
import com.spring.social_pro.backend.dto.request.authen.VerifyAccountRequest;
import com.spring.social_pro.backend.dto.response.authen.AuthenticateResponse;
import com.spring.social_pro.backend.entity.User;

public interface IAuthenticationService {
    String generateToken(User user);
    String handleLogout();
    String handleRegister(RegisterRequest request);
    AuthenticateResponse authenticate(AuthenticateRequest request);
    Boolean handleVerifyAccount(VerifyAccountRequest request);
}
