
import useRequest from './useRequest';
import useAppConfig from './useAppConfig';

export default function useAdminRequest({ baseEndpoint = '' } = {}) {
  const url = baseEndpoint.length > 0 ? baseEndpoint + '/' : '';
  const config = useAppConfig();
  return useRequest({
    baseEndpoint: config.adminRoutesPrefix + url,
  });
}
