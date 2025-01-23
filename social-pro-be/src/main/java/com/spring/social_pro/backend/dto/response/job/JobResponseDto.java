package com.spring.social_pro.backend.dto.response.job;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobResponseDto {
    String jobName;
    String groupName;
    String cronExpression;
    String details;
}
