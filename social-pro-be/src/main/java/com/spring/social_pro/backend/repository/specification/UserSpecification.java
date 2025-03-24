package com.spring.social_pro.backend.repository.specification;

import com.spring.social_pro.backend.entity.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecification {
    public static Specification<User> findByEmailOrUserName(String identifier) {
        return (Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            // Nếu identifier rỗng hoặc null, trả về điều kiện luôn đúng (không lọc)
            if (identifier == null || identifier.trim().isEmpty()) {
                return criteriaBuilder.conjunction(); // Tương đương TRUE
            }

            // Chuyển identifier thành chữ hoa để so sánh không phân biệt hoa/thường
            String identifierUpper = identifier.toUpperCase();

            // Tạo điều kiện cho email
            Predicate emailPredicate = criteriaBuilder.equal(
                    criteriaBuilder.upper(root.get("email")),
                    identifierUpper
            );

            // Tạo điều kiện cho username
            Predicate usernamePredicate = criteriaBuilder.equal(
                    criteriaBuilder.upper(root.get("userName")),
                    identifierUpper
            );

            // Kết hợp hai điều kiện bằng OR
            return criteriaBuilder.or(emailPredicate, usernamePredicate);
        };
    }
}
