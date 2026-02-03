import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api.constants';


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    const isAuthEndpoint = originalRequest.url.includes(API_ENDPOINTS.AUTH.LOGIN) || 
                          originalRequest.url.includes(API_ENDPOINTS.AUTH.REGISTER);

    if (error.response?.status === 401 && 
        !originalRequest.url.includes(API_ENDPOINTS.AUTH.REFRESH) && 
        !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        await api.post(API_ENDPOINTS.AUTH.REFRESH);
        
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
