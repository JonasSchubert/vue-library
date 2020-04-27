import { GetterTree } from 'vuex';
import {
  LocalStorageHistory, LocalStorageSettings, LocalStorageState
} from '../models';
import { GetterTypes } from './types';

export const createGetters = <T>(): GetterTree<LocalStorageState, T> => ({
  [GetterTypes.history]: (state: LocalStorageState): LocalStorageHistory => state.history,
  [GetterTypes.isDarkTheme]: (state: LocalStorageState): boolean => state.settings.isDarkTheme,
  [GetterTypes.lastRoutes]: (state: LocalStorageState): any[] => state.history.lastRoutes,
  [GetterTypes.settings]: (state: LocalStorageState): LocalStorageSettings => state.settings
});
