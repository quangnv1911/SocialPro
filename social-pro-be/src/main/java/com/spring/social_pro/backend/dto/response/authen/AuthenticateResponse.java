package com.spring.social_pro.backend.dto.response.authen;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    String userName;
    String email;
    String image;
    String role;
    @JsonProperty(value = "isAuthenticated")
    boolean isAuthenticated;
}