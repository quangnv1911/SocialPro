package com.spring.social_pro.backend.mapper;

import com.spring.social_pro.backend.dto.request.productDetail.ProductDetailCreateDto;
import com.spring.social_pro.backend.dto.response.product.ProductResponse;
import com.spring.social_pro.backend.dto.response.productDetail.ProductDetailResponse;
import com.spring.social_pro.backend.entity.ProductDetail;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.stream.Collectors;

@Mapper(builder = @Builder(disableBuilder = true), imports = Collectors.class)
public interface ProductDetailMapper {
    ProductDetailMapper INSTANCE = Mappers.getMapper(ProductDetailMapper.class);

    ProductDetailResponse toProductDetailResponse(ProductDetail productDetail);

    ProductDetail toProductDetailFromCreateDto(ProductDetailCreateDto dto);
    @Mapping(target = "id", ignore = true)
    void updateProductDetailFromDto(ProductDetailCreateDto dto, @MappingTarget ProductDetail productDetail);
}
