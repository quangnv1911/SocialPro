package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.dto.request.ApiRequest;
import com.spring.social_pro.backend.dto.request.payment.PaymentCallbackRequest;
import com.spring.social_pro.backend.dto.request.payment.PaymentFilterRequest;
import com.spring.social_pro.backend.dto.request.payment.PaymentGenerateRequest;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.user.UserResponse;
import com.spring.social_pro.backend.dto.response.payment.GeneratePaymentResponse;
import com.spring.social_pro.backend.dto.response.payment.PaymentResponse;
import com.spring.social_pro.backend.service.IPaymentService;
import com.spring.social_pro.backend.util.JwtUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${apiPrefix}/payment")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Payment", description = "API for payment service")
public class PaymentController {
    IPaymentService paymentService;
    JwtUtils jwtUtils;

    @GetMapping("/")
    public ApiResponse<?> getAllPayments(@ModelAttribute PaymentFilterRequest request) {
        var paymentList = paymentService.getPayments(request);
        return ApiResponse.<PageResponse<PaymentResponse>>builder()
                .status(HttpStatus.OK.value())
                .data(paymentList)
                .build();


    }

    @PostMapping("/generate")
    public ApiResponse<?> generatePayment(@RequestBody @Valid ApiRequest<PaymentGenerateRequest> request,
                                          @RequestHeader("Authorization") String authorizationHeader) {

        GeneratePaymentResponse response = paymentService.createNewPayment(request.getData());
        // Trả về thông tin người dùng
        return ApiResponse.<GeneratePaymentResponse>builder()
                .status(HttpStatus.CREATED.value())
                .data(response)
                .build();


    }

    @PostMapping("/callback")
    public ApiResponse<?> handleCallbackPayment(@RequestBody @Valid PaymentCallbackRequest request) {
        paymentService.handlePaymentCallback(request);
        return ApiResponse.<String>builder()
                .status(HttpStatus.CREATED.value())
                .data("Payment success")
                .build();
    }
}
