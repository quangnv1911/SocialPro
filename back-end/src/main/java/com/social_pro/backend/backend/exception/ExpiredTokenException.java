package com.social_pro.backend.backend.exception;

public class ExpiredTokenException extends AppException{
    public ExpiredTokenException() {
        super(ErrorCode.EXPIRED_TOKEN);
    }
}
