package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.request.payment.PaymentGenerateRequest;
import com.spring.social_pro.backend.dto.response.payment.GeneratePaymentResponse;
import com.spring.social_pro.backend.entity.User;

public interface IPaymentService {
    GeneratePaymentResponse generateToken(PaymentGenerateRequest request,String userId);
    
}
