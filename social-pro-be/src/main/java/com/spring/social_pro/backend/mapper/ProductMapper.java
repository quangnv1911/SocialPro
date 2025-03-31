package com.spring.social_pro.backend.mapper;

import com.spring.social_pro.backend.dto.request.product.ProductCreateDto;
import com.spring.social_pro.backend.dto.response.payment.GeneratePaymentResponse;
import com.spring.social_pro.backend.dto.response.product.ProductResponse;
import com.spring.social_pro.backend.entity.Payment;
import com.spring.social_pro.backend.entity.Product;
import com.spring.social_pro.backend.enums.Duration;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(builder = @Builder(disableBuilder = true), imports = {Collectors.class})
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    ProductResponse toProductResponse(Product product);

    Product toProductFromCreateDto(ProductCreateDto dto);

    @Mapping(target = "id", ignore = true)
    void updateProductFromDto(ProductCreateDto dto, @MappingTarget Product product);


    // Map List<Product> -> List<ProductResponse>
    default List<ProductResponse> toProductResponseList(List<Product> products) {
        return products.stream()
                .map(this::toProductResponse)
                .collect(Collectors.toList());
    }
}


