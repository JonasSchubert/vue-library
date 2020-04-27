import { Module } from 'vuex';
import { LocalStorageState } from '../models';
import { createActions } from './actions';
import { createGetters } from './getters';
import { createMutations } from './mutations';
import { createLocalStorageState } from './state';

export const createLocalStorageModule = <T>(): Module<LocalStorageState, T> => ({
  namespaced: true,
  actions: createActions<T>(),
  getters: createGetters<T>(),
  mutations: createMutations(),
  state: createLocalStorageState()
});
