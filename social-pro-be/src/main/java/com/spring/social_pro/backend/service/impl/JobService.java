package com.spring.social_pro.backend.service.impl;

import com.spring.social_pro.backend.base.BaseJob;
import com.spring.social_pro.backend.dto.request.job.CreateJobDto;
import com.spring.social_pro.backend.dto.request.job.JobFilterRequest;
import com.spring.social_pro.backend.dto.request.order.CreateOrderDto;
import com.spring.social_pro.backend.dto.request.orderDetail.CreateOrderDetailDto;
import com.spring.social_pro.backend.dto.response.PageResponse;
import com.spring.social_pro.backend.dto.response.job.JobResponseDto;
import com.spring.social_pro.backend.enums.BigCategory;
import com.spring.social_pro.backend.mapper.JobMapper;
import com.spring.social_pro.backend.service.IOrderService;
import com.spring.social_pro.backend.service.IUserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.quartz.impl.matchers.GroupMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JobService {
    Scheduler scheduler;
    IUserService userService;
    IOrderService orderService;
    JobMapper jobMapper;

    private static final long CREATED_TIME = System.currentTimeMillis();

    public void scheduleJob(CreateJobDto createJobDto) throws SchedulerException {
        var user = userService.getCurrentUser();
        String cronJobName = "cronJob_" + "-" + user.getUserName() + "-" + System.currentTimeMillis();
        JobDetail jobDetail = JobBuilder.newJob(BaseJob.class)
                .withIdentity(cronJobName, user.getId().toString()) // Sử dụng cùng group
                .usingJobData("cronUrl", createJobDto.getCronUrl())
                .usingJobData("intervalSeconds", createJobDto.getIntervalSeconds())
                .usingJobData("method", createJobDto.getMethod())
                .usingJobData("duration", String.valueOf(createJobDto.getDuration()))
                .usingJobData("createdTime", CREATED_TIME)
                .usingJobData("createdBy", user.getEmail())
                .storeDurably()
                .build();
        Trigger trigger = TriggerBuilder.newTrigger()
                .forJob(jobDetail)
                .withIdentity("trigger_" + cronJobName) // Sử dụng cùng group
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInSeconds(createJobDto.getIntervalSeconds())
                        .repeatForever())
                .endAt(DateBuilder.futureDate(1, DateBuilder.IntervalUnit.MONTH))
                .build();
        CreateOrderDto createOrderDto = CreateOrderDto.builder()
                .orderDetails(List.of(CreateOrderDetailDto.builder()
                        .category(BigCategory.CronJob)
                        .cronjobKey(cronJobName)
                        .quantity(1)
                        .build()))
                .build();

        orderService.createNewOrder(createOrderDto);
        log.info("Created order for cron job: {}", cronJobName);
        scheduler.scheduleJob(jobDetail, trigger);
    }

    public void deleteJob(String jobName) throws SchedulerException {
        var user = userService.getCurrentUser();
        JobKey jobKey = new JobKey("cronJob_" + jobName + "-" + user.getUserName());
        scheduler.deleteJob(jobKey);
    }

    public PageResponse<JobResponseDto> getAllJobs(JobFilterRequest request) throws SchedulerException {
        var user = userService.getCurrentUser();
        List<JobResponseDto> jobList = new ArrayList<>();

        // Lấy tất cả job keys cho user
        Set<JobKey> jobKeys = scheduler.getJobKeys(GroupMatcher.jobGroupEquals(user.getId().toString()));

        // Định nghĩa record ngay trong method (hoặc có thể tách ra ngoài)
        record JobRecord(JobKey jobKey, JobDetail jobDetail, long creationTime) {
        }

        // Tạo danh sách trung gian chứa JobRecord
        List<JobRecord> jobData = new ArrayList<>();
        for (JobKey jobKey : jobKeys) {
            var test = request.getName().isEmpty();
            if (request.getName() == null || request.getName().isEmpty() ||
                    jobKey.getName().toLowerCase().contains(request.getName().toLowerCase())) {
                JobDetail jobDetail = scheduler.getJobDetail(jobKey);
                long creationTime = getCreationTime(jobDetail);
                jobData.add(new JobRecord(jobKey, jobDetail, creationTime));
            }
        }

        // Sắp xếp theo thời gian tạo
        jobData.sort((job1, job2) -> {
            int comparison = Long.compare(job1.creationTime(), job2.creationTime());
            return "desc".equalsIgnoreCase(request.getSortOrder()) ? -comparison : comparison;
        });

        // Áp dụng phân trang
        int start = Math.max((request.getPage() - 1) * request.getPageSize(), 0);
        int end = Math.min((request.getPage()) * request.getPageSize(), jobData.size());
        List<JobRecord> paginatedJobs = jobData.subList(start, end);

        // Chuyển đổi sang DTO
        for (JobRecord job : paginatedJobs) {
            List<? extends Trigger> triggers = scheduler.getTriggersOfJob(job.jobKey());
            JobResponseDto jobResponseDto = jobMapper.toJobResponseDto(job.jobDetail(), triggers, job.creationTime);
            jobList.add(jobResponseDto);
        }

        // Tạo response
        PageResponse<JobResponseDto> response = new PageResponse<>();
        response.setData(jobList);
        response.setTotalElements(jobData.size());
        response.setTotalPages((int) Math.ceil((double) jobData.size() / request.getPageSize()));
        response.setCurrentPage(request.getPage());
        response.setPageSize(request.getPageSize());

        return response;
    }

    private long getCreationTime(JobDetail jobDetail) throws SchedulerException {
        // 1. Kiểm tra JobDataMap trước
        JobDataMap dataMap = jobDetail.getJobDataMap();
        if (dataMap.containsKey("createdTime")) {
            return dataMap.getLong("createdTime");
        }

        // 2. Nếu không có, lấy thời gian từ trigger sớm nhất
        List<? extends Trigger> triggers = scheduler.getTriggersOfJob(jobDetail.getKey());
        if (!triggers.isEmpty()) {
            return triggers.stream()
                    .map(Trigger::getStartTime)
                    .filter(Objects::nonNull)
                    .map(Date::getTime)
                    .min(Long::compare)
                    .orElse(0L);
        }

        return 0L; // Mặc định nếu không có thông tin
    }
}
