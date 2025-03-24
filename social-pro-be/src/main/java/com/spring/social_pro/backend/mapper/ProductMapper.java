package com.spring.social_pro.backend.mapper;

import com.spring.social_pro.backend.dto.request.product.ProductCreateDto;
import com.spring.social_pro.backend.dto.response.payment.GeneratePaymentResponse;
import com.spring.social_pro.backend.dto.response.product.ProductResponse;
import com.spring.social_pro.backend.entity.Payment;
import com.spring.social_pro.backend.entity.Product;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.stream.Collectors;

@Mapper(builder = @Builder(disableBuilder = true), imports = Collectors.class)
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    ProductResponse toProductResponse(Product product);
    Product toProductFromCreateDto(ProductCreateDto dto);
    @Mapping(target = "id", ignore = true)
    void updateProductFromDto(ProductCreateDto dto, @MappingTarget Product product);}
