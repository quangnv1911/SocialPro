package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.request.payment.PaymentCallbackRequest;
import com.spring.social_pro.backend.dto.request.payment.PaymentGenerateRequest;
import com.spring.social_pro.backend.dto.response.payment.GeneratePaymentResponse;
import com.spring.social_pro.backend.entity.User;

import java.util.UUID;

public interface IPaymentService {
    GeneratePaymentResponse generateToken(PaymentGenerateRequest request, UUID userId);
    void handlePaymentCallback(PaymentCallbackRequest request);
}
