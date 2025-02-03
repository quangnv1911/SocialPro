package com.spring.social_pro.backend.exception.validation.validator;

import com.spring.social_pro.backend.exception.validation.constraint.DateOfBirth;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class DateOfBirthValidator  implements ConstraintValidator<DateOfBirth, LocalDate> {
    @Override
    public boolean isValid(LocalDate localDate, ConstraintValidatorContext constraintValidatorContext) {
        if( localDate == null) {
            return true;
        }
        LocalDate minTime = LocalDate.of(1950, 1, 1);
        LocalDate now = LocalDate.now();

        return localDate.isAfter(minTime) && localDate.isBefore(now);
    }
}
