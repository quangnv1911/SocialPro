package com.spring.social_pro.backend.service.Impl;

import com.spring.social_pro.backend.dto.response.paymentHistory.PaymentHistoryResponse;
import com.spring.social_pro.backend.entity.PaymentHistory;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.mapper.PaymentHistoryMapper;
import com.spring.social_pro.backend.repository.PaymentHistoryRepository;
import com.spring.social_pro.backend.repository.UserRepository;
import com.spring.social_pro.backend.service.IPaymentHistoryService;
import jakarta.persistence.OptimisticLockException;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentHistoryService implements IPaymentHistoryService {
    UserRepository userRepository;
    PaymentHistoryRepository paymentHistoryRepository;
    PaymentHistoryMapper paymentHistoryMapper;

    @Override
    @Transactional
    @Retryable(
            value = OptimisticLockException.class,
            maxAttempts = 3,
            backoff = @Backoff(delay = 100, multiplier = 2) // Delay tăng dần: 100ms, 200ms, 400ms
    )
    public PaymentHistoryResponse createNewPaymentHistory(String email) {
        var user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }

        PaymentHistory paymentHistory = new PaymentHistory();
        paymentHistory.setAmount(BigDecimal.valueOf(0));
        paymentHistory = paymentHistoryRepository.save(paymentHistory);

        paymentHistory.setMessage("nt" + paymentHistory.getId());
        paymentHistory = paymentHistoryRepository.save(paymentHistory);


        return paymentHistoryMapper.toPaymentHistoryResponse(paymentHistory);
    }

    @Recover
    public PaymentHistoryResponse recover() {
        throw new AppException(ErrorCode.CONCURRENCY_FAILURE);
    }
}
