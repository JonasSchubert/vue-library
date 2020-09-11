import { Module } from 'vuex';
import { LocalStorageState } from '../models';
import { createActions } from './actions';
import { createGetters } from './getters';
import { createMutations } from './mutations';
import { createLocalStorageState } from './state';

// eslint-diable-next-line @typescript-eslint/explicit-module-boundary-types
export const createLocalStorageModule = <T>(appName: string, vuetify: any): Module<LocalStorageState, T> => ({
  namespaced: true,
  actions: createActions<T>(appName, vuetify),
  getters: createGetters<T>(),
  mutations: createMutations(),
  state: createLocalStorageState(vuetify.framework.theme.dark)
});
