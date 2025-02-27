package com.spring.social_pro.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BaseFilterRequest {
    @Builder.Default
    Integer page = 1;
    @Builder.Default
    Integer pageSize = 10;
    String sortBy;
    @Builder.Default
    String sortOrder = "asc";
}
