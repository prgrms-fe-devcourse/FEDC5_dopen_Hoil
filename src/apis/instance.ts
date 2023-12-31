import axios from 'axios';

const API_ENDPOINT = `${import.meta.env.VITE_APP_URL}:${
  import.meta.env.VITE_APP_PORT
}`;

export const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});
