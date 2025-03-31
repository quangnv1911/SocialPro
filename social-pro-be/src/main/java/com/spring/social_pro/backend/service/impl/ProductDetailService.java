package com.spring.social_pro.backend.service.impl;

import com.spring.social_pro.backend.dto.request.product.ProductFilerRequest;
import com.spring.social_pro.backend.dto.request.productDetail.ProductDetailCreateDto;
import com.spring.social_pro.backend.dto.request.productDetail.ProductDetailFilter;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.productDetail.ProductDetailResponse;
import com.spring.social_pro.backend.entity.ProductDetail;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.mapper.ProductDetailMapper;
import com.spring.social_pro.backend.repository.ProductDetailRepository;
import com.spring.social_pro.backend.service.IProductDetailService;
import com.spring.social_pro.backend.util.PaginationUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductDetailService implements IProductDetailService {
    ProductDetailRepository productDetailRepository;
    ProductDetailMapper productDetailMapper;

    @Override
    public PageResponse<ProductDetailResponse> getProductsDetail(ProductDetailFilter request) {
        Pageable pageRequest = PaginationUtil.createPageRequest(
                request.getPage(), request.getPageSize(), request.getSortBy(), request.getSortOrder()
        );

        var productDetails = productDetailRepository.findByStatus(request.getStatus(), pageRequest);
        return PageResponse.fromPage(productDetails, productDetailMapper::toProductDetailResponse);
    }

    @Override
    public ProductDetailResponse getProductDetail(UUID id) {
        var productDetail = checkProductDetailExist(id);
        return productDetailMapper.toProductDetailResponse(productDetail);
    }

    @Override
    public ProductDetailResponse createProductDetail(ProductDetailCreateDto productDetailCreateDto) {
        var productDetail = productDetailMapper.toProductDetailFromCreateDto(productDetailCreateDto);
        var newProductDetail = productDetailRepository.save(productDetail);
        return productDetailMapper.toProductDetailResponse(newProductDetail);
    }

    @Override
    public void deleteProductDetail(UUID id) {
        checkProductDetailExist(id);
        productDetailRepository.deleteById(id);
    }

    @Override
    public ProductDetailResponse updateProductDetail(UUID id, ProductDetailCreateDto productDetailCreateDto) {
        var productDetail = checkProductDetailExist(id);
        productDetailMapper.updateProductDetailFromDto(productDetailCreateDto, productDetail);
        var updatedProductDetail = productDetailRepository.save(productDetail);
        return productDetailMapper.toProductDetailResponse(updatedProductDetail);
    }

    private ProductDetail checkProductDetailExist(UUID id) {
        return productDetailRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_EXIST));
    }
}
