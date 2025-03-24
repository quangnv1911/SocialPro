// sseWorker.ts
interface WorkerMessage {
  url: string; // URL để kết nối với SSE
}

interface WorkerError {
  errorMessage: string;
  errorStack?: string;
}

onmessage = function(e: MessageEvent<WorkerMessage>) {
  const { url } = e.data;
  const eventSource = new EventSource(url);
  eventSource.addEventListener('post-list-event', (event) => {
    const data = JSON.parse(event.data);
    
    postMessage(data);
  });
  eventSource.onerror = function(error: any) {
    // Gửi thông tin lỗi thay vì gửi toàn bộ đối tượng error
    const errorInfo: WorkerError = {
      errorMessage: error.message,
      errorStack: error.stack,
    };
    eventSource.close(); // Đóng kết nối SSE
    postMessage(errorInfo); // Gửi lỗi cho React
  };
};
