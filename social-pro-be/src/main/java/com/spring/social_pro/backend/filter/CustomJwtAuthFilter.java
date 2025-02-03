package com.spring.social_pro.backend.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.exception.ExpiredTokenException;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class CustomJwtAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(@Nonnull  HttpServletRequest request,
                                    @Nonnull HttpServletResponse response,
                                    @Nonnull FilterChain filterChain)
            throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        }catch (ExpiredTokenException exception) {
            ErrorCode errorCode = exception.getErrorCode();
            ApiResponse<Object> apiResponse = ApiResponse.builder()
                    .status(errorCode.getCode())
                    .message(errorCode.getMessage())
                    .build();

            response.setStatus(errorCode.getStatusCode().value());
            response.getWriter().write(new ObjectMapper().writeValueAsString(apiResponse));
        }
    }
}
