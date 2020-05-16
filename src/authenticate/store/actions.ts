import axios, { AxiosResponse } from 'axios';
import { ActionTree, Commit } from 'vuex';
import { ActionTypes, MutationTypes, RouteTypes } from './types';
import {
  AuthenticateState, LoginData, LoginResponse, ValidateTokenData
} from '../models';
import { snackbar } from '../../core/controls/app-snackbar';

const resetState = (commit: Commit): void => {
  commit(MutationTypes.setData, { data: undefined, saveLoginDataTemporary: false });
  commit(MutationTypes.setError, { error: undefined });
};

export const createActions = <TRootState, T extends LoginResponse>(): ActionTree<AuthenticateState<T>, TRootState> => ({
  [ActionTypes.login]({ commit, dispatch }, { password, saveLoginDataTemporary, userName }: LoginData): Promise<LoginResponse> {
    commit(MutationTypes.setIsLoading, { isLoading: true });
    resetState(commit);

    return new Promise((resolve) => {
      axios.get<LoginResponse>(`${RouteTypes.authenticate}/login/${userName}/${password}`)
        .then((response: AxiosResponse<LoginResponse>) => {
          if (response.data.success) {
            commit(MutationTypes.setData, { data: response.data, saveLoginDataTemporary });
          } else {
            snackbar.error({ message: 'message.login-failure', messageParams: [''] });
            const error: Error = {
              name: 'login-failure',
              message: 'message.login-failure'
            };
            commit(MutationTypes.setError, { error });
          }
        })
        .catch((error) => {
          snackbar.error({
            btn: {
              callback: () => dispatch(ActionTypes.login, { password, saveLoginDataTemporary, userName }),
              color: 'white',
              text: 'message.retry'
            },
            message: 'message.login-failure',
            messageParams: [error.message]
          });
          commit(MutationTypes.setError, { error });
        })
        .finally(() => {
          commit(MutationTypes.setIsLoading, { isLoading: false });
          resolve();
        });
    });
  },
  [ActionTypes.logout]({ commit, dispatch, getters }): Promise<boolean> {
    commit(MutationTypes.setIsLoading, { isLoading: true });

    return new Promise((resolve) => {
      axios.get<boolean>(`${RouteTypes.authenticate}/logout/${getters.token}`)
        .then((response: AxiosResponse<boolean>) => {
          if (response.data) {
            resetState(commit);
            snackbar.success({ message: 'message.logout-success' });
          } else {
            snackbar.error({ message: 'message.logout-failure' });
            const error: Error = {
              name: 'logout-failure',
              message: 'message.logout-failure'
            };
            commit(MutationTypes.setError, { error });
          }
        })
        .catch((error) => {
          snackbar.error({
            btn: {
              callback: () => dispatch(ActionTypes.logout),
              color: 'white',
              text: 'message.retry'
            },
            message: 'message.logout-failure',
            messageParams: [error.message]
          });
          commit(MutationTypes.setError, { error });
        })
        .finally(() => {
          commit(MutationTypes.setIsLoading, { isLoading: false });
          resolve();
        });
    });
  },
  [ActionTypes.validateToken]({ commit, dispatch }, { token }: ValidateTokenData): Promise<LoginResponse> {
    commit(MutationTypes.setIsLoading, { isLoading: true });
    resetState(commit);

    return new Promise((resolve) => {
      axios.get<LoginResponse>(`${RouteTypes.authenticate}/validate-token/${token}`)
        .then((response: AxiosResponse<LoginResponse>) => {
          if (response.data.success) {
            commit(MutationTypes.setData, { data: response.data, saveLoginDataTemporary: true });
          } else {
            snackbar.error({ message: 'message.token-validation-failure' });
            const error: Error = {
              name: 'token-validation-failure',
              message: 'message.token-validation-failure'
            };
            commit(MutationTypes.setError, { error });
          }
        })
        .catch((error) => {
          snackbar.error({
            btn: {
              callback: () => dispatch(ActionTypes.validateToken, { token }),
              color: 'white',
              text: 'message.retry'
            },
            message: 'message.token-validation-failure',
            messageParams: [error.message]
          });
          commit(MutationTypes.setError, { error });
        })
        .finally(() => {
          commit(MutationTypes.setIsLoading, { isLoading: false });
          resolve();
        });
    });
  }
});
