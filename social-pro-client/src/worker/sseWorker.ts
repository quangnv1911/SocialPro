// sseWorker.ts
interface WorkerMessage {
  url: string; // URL để kết nối với SSE
  eventTypes?: string[]; // Các loại sự kiện cần lắng nghe
}

interface WorkerResponse {
  type: 'data' | 'error' | 'connected' | 'closed';
  eventType?: string;
  data?: any;
  error?: {
    errorMessage: string;
    errorStack?: string;
  };
}

onmessage = function(e: MessageEvent<WorkerMessage>) {
  const { url, eventTypes = ['post-list-event', 'payment-success-event', 'new-payment-event', 'connect-event'] } = e.data;
  const eventSource = new EventSource(url);
  console.log(url)
  // Thông báo kết nối thành công
  eventSource.onopen = function() {
    postMessage({
      type: 'connected',
      data: { timestamp: new Date().toISOString() }
    } as WorkerResponse);
  };
  
  // Đăng ký lắng nghe các sự kiện
  eventTypes.forEach(eventType => {
    eventSource.addEventListener(eventType, (event) => {
      try {
        const data = JSON.parse(event.data);
        postMessage({
          type: 'data',
          eventType,
          data
        } as WorkerResponse);
      } catch (error) {
        postMessage({
          type: 'error',
          error: {
            errorMessage: `Error parsing event data for ${eventType}: ${error instanceof Error ? error.message : String(error)}`,
          }
        } as WorkerResponse);
      }
    });
  });
  
  // Xử lý lỗi chung
  eventSource.onerror = function(error: any) {
    const errorInfo = {
      errorMessage: error.message || 'Unknown SSE connection error',
      errorStack: error.stack,
    };
    
    postMessage({
      type: 'error',
      error: errorInfo
    } as WorkerResponse);
    
    // Đóng kết nối SSE khi có lỗi
    eventSource.close();
    
    postMessage({
      type: 'closed',
      data: { reason: 'error', timestamp: new Date().toISOString() }
    } as WorkerResponse);
  };
  
  // Xử lý khi nhận được lệnh đóng từ main thread
  self.addEventListener('message', function(e) {
    if (e.data === 'close') {
      eventSource.close();
      postMessage({
        type: 'closed',
        data: { reason: 'manual', timestamp: new Date().toISOString() }
      } as WorkerResponse);
    }
  });
};
