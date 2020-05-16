import { AuthenticateState, LoginResponse } from '../models';

export const createAuthenticateState = <T extends LoginResponse>(): AuthenticateState<T> => ({
  data: undefined,
  error: undefined,
  isLoading: false
});
