package com.spring.social_pro.backend.enums;

public enum Duration {
    ONE_MONTH(1),
    SIX_MONTHS(6),
    ONE_YEAR(12);

    private final int months;

    Duration(int months) {
        this.months = months;
    }

    public int getMonths() {
        return months;
    }
}
