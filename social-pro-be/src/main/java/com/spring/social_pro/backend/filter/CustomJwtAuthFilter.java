package com.spring.social_pro.backend.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.entity.User;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.exception.ExpiredTokenException;
import com.spring.social_pro.backend.repository.UserRepository;
import com.spring.social_pro.backend.util.JwtUtils;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomJwtAuthFilter extends OncePerRequestFilter {
    JwtUtils jwtUtils;
    UserRepository userRepository;

    @Override
    protected void doFilterInternal(@Nonnull HttpServletRequest request,
                                    @Nonnull HttpServletResponse response,
                                    @Nonnull FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String header = request.getHeader("Authorization");
            if (header != null && header.startsWith("Bearer ")) {
                String accessToken = header.replace("Bearer ", "");
                var claims = jwtUtils.getUserInfoFromAccessToken(accessToken);
                UUID userId = UUID.fromString(claims.getClaim("id").toString());
                String roleName = claims.getClaim("role").toString();
               if (roleName == null) {
                    throw new AppException(ErrorCode.USER_ROLE_NOT_FOUND);
                }
                List<GrantedAuthority> authorities = Collections.singletonList(
                        new SimpleGrantedAuthority("ROLE_" + roleName));

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userId, null, authorities);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        } catch (ExpiredTokenException exception) {
            log.error(exception.getMessage());
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
