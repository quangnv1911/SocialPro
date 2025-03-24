package com.spring.social_pro.backend.service.Impl;

import com.spring.social_pro.backend.service.INotifyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotifyService implements INotifyService {
    ConcurrentHashMap<UUID, SseEmitter> emitters;
    // Thêm emitter cho người dùng
    @Override
    public void addEmitter(UUID userId, SseEmitter emitter) {
        log.info("add emitter {}", userId);
        emitters.put(userId, emitter);
    }

    @Override
    // Xóa emitter của người dùng khi kết nối kết thúc
    public void removeEmitter(UUID userId) {
        log.info("Removing emitter {}", userId);
        emitters.remove(userId);
    }

    @Override
    // Gửi thông báo cho một người dùng cụ thể
    public void sendNotificationToUser(UUID userId, String message) {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            try {
                emitter.send(message);
            } catch (Exception e) {
                log.error(e.getMessage());
                emitters.remove(userId);  // Xóa emitter nếu gặp lỗi
            }
        }
    }

    @Override
    // Gửi thông báo tới tất cả người dùng
    public void sendNotificationToAll(String message) {
        for (SseEmitter emitter : emitters.values()) {
            try {
                emitter.send(message);
            } catch (Exception e) {
                log.error(e.getMessage());
                emitters.values().remove(emitter);  // Xóa emitter nếu gặp lỗi
            }
        }
    }
}
