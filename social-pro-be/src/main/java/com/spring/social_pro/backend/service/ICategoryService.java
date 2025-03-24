package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.request.category.CategoryCreateDto;
import com.spring.social_pro.backend.dto.request.category.CategoryFilterRequest;
import com.spring.social_pro.backend.dto.request.product.ProductCreateDto;
import com.spring.social_pro.backend.dto.request.product.ProductFilerRequest;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.category.CategoryResponse;
import com.spring.social_pro.backend.dto.response.product.ProductResponse;
import com.spring.social_pro.backend.enums.BigCategory;

import java.util.List;
import java.util.UUID;

public interface ICategoryService {
    PageResponse<CategoryResponse> getCategories(CategoryFilterRequest request);
    CategoryResponse getCategory(UUID id);
    CategoryResponse createCategory(CategoryCreateDto categoryCreateDto);
    void deleteCategory(UUID id);
    CategoryResponse updateCategory(UUID id, CategoryCreateDto categoryCreateDto);
    List<BigCategory> getBigCategories();

}
