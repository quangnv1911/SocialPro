package com.spring.social_pro.backend.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PaginationUtil {
    public static Sort.Direction sortDirection (String direction) {
        return  direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;

    }

    public static Pageable createPageRequest(int page, int size, String sortBy, String sortOrder) {
        Sort.Direction direction = PaginationUtil.sortDirection(sortOrder);
        return PageRequest.of(page - 1, size, Sort.by(direction, sortBy));
    }
}
