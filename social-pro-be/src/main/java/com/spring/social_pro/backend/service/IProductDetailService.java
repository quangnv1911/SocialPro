package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.request.product.ProductCreateDto;
import com.spring.social_pro.backend.dto.request.product.ProductFilerRequest;
import com.spring.social_pro.backend.dto.request.productDetail.ProductDetailCreateDto;
import com.spring.social_pro.backend.dto.request.productDetail.ProductDetailFilter;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.product.ProductResponse;
import com.spring.social_pro.backend.dto.response.productDetail.ProductDetailResponse;

import java.util.UUID;

public interface IProductDetailService {
    PageResponse<ProductDetailResponse> getProductsDetail(ProductDetailFilter request);
    ProductDetailResponse getProductDetail(UUID id);
    ProductDetailResponse createProductDetail(ProductDetailCreateDto productDetailCreateDto);
    void deleteProductDetail(UUID id);
    ProductDetailResponse updateProductDetail(UUID id, ProductDetailCreateDto productCreateDto);

}
