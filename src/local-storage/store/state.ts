import { LocalStorageState } from '../models';

export const createLocalStorageState = (isDarkTheme: boolean): LocalStorageState => ({
  history: {
    lastRoutes: []
  },
  settings: {
    isDarkTheme
  }
});
