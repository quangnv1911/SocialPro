'use client';
import { FC, ReactNode, useMemo } from 'react';
import { HydrationBoundary, MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiClientContext } from '../apiClientContext/ApiClientContext';
import { ApiClientControllerProps } from './ApiClientContextController.types';
import { StandardizedApiError } from './apiError/apiError.types';
import { useHandleQueryErrors } from '@/hooks/useHandleQueryErrors/useHandleQueryErrors';
import { ExtendedQueryMeta } from '@/types/data/api';
import axiosClient from '@/utils/helper/axios';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const metaErrorConfig = { error: { showGlobalError: true, excludedCodes: [] } };

const ApiClientContextController: FC<ApiClientControllerProps> = ({
                                                                    children,
                                                                  }: ApiClientControllerProps): ReactNode => {
  const { handleErrors, shouldHandleGlobalError } = useHandleQueryErrors();

  const mutationCache = new MutationCache({
    onError: (err, variables, context, mutation) => {
      const error = err as StandardizedApiError;
      if (shouldHandleGlobalError((mutation.meta as ExtendedQueryMeta)?.error, error?.statusCode)) {
        handleErrors(error);
      }
    },
  });

  const queryCache = new QueryCache({
    onError: (err, query) => {
      const error = err as StandardizedApiError;

      if (shouldHandleGlobalError((query.meta as ExtendedQueryMeta)?.error, error?.statusCode)) {
        handleErrors(error);
      }
    },
  });
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false, meta: metaErrorConfig } },
        mutationCache,
        queryCache,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const ctx = useMemo(() => ({ client: axiosClient }), []);

  return (
    <ApiClientContext.Provider value={ctx}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary>{children}</HydrationBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>

    </ApiClientContext.Provider>
  );
};

export default ApiClientContextController;
