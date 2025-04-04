package com.spring.social_pro.backend.mapper;

import com.spring.social_pro.backend.dto.data.user.UserPayloadData;
import com.spring.social_pro.backend.dto.request.user.UserCreationRequest;
import com.spring.social_pro.backend.dto.response.user.UserResponse;
import com.spring.social_pro.backend.entity.User;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.stream.Collectors;

@Mapper(builder = @Builder(disableBuilder = true), imports = Collectors.class)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);


    UserCreationRequest toUserCreationRequest(User user);

    @Mapping(source = "role.roleName", target = "roleName")
    UserResponse toUserResponse(User user);
    UserPayloadData toUserPayloadData(User user);
}
