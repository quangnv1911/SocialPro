package com.spring.social_pro.backend.exception;

public class InvalidTokenException extends AppException{
    public InvalidTokenException() {
        super(ErrorCode.UNAUTHENTICATED);
    }
}
