package com.spring.social_pro.backend.service.Impl;

import com.spring.social_pro.backend.dto.request.payment.PaymentCallbackRequest;
import com.spring.social_pro.backend.dto.request.payment.PaymentGenerateRequest;
import com.spring.social_pro.backend.dto.response.payment.GeneratePaymentResponse;
import com.spring.social_pro.backend.service.IPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class PaymentService implements IPaymentService {


    @NonFinal
    @Value("${payment.expire_time}")
    Long PAYMENT_EXPIRE_TIME;

    RedisTemplate<Object, Object> keyDbTemplate;

    @Override
    public GeneratePaymentResponse generateToken(PaymentGenerateRequest request,String userId) {
        String content = "Payment: " + userId;

        // Tạo dữ liệu giao dịch
        GeneratePaymentResponse transaction = new GeneratePaymentResponse(request.getGate(), request.getAmount(), content);

        // Lưu vào Redis (hết hạn sau 15 phút)
        keyDbTemplate.opsForValue().set(content, transaction, PAYMENT_EXPIRE_TIME, TimeUnit.MINUTES);
        return transaction;
    }

    @Override
    public void handlePaymentCallback(PaymentCallbackRequest request) {
        String key = "Payment:" + email;
        String storedOtp = keyDbTemplate.opsForValue().get(key);
        if (storedOtp != null && storedOtp.equals(otpInput)) {
            // Sau khi xác thực, có thể xóa OTP khỏi Redis
            keyDbTemplate.delete(key);
        }
    }
}
