package com.spring.social_pro.backend.service.impl;

import com.spring.social_pro.backend.dto.request.product.ProductCreateDto;
import com.spring.social_pro.backend.dto.request.product.ProductFilerRequest;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.product.ProductResponse;
import com.spring.social_pro.backend.entity.Product;
import com.spring.social_pro.backend.enums.Duration;
import com.spring.social_pro.backend.enums.ProductStatus;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.mapper.ProductMapper;
import com.spring.social_pro.backend.repository.ProductRepository;
import com.spring.social_pro.backend.service.IProductService;
import com.spring.social_pro.backend.util.PaginationUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService implements IProductService {
    ProductRepository productRepository;
    ProductMapper productMapper;

    @Override
    public PageResponse<ProductResponse> getProducts(ProductFilerRequest request) {
        Pageable pageRequest = PaginationUtil.createPageRequest(
                request.getPage(), request.getPageSize(), request.getSortBy(), request.getSortOrder()
        );

        String name = (request.getName() != null && !request.getName().isEmpty()) ? request.getName() : null;
        UUID categoryId = (request.getCategoryId() != null) ? request.getCategoryId() : null;

        var products = productRepository.findProducts(name, categoryId, pageRequest);
        return PageResponse.fromPage(products, productMapper::toProductResponse);
    }

    @Override
    public ProductResponse getProduct(UUID id) {
        var product = checkProductExist(id);
        return productMapper.toProductResponse(product);
    }

    @Override
    public List<ProductResponse> getTopSellingProducts(Integer limit) {
        return productRepository.findTopByTotalSold(limit);
    }

    @Override
    public ProductResponse createNewProduct(ProductCreateDto productCreateDto) {
        Product product = productMapper.toProductFromCreateDto(productCreateDto);
        var newProduct = productRepository.save(product);
        return productMapper.toProductResponse(newProduct);
    }

    @Override
    public void deleteProduct(UUID id) {
        checkProductExist(id);
        productRepository.deleteById(id);
    }

    @Override
    public ProductResponse updateProduct(UUID id, ProductCreateDto productCreateDto) {
        var product = checkProductExist(id);
        productMapper.updateProductFromDto(productCreateDto, product);
        var updatedProduct = productRepository.save(product);
        return productMapper.toProductResponse(updatedProduct);
    }

    @Override
    public int getAvailableStock(UUID id, Duration duration) {
        return productRepository.countProductDetails(id, ProductStatus.NotPurchased, duration);
    }

    private Product checkProductExist(UUID id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXIST));
    }
}
