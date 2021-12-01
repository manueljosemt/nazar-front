import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const api = {
  validateID: async (body) => {
    return await axios.post(`${BASE_URL}/validar`, body);
  },
  getPending: async () => {
    return await axios.get(`${BASE_URL}/pendientes`);
  },
  sendRoutes: async (body) => {
    return await axios.post(`${BASE_URL}/rendir`, body);
  }
};

export default api;