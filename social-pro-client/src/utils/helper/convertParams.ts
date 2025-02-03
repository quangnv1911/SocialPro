// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertParamsGeneric = (params?: Record<string, any>): URLSearchParams => {
  const queryParams = new URLSearchParams();

  const appendParam = (key: string, value: unknown) => {
    if (value !== undefined && value !== null) {
      if (value instanceof Date) {
        queryParams.append(key, value.toISOString());
      } else {
        queryParams.append(key, value.toString());
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processObject = (obj: Record<string, any>, prefix = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
        // Đệ quy nếu giá trị là object
        processObject(value, fullKey);
      } else {
        appendParam(fullKey, value);
      }
    });
  };

  if (params) {
    processObject(params);
  }

  return queryParams;
};
