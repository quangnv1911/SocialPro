package com.spring.social_pro.backend.mapper;

import com.spring.social_pro.backend.dto.response.payment.GeneratePaymentResponse;
import com.spring.social_pro.backend.dto.response.payment.PaymentResponse;
import com.spring.social_pro.backend.entity.Payment;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.stream.Collectors;

@Mapper(builder = @Builder(disableBuilder = true), imports = Collectors.class)
public interface PaymentMapper {
    PaymentMapper INSTANCE = Mappers.getMapper(PaymentMapper.class);

    GeneratePaymentResponse toGeneratePaymentResponse(Payment payment);

    PaymentResponse toPaymentResponse(Payment payment);
}
