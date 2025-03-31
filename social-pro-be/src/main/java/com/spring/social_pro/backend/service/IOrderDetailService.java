package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.dto.data.message.OrderDetailMessage;

public interface IOrderDetailService {
    void processOrderDetail(OrderDetailMessage message);
}
