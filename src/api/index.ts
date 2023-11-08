import axios from "axios";
import store from "../store"; // Import your Vuex store

const BASE_URL = "https://iapitest.eva.guru";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = store.state.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
