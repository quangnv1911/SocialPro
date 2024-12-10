package com.social_pro.backend.backend.exception;

public class InvalidTokenException extends AppException{
    public InvalidTokenException() {
        super(ErrorCode.UNAUTHENTICATED);
    }
}
