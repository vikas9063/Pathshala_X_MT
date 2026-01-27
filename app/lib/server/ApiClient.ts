import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * Base API URL
 */
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://vk-services.shop/api/v1';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * Helpers (replace with your real storage logic)
 */
const getToken = () => localStorage.getItem('access_token');
const setToken = (token: string) =>
  localStorage.setItem('access_token', token);

/**
 * Main Axios instance
 */
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

/**
 * Separate instance for refresh (IMPORTANT: no interceptors)
 */
const refreshApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/**
 * REQUEST INTERCEPTOR
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers = config.headers ?? {};
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 */
api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res: any = await refreshApi.post('/auth/refresh', {
          reason: 'expired_token',
        });
        console.log({originalRequest})
        await api(originalRequest);
        if(originalRequest.url === '/user/loggedin-user'){
          window.location.reload();
        }
      } catch (refreshError) {
        // Optional: logout user here
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject({
      status: error.response?.status,
      message:
        (error.response?.data as any)?.detail ||
        error.message ||
        'Something went wrong',
      data: error.response?.data,
    });
  }
);

export default api;
