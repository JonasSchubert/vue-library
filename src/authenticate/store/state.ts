import { AuthenticateState } from '../models';

export const createAuthenticateState = (): AuthenticateState => ({
  error: undefined,
  isLoading: false,
  token: undefined,
  userRoles: []
});
