import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // 서버의 기본 URL
  withCredentials: true, // 쿠키를 포함할 수 있도록 설정
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
