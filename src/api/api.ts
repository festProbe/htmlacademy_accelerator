import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';
const DELAY = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: DELAY,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => Promise.reject(error),
  );

  return api;
};
