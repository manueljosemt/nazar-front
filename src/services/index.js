import axios from "axios"

const BASE_URL = process.env.REACT_APP_BASE_URL

export async function validateID(data) {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/validar`,
    data
  });
}