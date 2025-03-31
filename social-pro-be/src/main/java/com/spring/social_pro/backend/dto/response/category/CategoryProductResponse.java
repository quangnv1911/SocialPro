package com.spring.social_pro.backend.dto.response.category;

import com.spring.social_pro.backend.dto.response.product.ProductResponse;
import com.spring.social_pro.backend.entity.Product;
import com.spring.social_pro.backend.enums.BigCategory;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryProductResponse {
    UUID id;
    String name;
    String description;
    String image;
    BigCategory bigCategory;
    List<ProductResponse> products;
}
