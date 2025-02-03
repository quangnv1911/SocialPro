import axios from 'axios';
import { requestSuccessInterceptor } from '@/context/apiClient/apiClientContextController/interceptors/requestInterceptors';
import {
  responseFailureInterceptor,
  responseSuccessInterceptor,
} from '@/context/apiClient/apiClientContextController/interceptors/responseInterceptors';
import { ENV } from '@/config/env';


const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: ENV.BASE_URL,
});

axiosClient.interceptors.request.use(requestSuccessInterceptor);
axiosClient.interceptors.response.use(responseSuccessInterceptor, responseFailureInterceptor);

export default axiosClient;
