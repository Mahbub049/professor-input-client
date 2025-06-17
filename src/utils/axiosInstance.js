import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://professor-input-server.vercel.app/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
