package com.spring.social_pro.backend.configuration.rabbitMQ;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String ORDER_QUEUE = "order_queue";
    public static final String ORDER_EXCHANGE = "order_exchange";
    public static final String ORDER_ROUTING_KEY = "order_routing_key";

    @Bean
    public Queue orderQueue() {
        return QueueBuilder.durable(RabbitMQConfig.ORDER_QUEUE) // Đảm bảo queue chính là bền vững
                .withArgument("x-dead-letter-exchange", "dlx-exchange") // Exchange của DLQ
                .withArgument("x-dead-letter-routing-key", "dlq-routing-key") // Routing Key của DLQ
                .build();
    }

    @Bean
    public Queue deadLetterQueue() {
        return QueueBuilder.durable("order-dead-letter-queue") // Queue DLQ
                .build();
    }

    @Bean
    public DirectExchange deadLetterExchange() {
        return new DirectExchange("dlx-exchange"); // Exchange cho DLQ
    }

    @Bean
    public Binding deadLetterBinding(Queue deadLetterQueue, DirectExchange deadLetterExchange) {
        return BindingBuilder.bind(deadLetterQueue) // Liên kết DLQ với Exchange DLQ
                .to(deadLetterExchange)
                .with("dlq-routing-key"); // Routing key cho DLQ
    }

    @Bean
    public TopicExchange orderExchange() {
        return new TopicExchange(ORDER_EXCHANGE);
    }

    @Bean
    public Binding orderBinding(Queue orderQueue, TopicExchange orderExchange) {
        return BindingBuilder.bind(orderQueue).to(orderExchange).with(ORDER_ROUTING_KEY);
    }

    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter());
        return rabbitTemplate;
    }
}