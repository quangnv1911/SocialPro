package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.dto.request.category.CategoryCreateDto;
import com.spring.social_pro.backend.dto.request.category.CategoryFilterRequest;
import com.spring.social_pro.backend.dto.request.product.ProductCreateDto;
import com.spring.social_pro.backend.dto.request.product.ProductFilerRequest;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.category.CategoryProductResponse;
import com.spring.social_pro.backend.dto.response.category.CategoryResponse;
import com.spring.social_pro.backend.enums.BigCategory;
import com.spring.social_pro.backend.service.ICategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${apiPrefix}/category")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Category", description = "API for category service")
public class CategoryController {
    ICategoryService categoryService;

    @GetMapping("/big-category")
    public ApiResponse<?> getAllBigCategories() {
        var product = categoryService.getBigCategories();
        return ApiResponse.<List<BigCategory>>builder()
                .status(HttpStatus.OK.value())
                .data(product)
                .build();
    }

    @GetMapping("/list/{bigCategory}")
    public ApiResponse<?> getAllCategories(@PathVariable BigCategory bigCategory) {
        var categories = categoryService.getCategories(bigCategory);
        return ApiResponse.<List<CategoryResponse>>builder()
                .status(HttpStatus.OK.value())
                .data(categories)
                .build();
    }

    @GetMapping("/products")
    public ApiResponse<?> getAllCategoriesWithProducts() {
        var categories = categoryService.getAllCategoriesWithProducts();
        return ApiResponse.<List<CategoryProductResponse>>builder()
                .status(HttpStatus.OK.value())
                .data(categories)
                .build();
    }


    @GetMapping("/{id}")
    public ApiResponse<?> getCategory(@PathVariable UUID id) {
        var product = categoryService.getCategory(id);
        return ApiResponse.<CategoryResponse>builder()
                .status(HttpStatus.OK.value())
                .data(product)
                .build();
    }

    @PostMapping("")
    public ApiResponse<?> createCategory(@RequestBody CategoryCreateDto product) {
        var newProduct = categoryService.createCategory(product);
        return ApiResponse.<CategoryResponse>builder()
                .status(HttpStatus.OK.value())
                .data(newProduct)
                .build();
    }

    @PutMapping("")
    public ApiResponse<?> updateCategory(@RequestParam UUID id, @RequestBody CategoryCreateDto product) {
        var newProduct = categoryService.updateCategory(id, product);
        return ApiResponse.<CategoryResponse>builder()
                .status(HttpStatus.OK.value())
                .data(newProduct)
                .build();
    }

    @DeleteMapping("")
    public ApiResponse<?> deleteCategory(@RequestParam UUID id) {
        categoryService.deleteCategory(id);
        return ApiResponse.<String>builder()
                .status(HttpStatus.OK.value())
                .data(id + " has been deleted")
                .build();
    }
}
