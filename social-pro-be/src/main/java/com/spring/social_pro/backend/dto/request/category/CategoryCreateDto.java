package com.spring.social_pro.backend.dto.request.category;

import com.spring.social_pro.backend.enums.BigCategory;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryCreateDto {
    String name;
    String description;
    String image;
    BigCategory bigCategory;
}
