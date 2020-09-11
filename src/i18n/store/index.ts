import { Module } from 'vuex';
import { I18nModuleConfig, I18nState } from '../models';
import { createActions } from './actions';
import { createGetters } from './getters';
import { createMutations } from './mutations';
import { createState } from './state';

export const createModule = <T>(config: I18nModuleConfig): Module<I18nState, T> => ({
  namespaced: true,
  actions: createActions<T>(config),
  getters: createGetters<T>(),
  mutations: createMutations(config),
  state: createState(config)
});
