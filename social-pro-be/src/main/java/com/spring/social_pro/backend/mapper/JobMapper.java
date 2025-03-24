package com.spring.social_pro.backend.mapper;

import com.spring.social_pro.backend.dto.request.job.CreateJobDto;
import com.spring.social_pro.backend.dto.response.job.JobResponseDto;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.quartz.JobDetail;
import org.quartz.Trigger;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(builder = @Builder(disableBuilder = true), imports = Collectors.class)
public interface JobMapper {
    JobMapper INSTANCE = Mappers.getMapper(JobMapper.class);

//    JobDetail toJobDetail(CreateJobDto createJobDto);

    @Mapping(target = "name", expression = "java(jobDetail.getKey().getName())") // Lấy tên Job
    @Mapping(target = "cronUrl", expression = "java(jobDetail.getJobDataMap().getString(\"cronUrl\"))")
    @Mapping(target = "intervalSeconds", expression = "java(jobDetail.getJobDataMap().getString(\"intervalSeconds\"))")
    @Mapping(target = "method", expression = "java(jobDetail.getJobDataMap().getString(\"method\"))")
    @Mapping(target = "duration", expression = "java(jobDetail.getJobDataMap().getString(\"duration\"))")
    @Mapping(target = "lastSchedule", expression = "java(mapLastSchedule(triggers))")
    JobResponseDto toJobResponseDto(JobDetail jobDetail, List<? extends Trigger> triggers);

    default LocalDateTime mapLastSchedule(List<? extends Trigger> triggers) {
        if (triggers == null || triggers.isEmpty()) {
            return null;
        }
        return triggers.get(0).getPreviousFireTime() != null
                ? triggers.get(0).getPreviousFireTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime()
                : null;
    }

}
