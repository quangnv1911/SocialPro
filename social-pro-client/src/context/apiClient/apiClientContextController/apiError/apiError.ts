import { AxiosError } from 'axios';
import zod from 'zod';
import { BasicApiError, BasicErrorData, FormApiError, FormErrorData, UnknownApiError } from './apiError.types';

// ApiError class
export class ApiError<T extends BasicApiError | FormApiError | UnknownApiError> extends Error {
  readonly originalError: AxiosError<unknown> | string;
  readonly statusCode?: number;
  readonly type: 'basic' | 'form' | 'unknown';
  readonly data: any;

  constructor(data: T, message?: string) {
    super(message || 'An API error occurred');
    this.name = 'ApiError';
    this.originalError = data.originalError;
    this.type = data.type;
    this.statusCode = data.statusCode;
    this.data = data.data;
  }
}

// Zod schemas
export const basicErrorDataSchema = zod.object({
  error: zod.object({
    code: zod.string(),
    message: zod.string().optional(),
  }),
});

export const formErrorDataSchema = zod.object({
  errors: zod.record(zod.string(), zod.array(zod.string())),
});

// Type guards
const isBasicErrorData = (error: unknown): error is BasicErrorData => {
  return basicErrorDataSchema.safeParse(error).success;
};

const isFormErrorData = (error: unknown): error is FormErrorData => {
  return formErrorDataSchema.safeParse(error).success;
};

// Standardized API error function
export const getStandardizedApiError = (
  error: AxiosError<unknown>,
): ApiError<BasicApiError> | ApiError<FormApiError> | ApiError<UnknownApiError> => {
  console.log('Raw error:', JSON.stringify(error, null, 2));
  const errorData = error?.response?.data || null;
  console.log('Error data:', JSON.stringify(errorData, null, 2));

  const standardizedError: UnknownApiError = {
    type: 'unknown',
    statusCode: error?.response?.status || 500,
    originalError: error || 'Unknown error source',
    data: errorData || null,
  };

  console.log('Standardized error:', JSON.stringify(standardizedError, null, 2));

  try {
    if (isBasicErrorData(errorData)) {
      console.log('Detected basic error');
      return new ApiError({
        ...standardizedError,
        type: 'basic',
        data: errorData.error.message || 'Unknown basic error',
      } as BasicApiError, errorData.error.message || 'Unknown basic error');
    }

    if (isFormErrorData(errorData)) {
      console.log('Detected form error');
      return new ApiError({
        ...standardizedError,
        type: 'form',
        data: errorData.errors,
      } as FormApiError);
    }

    console.log('Falling back to unknown error');
    try {
      const apiError = new ApiError(standardizedError);
      throw apiError
      console.log('Final API error:', JSON.stringify(apiError, null, 2));
      return apiError;
    } catch (error) {
      throw error;
    }
  } catch (err) {
    console.error('Error in getStandardizedApiError:', err);
    return new ApiError({
      type: 'unknown',
      statusCode: 500,
      originalError: err instanceof Error ? err : 'Unknown error',
      data: 'Unexpected error during error processing',
    } as UnknownApiError);
  }
};