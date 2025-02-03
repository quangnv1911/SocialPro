package com.spring.social_pro.backend.dto.request.job;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class CreateJobDto {
    String jobName;
    String groupName;
    String cronExpression;
    String details;
}
