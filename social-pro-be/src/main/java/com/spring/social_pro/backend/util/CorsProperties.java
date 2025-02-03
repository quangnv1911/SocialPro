package com.spring.social_pro.backend.util;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "cors")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CorsProperties {
    List<String> allowedOrigins;
    List<String> allowedMethods;


}
