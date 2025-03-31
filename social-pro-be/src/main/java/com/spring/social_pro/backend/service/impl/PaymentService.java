package com.spring.social_pro.backend.service.impl;

import com.spring.social_pro.backend.dto.data.PaymentCacheData;
import com.spring.social_pro.backend.dto.request.payment.PaymentCallbackRequest;
import com.spring.social_pro.backend.dto.request.payment.PaymentFilterRequest;
import com.spring.social_pro.backend.dto.request.payment.PaymentGenerateRequest;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.payment.GeneratePaymentResponse;
import com.spring.social_pro.backend.dto.response.payment.PaymentResponse;
import com.spring.social_pro.backend.entity.Payment;
import com.spring.social_pro.backend.entity.User;
import com.spring.social_pro.backend.enums.PaymentStatus;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.mapper.PaymentMapper;
import com.spring.social_pro.backend.repository.PaymentRepository;
import com.spring.social_pro.backend.repository.UserRepository;
import com.spring.social_pro.backend.service.INotifyService;
import com.spring.social_pro.backend.service.IPaymentService;
import com.spring.social_pro.backend.service.ITelegramService;
import com.spring.social_pro.backend.service.IUserService;
import jakarta.persistence.OptimisticLockException;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentService implements IPaymentService {
    IUserService userService;
    INotifyService notifyService;

    @NonFinal
    @Value("${payment.expire_time}")
    Long PAYMENT_EXPIRE_TIME;

    PaymentMapper paymentMapper;
    RedisTemplate<Object, Object> keyDbTemplate;
    UserRepository userRepository;
    ITelegramService telegramService;
    PaymentRepository paymentRepository;

    @Override
    public PageResponse<PaymentResponse> getPayments(PaymentFilterRequest request) {
        Sort sort = request.getSortOrder().equalsIgnoreCase("desc")
                ? Sort.by(request.getSortBy()).descending()
                : Sort.by(request.getSortBy()).ascending();
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getPageSize(), sort);
        var payments = paymentRepository.findAll(pageable);
        return PageResponse.fromPage(payments, paymentMapper::toPaymentResponse);
    }

    @Override
    @Transactional
    @Retryable(
            retryFor = OptimisticLockException.class, // Dùng 'exception' thay 'value'
            maxAttempts = 3,
            backoff = @Backoff(delay = 100, multiplier = 2)
    )
    public GeneratePaymentResponse createNewPayment(PaymentGenerateRequest request) {
        var user = userService.getCurrentUser();
        if (user == null) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }

        Payment payment = Payment.builder()
                .gate(request.getGate())
                .amount(request.getAmount())
                .balanceBefore(user.getMoney())
                .build();
        payment = paymentRepository.save(payment);
        String paymentContent = "socialpro" + payment.getId();
        payment.setContent(paymentContent);
        payment = paymentRepository.save(payment);
        PaymentCacheData transaction = PaymentCacheData.builder()
                .id(payment.getId())
                .content(paymentContent)
                .gate(request.getGate())
                .amount(request.getAmount())
                .userId(user.getId())
                .build();
        // Lưu vào Redis (hết hạn sau 15 phút)
        keyDbTemplate.opsForValue().set(paymentContent, transaction, PAYMENT_EXPIRE_TIME, TimeUnit.MINUTES);

        GeneratePaymentResponse response = paymentMapper.toGeneratePaymentResponse(payment);
        response.setAccountName("Nguyen Vinh Quang");
        response.setAccountNumber("0334745645");
        String qrCodeUrl = "https://img.vietqr.io/image/" +
                "MB" +
                "-" +
                "0334745645" +
                "-" +
                "compact.png" +
                "?amount=" +
                request.getAmount() +
                "&addInfo=" +
                payment.getContent() +
                "&accountName=" +
                "0334745645";
        response.setQrCodeUrl(qrCodeUrl);
        return response;
    }

    @Recover
    public GeneratePaymentResponse recover(OptimisticLockException e) {
        log.error("Concurrency failure after retries: {}", e.getMessage());
        throw new AppException(ErrorCode.CONCURRENCY_FAILURE);
    }


    @Override
    public void handlePaymentCallback(PaymentCallbackRequest request) {
        String key = request.getPayment().getContent().trim();
        PaymentCacheData transactionData = (PaymentCacheData) keyDbTemplate.opsForValue().get(key);
        if (transactionData != null && Objects.equals(transactionData.getAmount(), request.getPayment().getAmount())) {
            Optional<User> user = userRepository.findById(transactionData.getUserId());
            if (user.isPresent()) {
                User updatedUser = user.get();
                updatedUser.setMoney(updatedUser.getMoney().add(request.getPayment().getAmount()));
                userRepository.save(updatedUser);

                Optional<Payment> updatePayment = paymentRepository.findById(transactionData.getId());
                if (updatePayment.isPresent()) {
                    updatePayment.get().setStatus(PaymentStatus.Done);
                    updatePayment.get().setBalanceAfter(updatedUser.getMoney());
                    paymentRepository.save(updatePayment.get());
                }
                String message = updatedUser.getEmail() + " has paid " + request.getPayment().getAmount() + " with content: " + request.getPayment().getContent();
                telegramService.sendMessage(message);
                // Sau khi xác thực, có thể xóa OTP khỏi Redis
                keyDbTemplate.delete(key);

                // notify to user
                notifyService.sendNotificationToUser(user.get().getId(), "Payment success");
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
