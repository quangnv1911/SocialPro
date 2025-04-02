package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.request.product.ProductCreateDto;
import com.spring.social_pro.backend.dto.request.product.ProductFilerRequest;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.product.ProductResponse;
import com.spring.social_pro.backend.enums.Duration;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.UUID;

public interface IProductService {
    PageResponse<ProductResponse> getProducts(ProductFilerRequest request);
    ProductResponse getProduct(UUID id);
    List<ProductResponse> getTopSellingProducts(Integer limit);
    ProductResponse createNewProduct(ProductCreateDto productCreateDto);
    void deleteProduct(UUID id);
    ProductResponse updateProduct(UUID id, ProductCreateDto productCreateDto);
    int getAvailableStock(UUID id, Duration duration);

}
