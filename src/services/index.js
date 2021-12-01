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
    return await axios.post(`${BASE_URL}/transportista/validar`, body);
  },
  getSchedule: async () => {
    return await axios.get(`${BASE_URL}/configuracion/horarios`);
  },
  getPending: async () => {
    return await axios.get(`${BASE_URL}/transportista/pendientes`);
  },
  sendRoutes: async (body) => {
    return await axios.post(`${BASE_URL}/transportista/rendir`, body);
  }
};

export default api;