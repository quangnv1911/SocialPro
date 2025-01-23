package com.spring.social_pro.backend.aspects;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class PerformanceAspect {
    // Ngưỡng thời gian (ms) để cảnh báo về hiệu suất
    private int thresholdMilliseconds = 100;

    // Bật/tắt ghi nhận bộ nhớ
    private boolean logMemoryUsage = true;

    @Around("execution(* com.spring.social_pro.backend.*(..))")// Áp dụng cho tất cả các phương thức trong package com.example
    public Object measurePerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        long startMemory = 0;

        if (logMemoryUsage) {
            // Ghi nhận bộ nhớ trước khi thực thi phương thức
            startMemory = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
        }

        log.debug("Starting performance measurement for {}.", joinPoint.getSignature());

        Object result;
        try {
            // Thực thi phương thức mục tiêu
            result = joinPoint.proceed();
        } finally {
            long elapsedTime = System.currentTimeMillis() - startTime;

            if (logMemoryUsage) {
                // Ghi nhận bộ nhớ sau khi thực thi phương thức
                long endMemory = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
                long memoryUsed = endMemory - startMemory;

                log.info("Performance measurement: {} executed in {} ms and used {} bytes.",
                        joinPoint.getSignature(), elapsedTime, memoryUsed);
            } else {
                log.info("Performance measurement: {} executed in {} ms.",
                        joinPoint.getSignature(), elapsedTime);
            }

            if (elapsedTime > thresholdMilliseconds) {
                log.warn("Performance issue: {} took {} ms (threshold: {} ms).",
                        joinPoint.getSignature(), elapsedTime, thresholdMilliseconds);
            }
        }

        return result;
    }
}
