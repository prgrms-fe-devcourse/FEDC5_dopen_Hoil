import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
const API_ENDPOINT = `${import.meta.env.VITE_APP_URL}:${
  import.meta.env.VITE_APP_PORT
}`;

export const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const { data } = await axiosInstance.get<T, AxiosResponse<T>>(url, config);
  return data;
};

export const postRequest = async <T, U>(
  url: string,
  body?: U,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const { data } = await axiosInstance.post<T, AxiosResponse<T>, U>(
    url,
    body,
    config,
  );
  return data;
};
