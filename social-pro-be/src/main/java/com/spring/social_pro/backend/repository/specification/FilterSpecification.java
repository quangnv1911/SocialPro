package com.spring.social_pro.backend.repository.specification;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class FilterSpecification {
    public static <T> Specification<T> fromFilters(Map<String, Object> filters, String sortBy, String sortOrder) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            for (Map.Entry<String, Object> entry : filters.entrySet()) {
                String key = entry.getKey();
                Object value = entry.getValue();
                if (value instanceof String && !((String) value).isEmpty()) {
                    predicates.add(cb.like(cb.lower(root.get(key)), "%" + value.toString().toLowerCase() + "%"));
                } else if (value != null) {
                    predicates.add(cb.equal(root.get(key), value));
                }
            }
            if (sortBy != null) {
                if ("DESC".equalsIgnoreCase(sortOrder)) {
                    query.orderBy(cb.desc(root.get(sortBy)));
                } else {
                    query.orderBy(cb.asc(root.get(sortBy)));
                }
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}