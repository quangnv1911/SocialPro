package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.request.user.UserFilterRequest;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.user.UserResponse;
import com.spring.social_pro.backend.entity.User;

public interface IUserService {
    PageResponse<UserResponse> getUsers(UserFilterRequest request);
    User getCurrentUser();
    UserResponse getMe();
    void handlePurchaseProcessing(User user, String price);
}
