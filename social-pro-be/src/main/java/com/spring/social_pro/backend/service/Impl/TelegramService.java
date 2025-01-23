package com.spring.social_pro.backend.service.Impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static com.spring.social_pro.backend.constant.TelegramApiUrl.TELEGRAM_API_URL;

@Service
public class TelegramService {
    @Value("${telegram.bot.token}")
    private String botToken;

    @Value("${telegram.group.chatId}")
    private String groupChatId;

    private final RestTemplate restTemplate = new RestTemplate();

    public String sendMessage(String message) {
        String url = TELEGRAM_API_URL + botToken + "/sendMessage";

        String payload = String.format("{\"chat_id\":\"%s\", \"text\":\"%s\"}", groupChatId, message);

        return restTemplate.postForObject(url, payload, String.class);
    }
}
