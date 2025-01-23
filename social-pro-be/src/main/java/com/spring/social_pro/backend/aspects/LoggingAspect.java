package com.spring.social_pro.backend.aspects;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class LoggingAspect {
    @Around("execution(* com.spring.social_pro.backend.*(..))") // Thay đổi package và phương thức theo nhu cầu
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result = null;

        try {
            // Trước khi phương thức thực thi (OnEntry)
            log.debug("Entering {} with arguments {}", joinPoint.getSignature(), joinPoint.getArgs());

            // Thực thi phương thức
            result = joinPoint.proceed();

            // Sau khi phương thức thực thi thành công (OnExit)
            log.debug("Exiting {} with return value {}", joinPoint.getSignature(), result);

        } catch (Throwable ex) {
            // Khi có ngoại lệ (OnException)
            log.error("Exception thrown in {} with arguments {}",
                    joinPoint.getSignature(), joinPoint.getArgs(), ex);

            // Rethrow exception để không thay đổi luồng xử lý
            throw ex;
        }

        return result;
    }
}
