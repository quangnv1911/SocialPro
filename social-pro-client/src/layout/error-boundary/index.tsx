// FallbackRender.tsx
'use client';  // Đánh dấu đây là một Client Component

import { FallbackProps } from 'react-error-boundary';

// Component phải được export đúng dạng, không phải là một hàm thông thường
const FallbackRender = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <div role="alert">
      <span>Something went wrong:</span>
      <pre className="text-red-500">{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default FallbackRender;
