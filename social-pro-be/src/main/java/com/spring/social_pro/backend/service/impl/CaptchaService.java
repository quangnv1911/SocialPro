package com.spring.social_pro.backend.service.impl;

import com.spring.social_pro.backend.dto.response.captcha.CaptchaResponse;
import com.spring.social_pro.backend.service.ICaptchaService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CaptchaService implements ICaptchaService {
    private static final Random random = new Random();
    private static final int WIDTH = 150;
    private static final int HEIGHT = 50;
    private static final int CAPTCHA_TTL = 300;
    RedisTemplate<String, String> redisTemplate;
    AtomicInteger counter = new AtomicInteger(0);

    @Override
    public CaptchaResponse generateCaptcha() {
        String captchaText = generateRandomText(4);
        String imageBase64 = generateImage(captchaText);
        int id = counter.getAndIncrement() % 100000;
        redisTemplate.opsForValue().set("captcha:" + id, captchaText, CAPTCHA_TTL, TimeUnit.SECONDS);
        return CaptchaResponse.builder()
                .id(id)
                .imageBase64(imageBase64)
                .captchaText(captchaText)
                .build();
    }

    @Override
    public boolean verifyCaptcha(int id, String userInput) {
        String storedCaptcha = redisTemplate.opsForValue().get("captcha:" + id);
        if (storedCaptcha == null) return false;
        boolean isValid = storedCaptcha.equals(userInput);
        if (isValid) {
            redisTemplate.delete("captcha:" + id); // Xóa sau khi sử dụng
        }
        return isValid;
    }

    private String generateRandomText(int length) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10)); // Số từ 0-9
        }
        return sb.toString();
    }

    private String generateImage(String text) {
        BufferedImage image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = image.createGraphics();

        // Vẽ nền màu nâu nhạt
        g2d.setColor(new Color(204, 153, 102)); // #cc9966
        g2d.fillRect(0, 0, WIDTH, HEIGHT);

        // Vẽ chữ số với màu và kiểu ngẫu nhiên
        g2d.setFont(new Font("Arial", Font.BOLD, 24));
        g2d.setColor(Color.BLACK);
        int x = 10;
        for (char c : text.toCharArray()) {
            g2d.drawString(String.valueOf(c), x, 30);
            x += 30;
        }

        // Thêm đường cong làm rối (noise)
        g2d.setColor(new Color(222, 222, 108)); // #dede6c
        int x1 = random.nextInt(WIDTH);
        int y1 = random.nextInt(HEIGHT);
        int x2 = random.nextInt(WIDTH);
        int y2 = random.nextInt(HEIGHT);
        g2d.drawLine(x1, y1, x2, y2);

        // Chuyển BufferedImage thành base64
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ImageIO.write(image, "png", baos);
            byte[] imageBytes = baos.toByteArray();
            return Base64.getEncoder().encodeToString(imageBytes);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi tạo CAPTCHA", e);
        } finally {
            g2d.dispose();
        }
    }
}
