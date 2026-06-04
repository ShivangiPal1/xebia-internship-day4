import axios from 'axios';

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL || 'http://localhost:5002/api/auth'
});

const dashboardApi = axios.create({
  baseURL: import.meta.env.VITE_DASHBOARD_API_URL || 'http://localhost:5003/api/dashboard'
});

dashboardApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { authApi, dashboardApi };
