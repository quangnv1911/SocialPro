package com.spring.social_pro.backend.dto.response.category;

import com.spring.social_pro.backend.enums.BigCategory;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryResponse {
    UUID id;
    String name;
    String description;
    String image;
    BigCategory bigCategory;
}
