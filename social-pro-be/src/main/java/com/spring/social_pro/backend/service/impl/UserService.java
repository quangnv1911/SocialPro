package com.spring.social_pro.backend.service.impl;

import com.spring.social_pro.backend.dto.request.user.UserFilterRequest;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.user.UserResponse;
import com.spring.social_pro.backend.entity.User;
import com.spring.social_pro.backend.exception.AppException;
import com.spring.social_pro.backend.exception.ErrorCode;
import com.spring.social_pro.backend.mapper.UserMapper;
import com.spring.social_pro.backend.repository.UserRepository;
import com.spring.social_pro.backend.repository.criteria.UserCriteriaRepository;
import com.spring.social_pro.backend.service.IUserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService implements IUserService {
    UserRepository userRepository;
    UserCriteriaRepository userCriteriaRepository;
    UserMapper userMapper;

    @Override
    public PageResponse<UserResponse> getUsers(UserFilterRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getPageSize());
        Page<User> users = userCriteriaRepository.findUsersByCriteria(request, pageable);
        return PageResponse.fromPage(users, userMapper::toUserResponse);
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }

        Object principal = authentication.getPrincipal();

        // Nếu principal là userId (String), tìm user theo ID
        if (principal instanceof UUID userId) {
            try {
                return userRepository.findById(userId).orElse(null);
            } catch (IllegalArgumentException e) {
                return null; // Tránh lỗi nếu userId không phải UUID hợp lệ
            }
        }

        return null;
    }


    @Override
    public UserResponse getMe() {
        var user = getCurrentUser();
        return userMapper.toUserResponse(user);
    }

    @Override
    public void handlePurchaseProcessing(User user, String price) {

    }
}
