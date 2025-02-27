package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.response.paymentHistory.PaymentHistoryResponse;

public interface IPaymentHistoryService {
    PaymentHistoryResponse createNewPaymentHistory(String email);
}
