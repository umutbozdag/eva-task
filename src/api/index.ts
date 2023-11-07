import axios from 'axios';
import store from '../store'; // Import your Vuex store

// TODO: get from env file
const api = axios.create({
  baseURL: 'https://iapitest.eva.guru',
  // Add a request interceptor to include the Bearer Token in the Authorization header
});

// Request interceptor to include the Bearer Token
api.interceptors.request.use((config) => {
  const token = store.state.accessToken; // Get the token from the store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;