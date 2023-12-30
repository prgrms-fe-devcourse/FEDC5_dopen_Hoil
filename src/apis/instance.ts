import axios from 'axios';

const BASE_URL = `https://kdt.frontend.5th.programmers.co.kr:${
  import.meta.env.VITE_APP_PORT
}`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
