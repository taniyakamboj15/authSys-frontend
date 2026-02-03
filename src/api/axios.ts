import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api.constants';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Crucial for HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for refresh token logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // Don't try to refresh on login/register failures (these are expected to return 401 for wrong credentials)
    const isAuthEndpoint = originalRequest.url.includes(API_ENDPOINTS.AUTH.LOGIN) || 
                          originalRequest.url.includes(API_ENDPOINTS.AUTH.REGISTER);

    // Check if error is 401 (Unauthorized) and not on the refresh endpoint itself or auth endpoints
    if (error.response?.status === 401 && 
        !originalRequest.url.includes(API_ENDPOINTS.AUTH.REFRESH) && 
        !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the session
        await api.post(API_ENDPOINTS.AUTH.REFRESH);
        
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed (token expired/invalid) -> Redirect to login handled by UI/Guard
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
