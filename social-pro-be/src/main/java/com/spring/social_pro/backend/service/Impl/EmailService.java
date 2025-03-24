package com.spring.social_pro.backend.service.Impl;

import com.spring.social_pro.backend.dto.request.email.SendEmailRequest;
import com.spring.social_pro.backend.service.IEmailService;
import org.springframework.core.io.Resource;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService implements IEmailService {
    private final ResourceLoader resourceLoader;
    @NonFinal
    @Value("${email-endpoint.send}")
    String emailProxyUrl;

    RestTemplate restTemplate = new RestTemplate();

    @Override
    public void sendWelcomeEmail(String to, String username, String verificationLink) {
        try {
            // Đọc template từ resources
            String htmlContent = loadEmailTemplate("template/welcome-email.html")
                    .replace("{username}", username)
                    .replace("{link}", verificationLink);

            // Tạo payload
            SendEmailRequest emailRequest = new SendEmailRequest(to, "Welcome to Our Service", htmlContent);

            // Thiết lập headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Tạo HttpEntity
            HttpEntity<SendEmailRequest> request = new HttpEntity<>(emailRequest, headers);

            // Gửi request tới proxy
            String response = restTemplate.postForObject(emailProxyUrl, request, String.class);
            log.info("Welcome email queued: to={}, username={}, response={}", to, username, response);
        } catch (Exception e) {
            log.error("Failed to queue welcome email: to={}, username={}, error={}", to, username, e.getMessage());
            throw new RuntimeException("Failed to send welcome email via proxy", e);
        }
    }

    private String loadEmailTemplate(String templatePath) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:" + templatePath);
        if (!resource.exists()) {
            throw new IOException("Email template not found: " + templatePath);
        }
        return new String(Files.readAllBytes(resource.getFile().toPath()), StandardCharsets.UTF_8);
    }
}
