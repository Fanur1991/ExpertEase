import axios from 'axios';
import {BACKEND_BASE_URL} from '../config';

const instance = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instance;
