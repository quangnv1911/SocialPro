package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.request.payment.PaymentCallbackRequest;
import com.spring.social_pro.backend.dto.request.payment.PaymentFilterRequest;
import com.spring.social_pro.backend.dto.request.payment.PaymentGenerateRequest;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.payment.GeneratePaymentResponse;
import com.spring.social_pro.backend.dto.response.payment.PaymentResponse;
import com.spring.social_pro.backend.entity.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IPaymentService {
    PageResponse<PaymentResponse> getPayments(PaymentFilterRequest request);
    GeneratePaymentResponse createNewPayment(PaymentGenerateRequest request);
    void handlePaymentCallback(PaymentCallbackRequest request);
}
