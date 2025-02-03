package com.spring.social_pro.backend.exception.validation.constraint;

import com.spring.social_pro.backend.exception.validation.validator.DateOfBirthValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DateOfBirthValidator.class)
// Định nghĩa ra anotation
public @interface DateOfBirth {
    String message() default "Date of birth must be greater than 1950 and less than current date";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
