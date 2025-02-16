package com.spring.social_pro.backend.dto.response.authen;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticateResponse {
    String refreshToken;
    String accessToken;
    String role;
    boolean authenticated;
}
