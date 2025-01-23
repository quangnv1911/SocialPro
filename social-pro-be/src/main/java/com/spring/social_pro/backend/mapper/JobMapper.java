package com.spring.social_pro.backend.mapper;

import com.spring.social_pro.backend.dto.response.job.JobResponseDto;
import org.mapstruct.factory.Mappers;
import org.quartz.JobDetail;

public interface JobMapper {
    JobMapper INSTANCE = Mappers.getMapper(JobMapper.class);


    JobResponseDto toJobResponseDto(JobDetail jobDetail);

}
