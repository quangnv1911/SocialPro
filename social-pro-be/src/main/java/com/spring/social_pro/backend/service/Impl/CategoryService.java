package com.spring.social_pro.backend.service.Impl;

import com.spring.social_pro.backend.dto.request.category.CategoryCreateDto;
import com.spring.social_pro.backend.dto.request.category.CategoryFilterRequest;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.category.CategoryResponse;
import com.spring.social_pro.backend.entity.Category;
import com.spring.social_pro.backend.enums.BigCategory;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.mapper.CategoryMapper;
import com.spring.social_pro.backend.repository.CategoryRepository;
import com.spring.social_pro.backend.service.ICategoryService;
import com.spring.social_pro.backend.util.PaginationUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService implements ICategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @Override
    public PageResponse<CategoryResponse> getCategories(CategoryFilterRequest request) {
        Pageable pageRequest = PaginationUtil.createPageRequest(
                request.getPage(), request.getPageSize(), request.getSortBy(), request.getSortOrder()
        );
        var categories =  categoryRepository.findByNameContaining(request.getName(),pageRequest);
        return PageResponse.fromPage(categories, categoryMapper::toCategoryResponse);
    }

    @Override
    public CategoryResponse getCategory(UUID id) {
        var category = checkCategoryExist(id);
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public CategoryResponse createCategory(CategoryCreateDto categoryCreateDto) {
        Category category = categoryMapper.toCategoryFromCreateCategory(categoryCreateDto);
        var newCategory = categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(newCategory);
    }

    @Override
    public void deleteCategory(UUID id) {
        var category = checkCategoryExist(id);
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryResponse updateCategory(UUID id, CategoryCreateDto categoryCreateDto) {
        var category = checkCategoryExist(id);
        categoryMapper.updateCategoryFromDto(categoryCreateDto, category);
        var updatedCategory = categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(updatedCategory);
    }

    @Override
    public List<BigCategory> getBigCategories() {
        return Arrays.stream(BigCategory.values())
                .collect(Collectors.toList());
    }

    private Category checkCategoryExist(UUID id) {
        return categoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXIST));
    }
}
