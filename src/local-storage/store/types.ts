export const ActionTypes = {
  loadHistory: 'loadHistory',
  loadSettings: 'loadSettings',
  updateIsDarkTheme: 'updateIsDarkTheme',
  updateLastRoutes: 'updateLastRoutes'
};

export const GetterTypes = {
  history: 'history',
  isDarkTheme: 'isDarkTheme',
  lastRoutes: 'lastRoutes',
  settings: 'settings'
};

export const LocalStorageTypes = {
  history: 'i18n-service-history',
  settings: 'i18n-service-settings'
};

export const ModuleType = 'local-storage';

export const MutationTypes = {
  setHistory: 'setHistory',
  setSettings: 'setSettings',
  updateIsDarkTheme: 'updateIsDarkTheme',
  updateLastRoutes: 'updateLastRoutes'
};
