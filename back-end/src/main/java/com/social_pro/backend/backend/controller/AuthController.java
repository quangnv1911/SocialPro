package com.social_pro.backend.backend.controller;

import com.social_pro.backend.backend.dto.request.ApiRequest;
import com.social_pro.backend.backend.dto.request.UserCreationRequest;
import com.social_pro.backend.backend.dto.response.ApiResponse;
import com.social_pro.backend.backend.dto.response.UserResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController extends BaseController{

    @PostMapping("/register")
    public ApiResponse<UserResponse> createUser(@RequestBody @Valid ApiRequest<UserCreationRequest> request,
                                                @RequestParam String otp) {
//        var result = userService.createUser(request, otp);
        var result = new UserResponse();
        return ApiResponse.<UserResponse>builder()
                .status(HttpStatus.CREATED.value())
                .data(result)
                .build();
    }
}
