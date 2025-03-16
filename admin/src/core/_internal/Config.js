class Config {
  baseApi;
  adminRoutesPrefix;
  baseStorage;
  baseHeaders;
  isCreadentialsAllowed;
  loginPagePath;
  tokenName;

  constructor() {
    this.baseApi = import.meta.env.VITE_BASE_API || '';
    this.adminRoutesPrefix = import.meta.env.VITE_ADMIN_ROUTES_PREFIX || '';
    this.baseStorage = import.meta.env.VITE_BASE_STORAGE || '';
    this.baseHeaders = {
      accept: 'application/json',
      Session: localStorage.getItem('SessionTokkenDiagnostykumAdmin'),
      //   "accept-language": "uk",
      // 'content-type': 'application/json',
      // 'access-control-allow-credentials': true,
      // 'x-requested-with': 'XMLHttpRequest',
    };
    this.isCreadentialsAllowed = false;
    this.loginPagePath = import.meta.env.VITE_LOGIN_PAGE_PATH || '';
    this.tokenName = import.meta.env.VITE_TOKEN_NAME || 'auth_token';
  }
}

export default new Config();
