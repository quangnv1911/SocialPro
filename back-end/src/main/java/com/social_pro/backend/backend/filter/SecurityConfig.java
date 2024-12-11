package com.social_pro.backend.backend.filter;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

//@Configuration
//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        // Cấu hình HttpSecurity
//        http
//                // Thêm bộ lọc JWT trước UsernamePasswordAuthenticationFilter
//                .addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
//
//                // Cấu hình các yêu cầu truy cập
//                .authorizeRequests()
//                // Cho phép không cần xác thực với Swagger UI và tài liệu API
//                .antMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
//
//                // Các yêu cầu khác phải xác thực
//                .anyRequest().authenticated()
//
//                // Tắt CSRF (nếu ứng dụng không cần CSRF)
//                .and().csrf().disable();
//    }
//}
