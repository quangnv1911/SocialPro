package com.spring.social_pro.backend.mapper;

import com.spring.social_pro.backend.dto.response.paymentHistory.PaymentHistoryResponse;
import com.spring.social_pro.backend.entity.PaymentHistory;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.stream.Collectors;

@Mapper(builder = @Builder(disableBuilder = true), imports = Collectors.class)
public interface PaymentHistoryMapper {
    PaymentHistoryMapper INSTANCE = Mappers.getMapper(PaymentHistoryMapper.class);

    PaymentHistoryResponse toPaymentHistoryResponse(PaymentHistory paymentHistory);

}
