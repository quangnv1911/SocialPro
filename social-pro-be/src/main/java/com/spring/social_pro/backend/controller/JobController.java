package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.dto.request.ApiRequest;
import com.spring.social_pro.backend.dto.request.job.CreateJobDto;
import com.spring.social_pro.backend.dto.request.job.JobFilterRequest;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.job.JobResponseDto;
import com.spring.social_pro.backend.service.impl.JobService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.quartz.SchedulerException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${apiPrefix}/job")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Job", description = "API for job service")
public class JobController {

    JobService jobService;

    @PostMapping("/schedule")
    public ApiResponse<?> scheduleJob(@RequestBody ApiRequest<CreateJobDto> request) throws SchedulerException {
        jobService.scheduleJob(request.getData());
        return ApiResponse.<String>builder()
                .status(HttpStatus.CREATED.value())
                .data("Create job successfully")
                .build();

    }

    @GetMapping("/")
    public ApiResponse<?> getAllJobs(@ModelAttribute JobFilterRequest request) throws SchedulerException {

        var jobResponseDtoList = jobService.getAllJobs(request);
        return ApiResponse.<PageResponse<JobResponseDto>>builder()
                .status(HttpStatus.OK.value())
                .data(jobResponseDtoList)
                .build();
    }

    @DeleteMapping("/")
    public ApiResponse<?> deleteJob(@RequestParam String jobName) throws SchedulerException {
        jobService.deleteJob(jobName);
        return ApiResponse.<String>builder()
                .status(HttpStatus.OK.value())
                .data("Remove job successfully")
                .build();
    }
}
