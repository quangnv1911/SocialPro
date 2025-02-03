package com.spring.social_pro.backend.base;


import org.quartz.Job;
import org.slf4j.LoggerFactory;

import java.util.logging.Logger;

import lombok.extern.slf4j.Slf4j;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

@Slf4j
public class BaseJob implements Job {
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        // Logic công việc
        String jobDetail = (String) context.getJobDetail().getJobDataMap().get("details");
        log.info("Executing job: {}", jobDetail);
    }
}
