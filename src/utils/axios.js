import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
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
