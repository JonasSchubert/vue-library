import { GetterTree } from 'vuex';
import { GetterTypes } from './types';
import { UserRole } from '../enums';
import { AuthenticateState } from '../models';

export const createGetters = <TRootState>(): GetterTree<AuthenticateState, TRootState> => ({
  [GetterTypes.error]: (state: AuthenticateState): Error | undefined => state.error,
  [GetterTypes.isAdministrator]: (state: AuthenticateState): boolean => state.userRoles.includes(UserRole.Administrator),
  [GetterTypes.isLoading]: (state: AuthenticateState): boolean => state.isLoading,
  [GetterTypes.isUser]: (state: AuthenticateState): boolean => state.userRoles.includes(UserRole.User),
  [GetterTypes.loggedIn]: (state: AuthenticateState): boolean => !!state.token,
  [GetterTypes.token]: (state: AuthenticateState): string | undefined => state.token,
  [GetterTypes.userRoles]: (state: AuthenticateState): UserRole[] => state.userRoles
});
