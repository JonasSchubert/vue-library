import { MutationTree } from 'vuex';
import { MutationTypes } from './types';
import { AuthenticateModuleSetup, AuthenticateState, LoginResponse } from '../models';
import { writeCookie, deleteCookie } from '../../core/cookie';

export const createMutations = <T extends LoginResponse>({ cookieKeyAuthenticationToken, daysTilExpiredAuthenticationCookie }: AuthenticateModuleSetup): MutationTree<AuthenticateState<T>> => ({
  [MutationTypes.setData]: (state: AuthenticateState<T>, { data, saveLoginDataTemporary }: { data: T | undefined; saveLoginDataTemporary: boolean }): void => {
    state.data = data;

    if (data?.token !== undefined && saveLoginDataTemporary) {
      writeCookie(cookieKeyAuthenticationToken, data.token, daysTilExpiredAuthenticationCookie);
    } else if (!!data && data.token === undefined) {
      deleteCookie(cookieKeyAuthenticationToken);
    }
  },
  [MutationTypes.setError]: (state: AuthenticateState<T>, { error }: { error: Error | undefined }): void => {
    state.error = error;
  },
  [MutationTypes.setIsLoading]: (state: AuthenticateState<T>, { isLoading }: { isLoading: boolean }): void => {
    state.isLoading = isLoading;
  }
});
