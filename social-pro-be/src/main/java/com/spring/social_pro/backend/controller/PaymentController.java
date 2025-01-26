package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.base.BaseController;
import com.spring.social_pro.backend.dto.request.ApiRequest;
import com.spring.social_pro.backend.dto.request.payment.PaymentCallbackRequest;
import com.spring.social_pro.backend.dto.request.user.UserCreationRequest;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.UserResponse;
import com.spring.social_pro.backend.service.Impl.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("/payment")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController extends BaseController {
    AuthenticationService authenticationService;

    @PostMapping("/callback")
    public ApiResponse<UserResponse> handleCallbackPayment(@RequestBody @Valid PaymentCallbackRequest request,
                                                @RequestParam String otp) {
//        var result = userService.createUser(request, otp);
        var result = new UserResponse();
        return ApiResponse.<UserResponse>builder()
                .status(HttpStatus.CREATED.value())
                .data(result)
                .build();
    }
}
