import { defineStore } from 'pinia';
import useRequest from './composables/useRequest';
import useAdminRequest from './composables/useAdminRequest';
import { useToast } from 'vue-toastification';
// eslint-disable-next-line no-unused-vars
// import { AxiosRequestConfig } from 'axios';
/**
 * Configuration object for options.
 * @typedef {Object} CrudStoreOptions
 * @property {boolean} disableAdminPrefix - Disable admin prefix in API requests.
 * @property {AxiosRequestConfig} get - Additional configuration for GET requests.
 * @property {AxiosRequestConfig} post - Additional configuration for POST requests.
 * @property {AxiosRequestConfig} put - Additional configuration for PUT requests.
 * @property {AxiosRequestConfig} delete - Additional configuration for DELETE requests.
 */

/**
 * Parameters for configuring the CRUD store.
 * @typedef {Object} CrudStoreConfig
 * @property {string[]} omit - An array of functions to omit from the store.
 * @property {(state) => ({})} defineCustomActions - A function returning custom actions for the store.
 *  Accepts a 'state' param of current state
 * @property {() => ({}))} defineCustomState - A function returning custom state for the store.
 * @property {CrudStoreOptions} options - Additional options.
 */

/**
 * Define a Pinia store for CRUD operations.
 * @param {string} id - The unique identifier for the store.
 * @param {string} baseUrl - The base URL for API requests.
 * @param {CrudStoreConfig} config - Optional parameters.
 * @returns {ReturnType<typeof defineStore>} - The defined Pinia store.
 */
export function defineCrudStore(
  id,
  baseUrl,
  { omit = [], defineCustomActions = () => ({}), defineCustomState = () => ({}), options = {} }
) {
  const toast = useToast();
  let request;
  if (options?.disableAdminPrefix) {
    request = useRequest({ baseEndpoint: baseUrl });
  } else {
    request = useAdminRequest({ baseEndpoint: baseUrl });
  }

  /**
   * Function to throw error for omitted functions.
   * @param {string} name - The name of the omitted function.
   * @returns {Function} - An error function.
   */
  function omittedFunction(name) {
    return function () {
      throw new Error(`Function '${name}' in '${id}' store is omitted!`);
    };
  }

  /**
   * Function to get custom configuration based on HTTP method.
   * @param {string} method - The HTTP method.
   * @returns {AxiosRequestConfig} - Custom configuration.
   */
  function getCustomConfig(method = 'get') {
    const customHeaders = options[method] ? options[method] : {};
    return customHeaders ? customHeaders : {};
  }

  const customState = defineCustomState();
  const customActions = defineCustomActions(customState);

  return defineStore(id, () => {
    /**
     * Fetch multiple items.
     * @param {Object} options - Fetch options.
     * @param {number} options.page - Page number.
     * @param {number} options.per_page - Items per page.
     * @param {string} options.sort - Sort field.
     * @param {string} options.by - Sort direction.
     * @param {string} options.sandbox - sandbox direction.
     * @returns {Promise<Object>} - Resolves with fetched data.
     * @throws {Error} - Throws an error if request fails.
     */
    async function fetchMany({ page, per_page, sort, by, key, sandbox }) {
      try {
        const res = await request.get({
          config: {
            ...getCustomConfig('get'),
            params: {
              page,
              per_page,
              sort,
              by,
              key: key,
              sandbox
            },
          },
        });
        return res.data.result;
      } catch (e) {
        toast.error(e.message);
        throw new Error(e.message);
      }
    }

    /**
     * Fetch a single item.
     * @param {string} id - The ID of the item to fetch.
     * @returns {Promise<Object>} - Resolves with fetched data.
     * @throws {Error} - Throws an error if request fails.
     */
    async function fetchParam(key, value) {
      try {
        const res = await request.get({
          config: {
            ...getCustomConfig('get'),
            params: {
              [key]: value,
            },
          },
        });
        return res.data.result;
      } catch (e) {
        toast.error(e.message);
        throw new Error(e.message);
      }
    }
    async function fetch(id) {
      try {
        const res = await request.get({
          url: id,
          config: {
            ...getCustomConfig('get'),
          },
        });
        return res.data.result;
      } catch (e) {
        toast.error(e.message);
        throw new Error(e.message);
      }
    }

    /**
     * Save a new item.
     * @param {Object} payload - Data to save.
     * @returns {Promise<Object>} - Resolves with saved data.
     * @throws {Error} - Throws an error if request fails.
     */
    async function save(payload) {
      try {
        const res = await request.post({
          data: payload,
          config: {
            ...getCustomConfig('post'),
          },
        });
        toast.success(res.data?.message);
        return res.data.result;
      } catch (e) {
        toast.error(e.message);
        throw new Error(e.message);
      }
    }

    /**
     * Update an existing item.
     * @param {Object} options - Update options.
     * @param {string} options.id - The ID of the item to update.
     * @param {Object} options.payload - Data to update.
     * @returns {Promise<void>}
     * @throws {Error} - Throws an error if request fails.
     */
    async function update({ id, payload }) {
      try {
        const res = await request.put({
          url: id,
          data: payload,
          config: {
            ...getCustomConfig('put'),
          },
        });
        toast.success(res.data?.message);
      } catch (e) {
        toast.error(e.message);
        throw new Error(e.message);
      }
    }

    /**
     * Remove an item.
     * @param {string} id - The ID of the item to remove.
     * @returns {Promise<void>}
     * @throws {Error} - Throws an error if request fails.
     */
    async function remove(id) {
      try {
        const res = await request.delete({
          url: id,
          config: {
            ...getCustomConfig('delete'),
          },
        });
        toast.success(res.data?.message);
      } catch (e) {
        toast.error(e.message);
        throw new Error(e.message);
      }
    }

    return {
      ...customState,
      ...customActions,
      fetchMany: !omit.includes('fetchMany') ? fetchMany : omittedFunction('fetchMany'),
      fetchParam: !omit.includes('fetchParam') ? fetchParam : omittedFunction,
      fetch: !omit.includes('fetch') ? fetch : omittedFunction('fetch'),
      save: !omit.includes('save') ? save : omittedFunction('save'),
      update: !omit.includes('update') ? update : omittedFunction('update'),
      remove: !omit.includes('remove') ? remove : omittedFunction('remove'),
    };
  });
}
