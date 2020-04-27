import { MutationTree } from 'vuex';
import { LocalStorageHistory, LocalStorageSettings, LocalStorageState } from '../models';
import { MutationTypes } from './types';

export const createMutations = (): MutationTree<LocalStorageState> => ({
  [MutationTypes.setHistory]: (state: LocalStorageState, { history }: { history: LocalStorageHistory }): void => {
    state.history = history;
  },
  [MutationTypes.setSettings]: (state: LocalStorageState, { settings }: { settings: LocalStorageSettings }): void => {
    state.settings = settings;
  },
  [MutationTypes.updateIsDarkTheme]: (state: LocalStorageState, { isDarkTheme }: { isDarkTheme: boolean }): void => {
    state.settings = { ...state.settings, isDarkTheme };
  },
  [MutationTypes.updateLastRoutes]: (state: LocalStorageState, { lastRoutes }: { lastRoutes: any[] }): void => {
    state.history = { ...state.history, lastRoutes };
  }
});
