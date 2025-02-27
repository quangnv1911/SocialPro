package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.dto.request.user.UserFilterRequest;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.UserResponse;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.service.IUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${apiPrefix}/user")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "User", description = "API for user service")
public class UserController {

    IUserService userService;
    @GetMapping("/")
    public ApiResponse<?> getUsers(@RequestParam UserFilterRequest request) {

        var result = userService.getUsers(request);
        if(result == null){
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        return ApiResponse.<PageResponse<UserResponse>>builder()
                .status(HttpStatus.OK.value())
                .data(result)
                .build();
    }


}
