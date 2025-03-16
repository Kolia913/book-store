import Config from '../_internal/Config';

export default function useAppConfig() {
  const configObj = Config;

  return {
    ...configObj,
  };
}
