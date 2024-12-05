import axios from "axios";

const BACKEND_URL = import.meta.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = "Bearer " + token;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return Promise.reject(error?.response || error);
  }
);

export { api };