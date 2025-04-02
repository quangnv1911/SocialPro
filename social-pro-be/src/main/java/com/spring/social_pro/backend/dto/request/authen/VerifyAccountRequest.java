package com.spring.social_pro.backend.dto.request.authen;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VerifyAccountRequest {
    String account;
    @Size(min = 6, message = "INVALID_OTP")
    String otp;
}
