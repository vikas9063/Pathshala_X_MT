import axios from 'axios';
import type { AxiosError, AxiosInstance } from 'axios';

/**
 * Base API URL
 * Priority:
 *  1. ENV (prod / staging / dev)
 *  2. Fallback hardcoded URL
 */
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://vk-services.shop/api/v1';

/**
 * Axios instance
 */
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

/**
 * REQUEST INTERCEPTOR
 * - Attach auth token
 * - Enforce JSON headers
 */
api.interceptors.request.use(
  (config) => {
    // const token = getToken();
    const token = null; 

    if (token) {
      // Axios v1+ safe way
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    // Always enforce JSON
    config.headers.set('Content-Type', 'application/json');

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * - Unwrap response.data
 * - Normalize errors
 */
api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const normalizedError = {
      status: error.response?.status,
      message:
        (error.response?.data as any)?.detail ||
        error.message ||
        'Something went wrong',
      data: error.response?.data,
    };

    return Promise.reject(normalizedError);
  }
);

export default api;
