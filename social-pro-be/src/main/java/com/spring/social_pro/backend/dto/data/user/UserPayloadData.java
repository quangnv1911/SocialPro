package com.spring.social_pro.backend.dto.data.user;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserPayloadData {
    UUID id;
    String email;
    String userName;
    String name;

}
