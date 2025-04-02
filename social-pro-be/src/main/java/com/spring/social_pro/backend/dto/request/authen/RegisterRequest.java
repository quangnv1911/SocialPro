package com.spring.social_pro.backend.dto.request.authen;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {
    @Email(message = "INVALID_EMAIL")
    String email;
    @Size(min = 6, message = "INVALID_PASSWORD")
    String password;
    @Size(min =1, message = "INVALID_USER_NAME")
    String userName;
    @Size(min = 6, message = "INVALID_CAPTCHA")
    String captchaText;
    Integer captchaId;
}
