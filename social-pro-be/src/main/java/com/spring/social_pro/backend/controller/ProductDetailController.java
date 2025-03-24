package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.dto.request.product.ProductCreateDto;
import com.spring.social_pro.backend.dto.request.product.ProductFilerRequest;
import com.spring.social_pro.backend.dto.request.productDetail.ProductDetailCreateDto;
import com.spring.social_pro.backend.dto.request.productDetail.ProductDetailFilter;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.product.ProductResponse;
import com.spring.social_pro.backend.dto.response.productDetail.ProductDetailResponse;
import com.spring.social_pro.backend.service.IProductDetailService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${apiPrefix}/productDetail")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Product Detail", description = "API for product detail service")
public class ProductDetailController {
    IProductDetailService productDetailService;

    @GetMapping("/")
    public ApiResponse<?> getAllProductDetail(@RequestParam ProductDetailFilter request) {
        var products = productDetailService.getProductsDetail(request);
        return ApiResponse.<PageResponse<ProductDetailResponse>>builder()
                .status(HttpStatus.OK.value())
                .data(products)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getProductDetail(@PathVariable UUID id) {
        var product = productDetailService.getProductDetail(id);
        return ApiResponse.<ProductDetailResponse>builder()
                .status(HttpStatus.OK.value())
                .data(product)
                .build();


    }

    @PostMapping("")
    public ApiResponse<?> createNewProductDetail(@RequestBody ProductDetailCreateDto productDetailDto) {
        var newProduct = productDetailService.createProductDetail(productDetailDto);
        return ApiResponse.<ProductDetailResponse>builder()
                .status(HttpStatus.OK.value())
                .data(newProduct)
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<?> updateProductDetail(@PathVariable UUID id, @RequestBody ProductDetailCreateDto productDetailDto) {
        var newProduct = productDetailService.updateProductDetail(id, productDetailDto);
        return ApiResponse.<ProductDetailResponse>builder()
                .status(HttpStatus.OK.value())
                .data(newProduct)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteProductDetail(@PathVariable UUID id) {
        productDetailService.deleteProductDetail(id);
        return ApiResponse.<String>builder()
                .status(HttpStatus.OK.value())
                .data(id + " has been deleted")
                .build();
    }
}
