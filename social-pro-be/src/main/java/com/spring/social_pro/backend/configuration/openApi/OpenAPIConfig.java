package com.spring.social_pro.backend.configuration.openApi;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.stream.Collectors;

import static org.apache.tomcat.websocket.BasicAuthenticator.schemeName;

@Configuration
@ConfigurationProperties(prefix = "openapi")
@Data
public class OpenAPIConfig {

    private Info info;
    private List<Server> servers;

    @Data
    public static class Info {
        private String title;
        private String version;
        private String description;
        private Contact contact;
        private License license;
    }

    @Data
    public static class Contact {
        private String name;
        private String email;
    }

    @Data
    public static class License {
        private String name;
        private String url;
    }

    @Data
    public static class Server {
        private String url;
        private String description;
    }

    String bearerFormat = "JWT";
    String scheme = "bearer";

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement()
                        .addList(schemeName)).components(new Components()
                        .addSecuritySchemes(
                                schemeName, new SecurityScheme()
                                        .name(schemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .bearerFormat(bearerFormat)
                                        .in(SecurityScheme.In.HEADER)
                                        .scheme(scheme)
                        )
                )
                .info(new io.swagger.v3.oas.models.info.Info()
                        .title(info.getTitle())
                        .version(info.getVersion())
                        .description(info.getDescription())
                        .contact(new io.swagger.v3.oas.models.info.Contact()
                                .name(info.getContact().getName())
                                .email(info.getContact().getEmail()))
                        .license(new io.swagger.v3.oas.models.info.License()
                                .name(info.getLicense().getName())
                                .url(info.getLicense().getUrl())))
                .servers(servers.stream()
                        .map(server -> new io.swagger.v3.oas.models.servers.Server()
                                .url(server.getUrl())
                                .description(server.getDescription()))
                        .collect(Collectors.toList()));
    }
}
