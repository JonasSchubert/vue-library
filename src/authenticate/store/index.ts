import { Module } from 'vuex';
import { AuthenticateModuleSetup, AuthenticateState } from '../models';
import { createActions } from './actions';
import { createGetters } from './getters';
import { createMutations } from './mutations';
import { createAuthenticateState } from './state';

export const createAuthenticateModule = <TRootState>({ cookieKeyAuthenticationToken, daysTilExpiredAuthenticationCookie }: AuthenticateModuleSetup): Module<AuthenticateState, TRootState> => ({
  namespaced: true,
  actions: createActions(),
  getters: createGetters(),
  mutations: createMutations({ cookieKeyAuthenticationToken, daysTilExpiredAuthenticationCookie }),
  state: createAuthenticateState()
});
