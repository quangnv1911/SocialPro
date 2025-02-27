package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.dto.request.payment.PaymentGenerateRequest;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.payment.GeneratePaymentResponse;
import com.spring.social_pro.backend.service.IPaymentHistoryService;
import com.spring.social_pro.backend.util.JwtUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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
@RequestMapping(path = "${apiPrefix}/payment-history")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Payment History", description = "API for payment history service")
public class PaymentHistoryController {
    JwtUtils jwtUtils;
    IPaymentHistoryService paymentHistoryService;

    @PostMapping("")
    public ApiResponse<?> createNewPayment(@RequestBody @Valid PaymentGenerateRequest request,
                                          @RequestHeader("Authorization") String authorizationHeader) {
        try {
//            // Lấy accessToken từ header
//            String accessToken = authorizationHeader.replace("Bearer ", "");
//            // Lấy thông tin từ token
//            var claims = jwtUtils.getUserInfoFromAccessToken(accessToken);
//
//            UUID userId = UUID.fromString(claims.getSubject());
//
//            GeneratePaymentResponse response = paymentHistoryService.generateToken(request,userId);
//            // Trả về thông tin người dùng
            return  ApiResponse.<GeneratePaymentResponse>builder()
                    .status(HttpStatus.OK.value())
                    .data(null)
                    .build();


        } catch (Exception e) {
            // Log và trả về lỗi
            log.error("Error processing token: {}", e.getMessage(), e);
            return ApiResponse.<String>builder()
                    .status(HttpStatus.UNAUTHORIZED.value())
                    .data(e.getMessage())
                    .build();
        }
    }
}
