package com.social_pro.backend.backend.aspects;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class PerformanceAspect {
    private static final Logger log = LoggerFactory.getLogger(PerformanceAspect.class);

    // Ngưỡng thời gian (ms) để cảnh báo về hiệu suất
    private int thresholdMilliseconds = 100;

    // Bật/tắt ghi nhận bộ nhớ
    private boolean logMemoryUsage = true;

    @Around("execution(* com.social_pro.backend.backend.*(..))")// Áp dụng cho tất cả các phương thức trong package com.example
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
