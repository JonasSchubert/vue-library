import { ActionTree } from 'vuex';
import {
  LocalStorageHistory, LocalStorageSettings, LocalStorageState
} from '../models';
import {
  ActionTypes, GetterTypes, LocalStorageTypes, MutationTypes
} from './types';

export const createActions = <T>(appName: string, vuetify: any): ActionTree<LocalStorageState, T> => ({
  [ActionTypes.loadHistory]({ commit }): void {
    const rawHistory: string | null = localStorage.getItem(`${appName}${LocalStorageTypes.history}`);
    if (rawHistory) {
      const history: LocalStorageHistory = JSON.parse(rawHistory);
      commit(MutationTypes.setHistory, { history });
    }
  },
  [ActionTypes.loadSettings]({ commit }): void {
    const rawSettings: string | null = localStorage.getItem(`${appName}${LocalStorageTypes.settings}`);
    if (rawSettings) {
      const settings: LocalStorageSettings = JSON.parse(rawSettings);
      vuetify.framework.theme.dark = settings.isDarkTheme;
      commit(MutationTypes.setSettings, { settings });
    }
  },
  [ActionTypes.updateIsDarkTheme]({ commit, getters }, { isDarkTheme }: { isDarkTheme: boolean }): void {
    vuetify.framework.theme.dark = isDarkTheme;
    commit(MutationTypes.updateIsDarkTheme, { isDarkTheme });
    const settings: LocalStorageSettings = getters[GetterTypes.settings];
    localStorage.setItem(`${appName}${LocalStorageTypes.settings}`, JSON.stringify(settings));
  },
  [ActionTypes.updateLastRoutes]({ commit, getters }, { newRoute }: { newRoute: any }): void {
    const lastRoutes: any[] = [...getters[GetterTypes.lastRoutes]];

    let index = lastRoutes.findIndex((item: any) => item.name === newRoute.name);
    while (index > -1) {
      lastRoutes.splice(index, 1);
      index = lastRoutes.findIndex((item: any) => item.name === newRoute.name);
    }

    lastRoutes.unshift(newRoute);
    lastRoutes.splice(3);

    commit(MutationTypes.updateLastRoutes, { lastRoutes });

    const history: LocalStorageHistory = getters[GetterTypes.history];
    localStorage.setItem(`${appName}${LocalStorageTypes.history}`, JSON.stringify(history));
  }
});
