package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.dto.request.job.CreateJobDto;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.job.JobResponseDto;
import com.spring.social_pro.backend.service.Impl.JobService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.quartz.SchedulerException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${apiPrefix}/job")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Job", description = "API for job service")
public class JobController {

    JobService jobService;

    @PostMapping("/schedule")
    public ApiResponse<?> scheduleJob(@RequestBody CreateJobDto job) {
        try {
            jobService.scheduleJob(job);
            return ApiResponse.<String>builder()
                    .status(HttpStatus.CREATED.value())
                    .data("Create job successfully")
                    .build();
        } catch (SchedulerException e) {
            log.error(e.getMessage());
            return ApiResponse.<String>builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .data(e.getMessage())
                    .build();
        }
    }

    @GetMapping("/schedule")
    public ApiResponse<?> getAllJobs() throws SchedulerException {

            List<JobResponseDto> jobResponseDtoList = jobService.getAllJobs();
            if (jobResponseDtoList.isEmpty()) {
                return ApiResponse.<List<JobResponseDto>>builder()
                        .status(HttpStatus.NO_CONTENT.value())
                        .data(null)
                        .build();
            }
            return ApiResponse.<List<JobResponseDto>>builder()
                    .status(HttpStatus.OK.value())
                    .data(jobResponseDtoList)
                    .build();

    }
}
