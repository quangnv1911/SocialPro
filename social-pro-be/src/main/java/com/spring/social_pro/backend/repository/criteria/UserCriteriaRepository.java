package com.spring.social_pro.backend.repository.criteria;

import com.spring.social_pro.backend.dto.request.user.UserFilterRequest;
import com.spring.social_pro.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class UserCriteriaRepository extends BaseCriteriaRepository<User>{
    @Override
    protected Class<User> getEntityClass() {
        return null;
    }

    public Page<User> findUsersByCriteria(UserFilterRequest filterRequest, Pageable pageable) {
        Map<String, Object> filters = new HashMap<>();


        if (filterRequest.getUserName() != null) filters.put("userName", filterRequest.getUserName());
        if (filterRequest.getEmail() != null) filters.put("email", filterRequest.getEmail());
        if (filterRequest.getIp() != null) filters.put("ip", filterRequest.getIp());
        if (filterRequest.getStatus() != null) filters.put("status", filterRequest.getStatus());

        return findByCriteria(filters, pageable, filterRequest.getSortBy(), filterRequest.getSortOrder());
    }
}
