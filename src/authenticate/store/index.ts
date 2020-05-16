import { Module } from 'vuex';
import { AuthenticateModuleSetup, AuthenticateState, LoginResponse } from '../models';
import { createActions } from './actions';
import { createGetters } from './getters';
import { createMutations } from './mutations';
import { createAuthenticateState } from './state';

export const createAuthenticateModule = <TRootState, T extends LoginResponse>({ cookieKeyAuthenticationToken, customGetters, daysTilExpiredAuthenticationCookie }: AuthenticateModuleSetup<TRootState, T>): Module<AuthenticateState<T>, TRootState> => ({
  namespaced: true,
  actions: createActions(),
  getters: createGetters(customGetters),
  mutations: createMutations({ cookieKeyAuthenticationToken, daysTilExpiredAuthenticationCookie }),
  state: createAuthenticateState()
});
