package com.spring.social_pro.backend.mapper;


import com.spring.social_pro.backend.dto.response.productDuration.ProductDurationResponse;
import com.spring.social_pro.backend.entity.ProductDuration;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(builder = @Builder(disableBuilder = true), imports = Collectors.class)
public interface ProductDurationMapper {
    ProductDurationMapper INSTANCE = Mappers.getMapper(ProductDurationMapper.class);

    ProductDurationResponse productDurationToProductDurationDTO(ProductDuration productDuration);

    List<ProductDurationResponse> productDurationsToProductDurationDTOs(List<ProductDuration> productDurations);

}
