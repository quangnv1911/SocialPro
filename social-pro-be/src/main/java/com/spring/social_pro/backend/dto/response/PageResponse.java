package com.spring.social_pro.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;

import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageResponse<T> {
    int currentPage; // trang hiện tại
    int totalPages; // tổng số trang
    int pageSize;   // size của trang là bao nhiêu
    long totalElements; // tổng số phần tử, element

    @Builder.Default
    List<T> data = Collections.emptyList();

    public static <T, U> PageResponse<U> fromPage(Page<T> page, Function<T, U> mapperFunction) {
        return PageResponse.<U>builder()
                .currentPage(page.getNumber()) // Vì Spring Page bắt đầu từ 0
                .totalPages(page.getTotalPages())
                .pageSize(page.getSize())
                .totalElements(page.getTotalElements())
                .data(page.getContent().stream().map(mapperFunction).collect(Collectors.toList()))
                .build();
    }
}
