package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.base.BaseController;
import com.spring.social_pro.backend.dto.request.job.CreateJobDto;
import com.spring.social_pro.backend.dto.response.ApiResponse;
import com.spring.social_pro.backend.dto.response.job.JobResponseDto;
import com.spring.social_pro.backend.service.Impl.JobService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.quartz.SchedulerException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JobController extends BaseController {

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
    public ApiResponse<?> getAllJobs() {
        try{
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

        } catch (Exception e) {
            log.error(e.getMessage());
            return ApiResponse.<String>builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .data(e.getMessage())
                    .build();
        }

    }
}
