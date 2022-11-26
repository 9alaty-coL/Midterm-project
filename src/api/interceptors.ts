import { AxiosRequestConfig } from 'axios';

import { CONFIG } from './config';
import { LocalStorageService } from './services/local-storage';

// TODO (template preparation): Update interceptor according to API specs.

/**
 * Checks if a request should be intercepted.
 * @param config - Request config.
 */
function shouldInterceptToken(config: AxiosRequestConfig): boolean {
  return config.baseURL?.startsWith(CONFIG.apiUrl) ?? false;
}

/**
 * Interceptor to append token to requests.
 * @param config Axios config.
 */
export const addTokenBeforeRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (!shouldInterceptToken(config)) {
    return config;
  }

  const token = LocalStorageService.getSessionToken();

  if (token == null) {
    return config;
  }

  const { headers } = config;

  if (headers == null) {
    throw new Error(
      'Axios did not pass any header. Please check your request.',
    );
  }

  return {
    ...config,
    headers: {
      ...headers,
      ['x-access-token']: `${token}`,
    },
  };
};
