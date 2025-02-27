package com.spring.social_pro.backend.service;

import com.spring.social_pro.backend.entity.Activity;
import com.spring.social_pro.backend.enums.ActivityType;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;

public interface IActivityService {
    Page<Activity> getActivities(int page);

    void addActivity(ActivityType activityType, String description, HttpServletRequest request);
}
