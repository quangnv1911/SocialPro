package com.spring.social_pro.backend.mapper;

import com.spring.social_pro.backend.dto.request.category.CategoryCreateDto;
import com.spring.social_pro.backend.dto.response.category.CategoryResponse;
import com.spring.social_pro.backend.entity.Category;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(builder = @Builder(disableBuilder = true), imports = Collectors.class)
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    CategoryResponse toCategoryResponse(Category category);
    List<CategoryResponse> toCategoryResponseList(List<Category> categories);

    Category toCategoryFromCreateCategory(CategoryCreateDto categoryCreateDto);
    @Mapping(target = "id", ignore = true) // Không cập nhật ID
    void updateCategoryFromDto(CategoryCreateDto dto, @MappingTarget Category category);
}
