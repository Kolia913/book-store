import axios from 'axios';
import Config from '@/core/_internal/Config';
import router from '@/router';

const http = axios.create({
  baseURL: Config.baseApi,
  headers: Config.baseHeaders,
  withCredentials: Config.isCreadentialsAllowed,
});

http.interceptors.request.use(injectToken, (error) => handleError(error));
http.interceptors.response.use(
  (response) => {
    if (response.data.success || response.data.result.success) {
      return response;
    } else {
      throw new Error(
        response.data?.message ? response.data.message : `Error fetching ${response.config.url}`
      );
    }
  },
  (error) => handleError(error)
);

function injectToken(config) {
  const token = localStorage.getItem(`${Config.tokenName}`);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

function handleError(error) {
  const err = {
    code: error.code,
    message: error.response.data?.message ? error.response.data.message : error.message,
    status: error.response.status,
  };
  return Promise.reject(err);
}

export default function useRequest({ baseEndpoint = '' } = {}) {
  /**
   * Perform an operation with provided arguments and a custom function.
   * @param {Function} func - The custom function to perform with the provided arguments.
   */
  function withArgsAsync(func) {
    /**
     * Calls function with given arguments
     * @param {Object} args - An object containing the arguments.
     * @param {string} args.url - The URL for the operation.
     * @param {T} [args.data] - Optional. The data to be used in the operation. Default is undefined. Has no effect on get and delete methods.
     * @param {AxiosRequestConfig} [args.config] - Optional. Additional configuration options for the operation.
     *
     * @template T - The type of data to be used in the operation.
     * @typedef {Object} AxiosRequestConfig - Configuration options for Axios.
     * @property {Object} [headers] - The headers to be used in the operation.
     * @property {number} [timeout] - The maximum time allowed for the operation to complete, in milliseconds.
     * @property {string} [method] - The HTTP request method (e.g., 'GET', 'POST').
     * @property {Object} [params] - The URL parameters to be included in the operation.
     * @property {boolean} [withCredentials] - Indicates whether or not cross-site Access-Control requests should be made using credentials.
     * @property {string} [responseType] - The type of data expected in the response ('json', 'text', etc.).
     *
     * @returns {AxiosPromise} A Promise that resolves with an AxiosResponse.
     * @typedef {Promise<AxiosResponse>} AxiosPromise - A Promise that resolves with an AxiosResponse.
     * @typedef {Object} AxiosResponse - The Axios response object.
     * @property {*} data - The response data.
     * @property {number} status - The HTTP status code.
     * @property {string} statusText - The HTTP status text.
     * @property {Object} headers - The response headers.
     * @property {AxiosRequestConfig} config - The request configuration used to make the request.
     * @property {string} request - The XMLHttpRequest or Node.js HTTP request instance.
     */
    return function ({ url, data, config }) {
      if (data) {
        return withException(func.bind(this, url, config, data));
      } else {
        return withException(func.bind(this, url, config));
      }
    };
  }

  /**
   * Simply wraps function with try/catch block and throws error if it appears.
   * @param {Function} func - The custom function to perform with the provided arguments.
   *
   */
  async function withException(func) {
    try {
      return await func();
    } catch (e) {
      if (e.status === 401 && Config.loginPagePath?.length) {
        router.push(`${Config.loginPagePath}`);
      }
      throw new Error(e.message);
    }
  }
  async function get(url, options) {
    const res = await http.get(`${baseEndpoint}${url ? url : ''}`, options);
    return res;
  }

  async function post(url, options, data) {
    const res = await http.post(`${baseEndpoint}${url ? url : ''}`, data, options);
    return res;
  }

  async function put(url, options, data) {
    const res = await http.put(`${baseEndpoint}${url ? url : ''}`, data, options);
    return res;
  }

  // Named 'remove' because JS has reserved keyword 'delete'
  async function remove(url, options) {
    const res = await http.delete(`${baseEndpoint}${url ? url : ''}`, options);
    return res;
  }

  return {
    get: withArgsAsync(get),
    post: withArgsAsync(post),
    put: withArgsAsync(put),
    delete: withArgsAsync(remove),
  };
}
