package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.entity.User;

public interface IPaymentService {
    public String generateToken(User user);
}
