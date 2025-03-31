package com.spring.social_pro.backend.service.impl;

import com.spring.social_pro.backend.service.ITelegramService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import static com.spring.social_pro.backend.constant.TelegramApiUrl.TELEGRAM_API_URL;

@Service
@Slf4j
public class TelegramService implements ITelegramService {
    @Value("${telegram.bot.token}")
    private String botToken;

    @Value("${telegram.group.chatId}")
    private String groupChatId;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public void sendMessage(String message) {
        String url = TELEGRAM_API_URL + botToken + "/sendMessage";

        String payload = String.format("{\"chat_id\":\"%s\", \"text\":\"%s\"}", groupChatId, message);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Tạo HttpEntity
        HttpEntity<String> entity = new HttpEntity<>(payload, headers);

        // Gửi request
        try {
            restTemplate.postForObject(url, entity, String.class);
            log.info("Telegram send message: {}", message);
        } catch (Exception e) {
            log.error("Failed to send Telegram message: {}", e.getMessage());
        }
    }
}
