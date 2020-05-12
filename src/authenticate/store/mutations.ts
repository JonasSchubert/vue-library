import { MutationTree } from 'vuex';
import { MutationTypes } from './types';
import { UserRole } from '../enums';
import { AuthenticateModuleSetup, AuthenticateState } from '../models';
import { writeCookie, deleteCookie } from '../../core/cookie';

export const createMutations = ({ cookieKeyAuthenticationToken, daysTilExpiredAuthenticationCookie }: AuthenticateModuleSetup): MutationTree<AuthenticateState> => ({
  [MutationTypes.setError]: (state: AuthenticateState, { error }: { error: Error | undefined }): void => {
    state.error = error;
  },
  [MutationTypes.setIsLoading]: (state: AuthenticateState, { isLoading }: { isLoading: boolean }): void => {
    state.isLoading = isLoading;
  },
  [MutationTypes.setToken]: (state: AuthenticateState, { token, saveLoginDataTemporary }: { token: string | undefined; saveLoginDataTemporary: boolean }): void => {
    state.token = token;

    if (token !== undefined && saveLoginDataTemporary) {
      writeCookie(cookieKeyAuthenticationToken, token, daysTilExpiredAuthenticationCookie);
    } else if (token === undefined) {
      deleteCookie(cookieKeyAuthenticationToken);
    }
  },
  [MutationTypes.setUserRoles]: (state: AuthenticateState, { userRoles }: { userRoles: UserRole[] }): void => {
    state.userRoles = userRoles;
  }
});
