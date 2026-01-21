import axios from 'axios';
import { getToken, clearAuth } from '@/utils/authStorage';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
});


api.interceptors.request.use(config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      clearAuth();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
