import axios from 'axios';
import {BACKEND_BASE_URL} from '../config';

const instance = axios.create({
  baseURL: 'http://localhost:3002/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

// instance.interceptors.request.use((config) => {
//   const token = window.localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

export default instance;
