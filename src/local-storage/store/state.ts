import { isDarkTheme } from '@/core/plugins/vuetify.plugin';
import { LocalStorageState } from '../models';

export const createLocalStorageState = (): LocalStorageState => ({
  history: {
    lastRoutes: []
  },
  settings: {
    isDarkTheme
  }
});
