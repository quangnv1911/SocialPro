package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.dto.request.payment.PaymentFilterRequest;
import com.spring.social_pro.backend.dto.request.product.ProductCreateDto;
import com.spring.social_pro.backend.dto.request.product.ProductFilerRequest;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.payment.PaymentResponse;
import com.spring.social_pro.backend.dto.response.product.ProductResponse;
import com.spring.social_pro.backend.entity.Product;
import com.spring.social_pro.backend.service.IProductService;
import com.spring.social_pro.backend.service.Impl.ProductService;
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
@RequestMapping(path = "${apiPrefix}/product")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Products", description = "API for product service")
public class ProductController {
    IProductService productService;

    @GetMapping("/")
    public ApiResponse<?> getAllProducts(@RequestParam ProductFilerRequest request) {
        var products = productService.getProducts(request);
        return ApiResponse.<PageResponse<ProductResponse>>builder()
                .status(HttpStatus.OK.value())
                .data(products)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getProduct(@PathVariable UUID id) {
        var product = productService.getProduct(id);
        return ApiResponse.<ProductResponse>builder()
                .status(HttpStatus.OK.value())
                .data(product)
                .build();


    }

    @PostMapping("")
    public ApiResponse<?> createNewProduct(@RequestBody ProductCreateDto product) {
        var newProduct = productService.createNewProduct(product);
        return ApiResponse.<ProductResponse>builder()
                .status(HttpStatus.OK.value())
                .data(newProduct)
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<?> updateProduct(@PathVariable UUID id, @RequestBody ProductCreateDto product) {
        var newProduct = productService.updateProduct(id, product);
        return ApiResponse.<ProductResponse>builder()
                .status(HttpStatus.OK.value())
                .data(newProduct)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return ApiResponse.<String>builder()
                .status(HttpStatus.OK.value())
                .data(id + " has been deleted")
                .build();
    }
}
