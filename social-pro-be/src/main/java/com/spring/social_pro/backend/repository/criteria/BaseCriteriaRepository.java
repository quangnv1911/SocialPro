package com.spring.social_pro.backend.repository.criteria;

import com.spring.social_pro.backend.enums.SortEnum;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public abstract class BaseCriteriaRepository<T> {
    @PersistenceContext
    protected EntityManager entityManager;

    protected abstract Class<T> getEntityClass();

    public Page<T> findByCriteria(Map<String, Object> filters, Pageable pageable, String sortBy, String sortOrder) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> cq = cb.createQuery(getEntityClass());
        Root<T> root = cq.from(getEntityClass());

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

        cq.where(predicates.toArray(new Predicate[0]));

        if (sortBy != null) {
            if (SortEnum.DESC.name().equalsIgnoreCase(sortOrder)) {
                cq.orderBy(cb.desc(root.get(sortBy)));
            } else {
                cq.orderBy(cb.asc(root.get(sortBy)));
            }
        }

        TypedQuery<T> query = entityManager.createQuery(cq);
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        List<T> results = query.getResultList();

        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<T> countRoot = countQuery.from(getEntityClass());
        countQuery.select(cb.count(countRoot)).where(predicates.toArray(new Predicate[0]));
        Long totalCount = entityManager.createQuery(countQuery).getSingleResult();

        return new PageImpl<>(results, pageable, totalCount);
    }
}
