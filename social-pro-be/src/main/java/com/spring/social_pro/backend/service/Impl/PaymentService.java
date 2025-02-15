package com.spring.social_pro.backend.service.Impl;

import com.spring.social_pro.backend.dto.request.payment.PaymentCallbackRequest;
import com.spring.social_pro.backend.dto.request.payment.PaymentGenerateRequest;
import com.spring.social_pro.backend.dto.response.payment.GeneratePaymentResponse;
import com.spring.social_pro.backend.entity.User;
import com.spring.social_pro.backend.repository.UserRepository;
import com.spring.social_pro.backend.service.IPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class PaymentService implements IPaymentService {


    @NonFinal
    @Value("${payment.expire_time}")
    Long PAYMENT_EXPIRE_TIME;

    RedisTemplate<String, GeneratePaymentResponse> keyDbTemplate;
    UserRepository userRepository;

    @Override
    public GeneratePaymentResponse generateToken(PaymentGenerateRequest request, UUID userId) {
        String content = "Payment: " + generateRandomOtp();

        // Tạo dữ liệu giao dịch
        GeneratePaymentResponse transaction = new GeneratePaymentResponse(request.getGate(), request.getAmount(), content, userId);

        // Lưu vào Redis (hết hạn sau 15 phút)
        keyDbTemplate.opsForValue().set(content, transaction, PAYMENT_EXPIRE_TIME, TimeUnit.MINUTES);
        return transaction;
    }

    @Override
    public void handlePaymentCallback(PaymentCallbackRequest request) {
        String key = request.getPayment().getContent();
        GeneratePaymentResponse transactionData = keyDbTemplate.opsForValue().get(key);
        if (transactionData != null && Objects.equals(transactionData.getAmount(), request.getPayment().getAmount())) {
            Optional<User> user =  userRepository.findById(transactionData.getUserId());
            if(user.isPresent()) {
                User updatedUser = user.get();
                updatedUser.setMoney(updatedUser.getMoney() + request.getPayment().getAmount());
                userRepository.save(updatedUser);
                // Sau khi xác thực, có thể xóa OTP khỏi Redis
                keyDbTemplate.delete(key);
            }

        }
    }

    private String generateRandomOtp() {
        int byteLength = 6;
        SecureRandom secureRandom = new SecureRandom();
        byte[] tokenBytes = new byte[byteLength];
        secureRandom.nextBytes(tokenBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);

    }
}
