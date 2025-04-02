package com.spring.social_pro.backend.repository.specification;

import com.spring.social_pro.backend.entity.Order;
import com.spring.social_pro.backend.entity.OrderDetail;
import com.spring.social_pro.backend.entity.User;
import jakarta.persistence.criteria.Fetch;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class OrderSpecification {
    public static Specification<Order> filterOrders(String name, UUID userId) {
        return (root, query, criteriaBuilder) -> {
            // Tránh duplicate khi dùng DISTINCT
            assert query != null;
            query.distinct(true);

            Fetch<Order, OrderDetail> orderDetailJoin = root.fetch("orderDetails", JoinType.LEFT);

// Fetch productDetails from OrderDetail (one-to-many)
            orderDetailJoin.fetch("productDetails", JoinType.LEFT);

            Join<Order, User> userJoin = root.join("user", JoinType.LEFT);

            List<Predicate> predicates = new ArrayList<>();

            // Lọc theo name
            if (name != null && !name.isEmpty()) {
                predicates.add(criteriaBuilder.like(userJoin.get("name"), "%" + name + "%"));
            }
//
//            // Lọc theo userId
            if (userId != null) {
                predicates.add(criteriaBuilder.equal(userJoin.get("id"), userId)); // Đảm bảo "id" là tên đúng của thuộc tính
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
