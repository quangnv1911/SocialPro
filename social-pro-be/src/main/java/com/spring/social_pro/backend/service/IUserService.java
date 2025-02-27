package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.request.user.UserFilterRequest;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.UserResponse;
import org.springframework.data.domain.PageRequest;

public interface IUserService {
    PageResponse<UserResponse> getUsers(UserFilterRequest request);
}
