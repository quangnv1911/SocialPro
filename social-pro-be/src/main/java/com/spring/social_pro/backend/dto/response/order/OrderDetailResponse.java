package com.spring.social_pro.backend.dto.response.order;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailResponse {
    UUID id;
    UUID itemId;
    String cronjobKey;
}