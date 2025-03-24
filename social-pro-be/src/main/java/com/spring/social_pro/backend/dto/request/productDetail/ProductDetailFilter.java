package com.spring.social_pro.backend.dto.request.productDetail;

import com.spring.social_pro.backend.dto.request.BaseFilterRequest;
import com.spring.social_pro.backend.enums.ProductStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetailFilter extends BaseFilterRequest {
    ProductStatus status;
}
