package com.spring.social_pro.backend.dto.request.job;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateJobDto {
    String name;
    String cronUrl;
    String intervalSeconds;
    String method;
    String duration;
}