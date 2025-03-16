import useRequest from './useRequest';
import useAppConfig from './useAppConfig';

/**
 * Custom composable for handling authentication-related functionality.
 *
 * @param {Object} options - Configuration options for authentication.
 * @param {string} options.loginUrl - The URL for user login.
 * @param {string} options.logoutUrl - The URL for user logout.
 * @param {string} options.whoamiUrl - The URL to fetch user information or check authentication status.
 *
 * @example
 * // Usage of the useAuth composable:
 * const { login, logout, whoami } = useAuth({
 *   loginUrl: '/api/login',
 *   logoutUrl: '/api/logout',
 *   whoamiUrl: '/api/whoami',
 * });
 *
 * // Perform login
 * login(username, password)
 *   .then(user => console.log('User logged in:', user))
 *   .catch(error => console.error('Login failed:', error));
 *
 * // Perform logout
 * logout()
 *   .then(() => console.log('User logged out'))
 *   .catch(error => console.error('Logout failed:', error));
 *
 * // Fetch user information or check authentication status
 * me()
 *   .then(user => console.log('User information:', user))
 *   .catch(error => console.error('Authentication check failed:', error));
 */
export default function useAuth({ loginUrl, whoamiUrl }) {
  const request = useRequest();
  const config = useAppConfig();

  /**
   * Function simply send's request for api, and if auth is successfull writes token to local storage and returns api response.
   * Otherwise it thorws error!
   *
   * @param {string} email - Email of user to authenticate
   * @param {string} password - Users password for given email
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
  async function login(username, password) {
    try {
      const res = await request.post({
        url: loginUrl,
        data: { username, password },
      });
      const data = res?.data;
      if (data) {
        localStorage.setItem(`${config.tokenName}`, data.access_token);
      }
      return res;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Function simply send's request for api, and if logout is successfull removes token from local storage and returns api response.
   * Otherwise it thorws error!
   *
   * @returns {Promise} A Promise that resolves with an AxiosResponse.
   */
  async function logout() {
    try {
      localStorage.removeItem(`${config.tokenName}`);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Function simply send's request for api, and if logout is successfull removes token from local storage and returns api response.
   * Otherwise it thorws error!
   *
   * @returns {AxiosPromise} A Promise that resolves with an AxiosResponse.
   */
  async function me() {
    try {
      const res = await request.get({ url: whoamiUrl });
      return res;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  return {
    login,
    logout,
    me,
  };
}
