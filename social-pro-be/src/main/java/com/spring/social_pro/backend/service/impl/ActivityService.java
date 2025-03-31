package com.spring.social_pro.backend.service.impl;

import com.spring.social_pro.backend.entity.Activity;
import com.spring.social_pro.backend.enums.ActivityType;
import com.spring.social_pro.backend.repository.ActivityRepository;
import com.spring.social_pro.backend.service.IActivityService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ActivityService implements IActivityService {

    ActivityRepository activityRepository;

    @Override
    public Page<Activity> getActivities(int page) {
        return null;
    }

    @Override
    public void addActivity(ActivityType activityType, String description, HttpServletRequest request) {
        String clientIp = getUserIp(request);
        Activity.ActivityBuilder activity = Activity.builder()
                .type(activityType)
                .ip(clientIp);
        if(description != null) {
            activity.message(description);
        }
        activityRepository.save(activity.build());
    }

    private String getUserIp(HttpServletRequest request) {
        String clientIp = request.getHeader("X-Forwarded-For");
        if (clientIp == null || clientIp.isEmpty()) {
            clientIp = request.getRemoteAddr();
        } else {
            clientIp = clientIp.split(",")[0].trim();
        }
        return clientIp;
    }
}
