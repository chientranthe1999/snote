import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {getToken, setToken} from "../../utils/cookie";

axios.defaults.withCredentials = true;

const client: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API,
});

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getToken();
  if (token) {
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders;
    }
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (response.config.url === "/register" || response.config.url === "/login") {
    setToken(response.data.accessToken)
    client.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
  }

  return response;
};

client.interceptors.request.use(onRequest);
client.interceptors.response.use(onResponse);

export const request = (
  options: AxiosRequestConfig
): Promise<AxiosResponse> => {
  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: any) => {
    throw error;
  };

  return client(options).then(onSuccess).catch(onError);
};
