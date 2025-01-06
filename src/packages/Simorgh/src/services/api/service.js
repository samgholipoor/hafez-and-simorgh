import { API_BASE_URL } from '@/constants/index.js';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
