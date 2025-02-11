package com.spring.social_pro.backend.service.Impl;

import com.spring.social_pro.backend.configuration.keyDB.KeyDbConfig;
import com.spring.social_pro.backend.service.IOtpService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.concurrent.TimeUnit;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@RequiredArgsConstructor
public class OtpService implements IOtpService {

    @NonFinal
    @Value("${otp.expire_time}")
    Long OTP_EXPIRE_TIME;

    @NonFinal
    @Value("${otp.length}")
    Long OTP_LENGTH;

    SecureRandom random;
    RedisTemplate<String, String> keyDbTemplate;
    /**
     * Sinh OTP và lưu vào Redis với key là OTP:{email} và TTL 5 phút.
     *
     * @param email Email của người dùng
     * @return OTP đã sinh (ví dụ: gửi qua email)
     */
    @Override
    public String generateOtp(String email) {
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(random.nextInt(10));  // Sinh ra một chữ số ngẫu nhiên từ 0 đến 9
        }
        String key = "OTP:" + email;
        keyDbTemplate.opsForValue().set(key, otp.toString(), OTP_EXPIRE_TIME, TimeUnit.MINUTES);
        return otp.toString();
    }

    @Override
    public boolean validateOtp(String otpInput, String email) {
        String key = "OTP:" + email;
        String storedOtp = keyDbTemplate.opsForValue().get(key);
        if (storedOtp != null && storedOtp.equals(otpInput)) {
            // Sau khi xác thực, có thể xóa OTP khỏi Redis
            keyDbTemplate.delete(key);
            return true;
        }
        return false;
    }
}
