package com.spring.social_pro.backend.service.Impl;

import com.spring.social_pro.backend.dto.request.payment.PaymentGenerateRequest;
import com.spring.social_pro.backend.dto.response.payment.GeneratePaymentResponse;
import com.spring.social_pro.backend.service.IPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class PaymentService implements IPaymentService {

    private final RedisTemplate<Object, Object> keyDbTemplate;

    @Override
    public GeneratePaymentResponse generateToken(PaymentGenerateRequest request,String userId) {
        String content = "Naptien " + userId;

        // Tạo dữ liệu giao dịch
        GeneratePaymentResponse transaction = new GeneratePaymentResponse(request.getGate(), request.getAmount(), content);

        // Lưu vào Redis (hết hạn sau 15 phút)
        keyDbTemplate.opsForValue().set(content, transaction, 15, TimeUnit.MINUTES);
        return transaction;
    }
}
