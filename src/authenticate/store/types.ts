export const ActionTypes = {
  login: 'login',
  logout: 'logout',
  validateToken: 'validate-token'
};

export const GetterTypes = {
  error: 'error',
  isAdministrator: 'isAdministrator',
  isLoading: 'isLoading',
  isUser: 'isUser',
  loggedIn: 'loggedIn',
  token: 'token',
  userRoles: 'userRoles'
};

export const ModuleType = 'authenticate';

export const MutationTypes = {
  setData: 'setData',
  setError: 'setError',
  setIsLoading: 'setIsLoading'
};

export const RouteTypes = {
  authenticate: 'authenticate'
};
