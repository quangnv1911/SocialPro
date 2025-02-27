package com.spring.social_pro.backend.dto.response.captcha;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CaptchaResponse {
    int id;
    String captchaText;
    String imageBase64;
}
