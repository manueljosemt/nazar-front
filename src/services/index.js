import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function validateID(data) {
  return await axios({
    method: "post",
    url: `${BASE_URL}/validar`,
    data,
  });
}

export async function getPending(token) {
  return await axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
    url: `${BASE_URL}/pendientes`,
  });
}

export async function sendRoutes(token, data) {
  return await axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "post",
    url: `${BASE_URL}/rendir`,
    data,
  });
}
