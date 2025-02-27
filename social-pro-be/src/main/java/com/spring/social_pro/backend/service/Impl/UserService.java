package com.spring.social_pro.backend.service.Impl;

import com.spring.social_pro.backend.dto.request.user.UserFilterRequest;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.UserResponse;
import com.spring.social_pro.backend.entity.User;
import com.spring.social_pro.backend.mapper.UserMapper;
import com.spring.social_pro.backend.repository.UserRepository;
import com.spring.social_pro.backend.repository.criteria.UserCriteriaRepository;
import com.spring.social_pro.backend.repository.specification.FilterSpecification;
import com.spring.social_pro.backend.service.IUserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

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
}
