package com.spring.social_pro.backend.base;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.quartz.Job;
import org.slf4j.LoggerFactory;

import java.util.logging.Logger;

import lombok.extern.slf4j.Slf4j;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BaseJob implements Job {

    RestTemplate restTemplate = new RestTemplate();

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        // Logic công việc
        String jobDetail = (String) context.getJobDetail().getJobDataMap().get("details");
        log.info("Executing job: {}", jobDetail);
        String url = context.getJobDetail().getJobDataMap().getString("url");
        String method = context.getJobDetail().getJobDataMap().getString("method");
        String requestBody = context.getJobDetail().getJobDataMap().getString("requestBody"); // Thêm body cho POST/PUT

        if (url == null || url.isEmpty()) {
            log.error("URL không hợp lệ!");
            return;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        switch (method.toUpperCase()) {
            case "GET":
                String getResponse = restTemplate.getForObject(url, String.class);
                log.info("GET Response tại: {}, Response: {}", new java.util.Date(), getResponse);
                break;

            case "POST":
                HttpEntity<String> postEntity = new HttpEntity<>(requestBody, headers);
                String postResponse = restTemplate.postForObject(url, postEntity, String.class);
                log.info("POST Response tại: {}, Response: {}", new java.util.Date(), postResponse);
                break;

            default:
                log.error("Phương thức không được hỗ trợ: {}", method);
        }
    }
}
