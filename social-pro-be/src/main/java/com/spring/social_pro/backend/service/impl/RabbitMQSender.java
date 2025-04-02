package com.spring.social_pro.backend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.spring.social_pro.backend.configuration.rabbitMQ.RabbitMQConfig;
import com.spring.social_pro.backend.dto.data.message.OrderDetailMessage;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RabbitMQSender {
    RabbitTemplate rabbitTemplate;

    public void sendOrderDetailMessage(OrderDetailMessage message) {
        log.info("Sending order detail message: {}", message);
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.ORDER_EXCHANGE,
                RabbitMQConfig.ORDER_ROUTING_KEY,
                message);
    }
}