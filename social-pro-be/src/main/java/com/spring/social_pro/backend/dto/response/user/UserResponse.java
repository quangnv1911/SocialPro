package com.spring.social_pro.backend.dto.response.user;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.UUID;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    UUID id;
    String email;
    String userName;
    String roleName;
    BigDecimal money;
    String avatar;
    String ranking;
    String apiKey;

//    Set<Role> roles = new HashSet<>();
}
