package com.spring.social_pro.backend.service.Impl;

import com.spring.social_pro.backend.base.BaseJob;
import com.spring.social_pro.backend.dto.request.job.CreateJobDto;
import com.spring.social_pro.backend.dto.response.job.JobResponseDto;
import com.spring.social_pro.backend.mapper.JobMapper;
import com.spring.social_pro.backend.service.IUserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.quartz.impl.matchers.GroupMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JobService {
    Scheduler scheduler;
    IUserService userService;
    JobMapper jobMapper;

    public void scheduleJob(CreateJobDto createJobDto) throws SchedulerException {
        var user = userService.getCurrentUser();
        JobDetail jobDetail = JobBuilder.newJob(BaseJob.class)
                .withIdentity(createJobDto.getName(), user.getEmail())
                .usingJobData("cronUrl", createJobDto.getCronUrl())
                .usingJobData("intervalSeconds", createJobDto.getIntervalSeconds())
                .usingJobData("method", createJobDto.getMethod())
                .usingJobData("duration", createJobDto.getDuration())
                .storeDurably()
                .build();
        Trigger trigger = TriggerBuilder.newTrigger()
                .forJob(jobDetail)
                .withIdentity("trigger_" + createJobDto.getName() + "-" + user.getUserName()) // Sử dụng cùng group
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInSeconds(Integer.parseInt(createJobDto.getIntervalSeconds()))
                        .repeatForever())
                .endAt(DateBuilder.futureDate(Integer.parseInt(createJobDto.getDuration()), DateBuilder.IntervalUnit.HOUR)) // Dừng sau duration phút
                .build();

        scheduler.scheduleJob(jobDetail, trigger);
    }

    public void deleteJob(String jobName) throws SchedulerException {
        var user = userService.getCurrentUser();
        JobKey jobKey = new JobKey("cronJob_" + jobName + "-" + user.getUserName());
        scheduler.deleteJob(jobKey);
    }

    public List<JobResponseDto> getAllJobs() throws SchedulerException {
        var user = userService.getCurrentUser();
        List<JobResponseDto> jobList = new ArrayList<>();
        for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.jobGroupEquals(user.getEmail()))) {
            JobDetail jobDetail = scheduler.getJobDetail(jobKey);
            List<? extends Trigger> triggers = scheduler.getTriggersOfJob(jobKey);


            JobResponseDto jobResponseDto = jobMapper.toJobResponseDto(jobDetail, triggers);

            jobList.add(jobResponseDto);
        }
        return jobList;
    }

}
