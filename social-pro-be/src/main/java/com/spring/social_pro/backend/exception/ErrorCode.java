package com.spring.social_pro.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    EXPIRED_TOKEN(1009, "EXPIRED_TOKEN", HttpStatus.UNAUTHORIZED),
    INVALID_OTP(1010, "Otp is not valid", HttpStatus.BAD_REQUEST),
    INVALID_CAPTCHA(1011, "Captcha is not valid", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(1012, "Role not existed", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_NOT_ENABLED(1013, "User not enabled", HttpStatus.BAD_REQUEST),
    CONCURRENCY_FAILURE(1014, "Concurrency failure", HttpStatus.CONFLICT),
    CATEGORY_NOT_EXIST(1015, "Category not existed", HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_EXIST(1016, "Product not existed", HttpStatus.BAD_REQUEST),
    PRODUCT_DETAIL_NOT_EXIST(1017, "Product detail not existed", HttpStatus.BAD_REQUEST),
    USER_ROLE_NOT_FOUND(1018, "User role not existed", HttpStatus.BAD_REQUEST),;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}