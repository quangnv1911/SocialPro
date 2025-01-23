package com.spring.social_pro.backend.service.Impl;

import com.spring.social_pro.backend.base.BaseJob;
import com.spring.social_pro.backend.dto.request.job.CreateJobDto;
import com.spring.social_pro.backend.dto.response.job.JobResponseDto;
import com.spring.social_pro.backend.mapper.JobMapper;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.quartz.*;
import org.quartz.impl.matchers.GroupMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobService {
    @Autowired
    Scheduler scheduler;

    public void scheduleJob(CreateJobDto createJobDto) throws SchedulerException {
        JobDetail jobDetail = JobBuilder.newJob(BaseJob.class)
                .withIdentity(createJobDto.getJobName(), createJobDto.getGroupName())
                .build();

        Trigger trigger = TriggerBuilder.newTrigger()
                .withIdentity(createJobDto.getJobName() + "_trigger", createJobDto.getGroupName())
                .withSchedule(CronScheduleBuilder.cronSchedule(createJobDto.getCronExpression()))
                .build();

        scheduler.scheduleJob(jobDetail, trigger);
    }

    public void deleteJob(String jobName, String groupName) throws SchedulerException {
        JobKey jobKey = new JobKey(jobName, groupName);
        scheduler.deleteJob(jobKey);
    }

    public List<JobResponseDto> getAllJobs() throws SchedulerException {
        List<JobResponseDto> jobList = new ArrayList<>();
        for (String groupName : scheduler.getJobGroupNames()) {
            Set<JobKey> jobKeys = scheduler.getJobKeys(GroupMatcher.jobGroupEquals(groupName));
            for (JobKey jobKey : jobKeys) {
                JobDetail jobDetail = scheduler.getJobDetail(jobKey);
                List<? extends Trigger> triggers = scheduler.getTriggersOfJob(jobKey);

                for (Trigger trigger : triggers) {
                    JobResponseDto jobResponseDto = JobMapper.INSTANCE.toJobResponseDto(jobDetail);

                    // Nếu trigger là CronTrigger, lấy CronExpression
                    if (trigger instanceof CronTrigger) {
                        CronTrigger cronTrigger = (CronTrigger) trigger;
                        jobResponseDto.setCronExpression(cronTrigger.getCronExpression());
                    }

                    jobList.add(jobResponseDto);
                }
            }
        }
        return jobList;
    }

}
