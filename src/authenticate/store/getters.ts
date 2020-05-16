import { GetterTree } from 'vuex';
import { GetterTypes } from './types';
import { UserRole } from '../enums';
import { AuthenticateState, LoginResponse } from '../models';

export const createGetters = <TRootState, T extends LoginResponse>(customGetters?: GetterTree<AuthenticateState<T>, TRootState>): GetterTree<AuthenticateState<T>, TRootState> => ({
  [GetterTypes.error]: (state: AuthenticateState<T>): Error | undefined => state.error,
  [GetterTypes.isAdministrator]: (state: AuthenticateState<T>): boolean => UserRole.toArray(state.data?.role ?? UserRole.Null).includes(UserRole.Administrator),
  [GetterTypes.isLoading]: (state: AuthenticateState<T>): boolean => state.isLoading,
  [GetterTypes.isUser]: (state: AuthenticateState<T>): boolean => UserRole.toArray(state.data?.role ?? UserRole.Null).includes(UserRole.User),
  [GetterTypes.loggedIn]: (state: AuthenticateState<T>): boolean => !!state.data?.token,
  [GetterTypes.token]: (state: AuthenticateState<T>): string | undefined => state.data?.token,
  [GetterTypes.userRoles]: (state: AuthenticateState<T>): UserRole[] => UserRole.toArray(state.data?.role ?? UserRole.Null),
  ...customGetters
});
