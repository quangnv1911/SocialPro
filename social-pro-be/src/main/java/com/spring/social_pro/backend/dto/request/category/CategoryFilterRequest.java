package com.spring.social_pro.backend.dto.request.category;

import com.spring.social_pro.backend.dto.request.BaseFilterRequest;
import com.spring.social_pro.backend.enums.BigCategory;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryFilterRequest extends BaseFilterRequest {
    BigCategory bigCategory;
}
