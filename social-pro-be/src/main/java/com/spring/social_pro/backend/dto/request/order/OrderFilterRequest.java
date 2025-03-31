package com.spring.social_pro.backend.dto.request.order;

import com.spring.social_pro.backend.dto.request.BaseFilterRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderFilterRequest  extends BaseFilterRequest {
    String name;
}
