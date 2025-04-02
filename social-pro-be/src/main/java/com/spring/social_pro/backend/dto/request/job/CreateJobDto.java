package com.spring.social_pro.backend.dto.request.job;

import com.spring.social_pro.backend.enums.Duration;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateJobDto {
    String cronUrl;
    Integer intervalSeconds;
    String method;
    Duration duration;
}