package com.spring.social_pro.backend.controller;

import com.spring.social_pro.backend.service.INotifyService;
import com.spring.social_pro.backend.service.IUserService;
import com.spring.social_pro.backend.util.JwtUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.websocket.server.PathParam;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${apiPrefix}/notify")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Notify", description = "API for notify service")
public class NotificationController {
    INotifyService notifyService;
    JwtUtils jwtUtils;

    @GetMapping(value = "/sse/{accessToken}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter handlePaymentNotification(@PathVariable String accessToken) {
        // Lấy thông tin người dùng từ token hoặc session
        var claims = jwtUtils.getUserInfoFromAccessToken(accessToken);
        UUID userId = UUID.fromString(claims.getClaim("id").toString());

        // Tạo emitter mới để gửi dữ liệu tới client
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        // Thêm emitter vào danh sách theo userId
        notifyService.addEmitter(userId, emitter);

        // Đảm bảo xóa emitter khi client ngừng kết nối
        emitter.onCompletion(() -> notifyService.removeEmitter(userId));
        emitter.onError((ex) -> notifyService.removeEmitter(userId));

        return emitter;
    }
}
