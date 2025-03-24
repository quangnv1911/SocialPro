package com.spring.social_pro.backend.dto.response.user;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String email;
    String userName;
    String roleName;
    BigDecimal money;
    String avatar;
    String ranking;
    String apiKey;

//    Set<Role> roles = new HashSet<>();
}
