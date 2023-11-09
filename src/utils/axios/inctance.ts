import axios, { AxiosRequestConfig } from 'axios';

const baseUrl = 'http://localhost:4000';

const config: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: baseUrl,
};

export const api = axios.create(config);

export const apiGet = async <T>(restApi: string) => {
  return api.get<T>(restApi);
};

export const apiPost = async <T, P>(restApi: string, data: P, multiPart = false) => {
  if (multiPart) {
    return api.post<T>(restApi, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    return api.post<T>(restApi, data);
  }
};

export const apiPatch = async <T, P>(restApi: string, data: P) => {
  return api.patch<T>(restApi, data);
};

export const apiPut = async <T, P>(restApi: string, data: P) => {
  return api.put<T>(restApi, data);
};

export const apiDelete = async <T>(restApi: string) => {
  return api.delete<T>(restApi);
};

export const apiDeletes = async <T, P>(restApi: string, data: P) => {
  return api.delete<T>(restApi, {
    data,
  });
};
