package com.spring.social_pro.backend.dto.request.product;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.spring.social_pro.backend.dto.request.BaseFilterRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductFilerRequest extends BaseFilterRequest {
    String name;
}
