import axios, {AxiosResponse} from 'axios';
import {TApiError} from 'app/lib/api/types/axios.types';

export const interceptorResponse = (response: AxiosResponse<any>) => {
  // Status code isn't a success code - throw error
  if (!`${response.status}`.startsWith('2')) {
    throw response.data;
  }

  return response.data;
};

export const interceptorResponseError = async (error: any) => {
  // Pass the response from the API, rather than a status code
  const {response} = error;

  // Network error
  if (!response) {
    const networkError = {
      errorData: 'Network error',
      errorStatus: 11245,
      errorUrl: 'Network error',
    } as TApiError;
    throw networkError;
  }

  const originalRequest = error.config;
  const errorStatusCondition = error.response.status === 403;
  const unauthorizedCondition = error.response.status === 401;
  const errorRetryCondition = !originalRequest._retry;

  const objectError = {
    errorData: error.response.data,
    errorStatus: error.response.status,
    errorUrl: error.response.config.url,
  } as TApiError;

  // Token and refresh token where expired
  if (unauthorizedCondition) {
    // await authAsync()
  }

  // POST data errors after fail request
  // await axios.post(env.ERROR_LOGS, objectError);

  // Statement and function inside of it, is for check and refresh token if this was expired
  if (!unauthorizedCondition && errorStatusCondition && errorRetryCondition) {
    originalRequest._retry = true;

    const refresher = async () => {};

    await refresher();
    return axios(originalRequest);
  }
  if (error && error.response && error.response.data) {
    throw objectError;
  }
  throw error;
};
