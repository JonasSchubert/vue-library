import { ActionTree } from 'vuex';
import {
  LocalStorageHistory, LocalStorageSettings, LocalStorageState
} from '@/local-storage/models';
import { createActions } from '@/local-storage/store/actions';
import {
  ActionTypes, GetterTypes, LocalStorageTypes, MutationTypes
} from '@/local-storage/store/types';

describe('core/local-storage/actions', () => {
  const appName = 'unit-tests';
  const vuetify: any = { framework: { theme: { dark: false } } };

  beforeEach(() => {
    vuetify.framework.theme.dark = false;
    localStorage.clear();
    jest.resetAllMocks();
  });

  describe(`${ActionTypes.loadHistory}`, () => {
    // TODO try to fix test failing, while it should succeed
    xtest('should load and commit history if data is not null', () => {
      // Arrange
      const actions: ActionTree<LocalStorageState, LocalStorageState> = createActions<LocalStorageState>(appName, vuetify);
      const commit = jest.fn();
      const localStorageHistory: LocalStorageHistory = {
        lastRoutes: [
          { name: 'start', route: '/' }
        ]
      };
      localStorage.setItem(`${appName}${LocalStorageTypes.history}`, JSON.stringify(localStorageHistory));

      // Assert
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(`${appName}${LocalStorageTypes.history}`, JSON.stringify(localStorageHistory));
      expect(localStorage.__STORE__[`${appName}${LocalStorageTypes.history}`]).toBe(JSON.stringify(localStorageHistory));

      // Act
      (actions[ActionTypes.loadHistory] as Function)({ commit });

      // Assert
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenLastCalledWith(`${appName}${LocalStorageTypes.history}`);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(MutationTypes.setHistory, {
        history: {
          lastRoutes: [
            { name: 'start', route: '/' }
          ]
        }
      });
    });

    test('should load history, but not commit if data is null', () => {
      // Arrange
      const actions: ActionTree<LocalStorageState, LocalStorageState> = createActions<LocalStorageState>(appName, vuetify);
      const commit = jest.fn();

      // Act
      (actions[ActionTypes.loadHistory] as Function)({ commit });

      // Assert
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenLastCalledWith(`${appName}${LocalStorageTypes.history}`);
      expect(commit).toHaveBeenCalledTimes(0);
    });
  });

  describe(`${ActionTypes.loadSettings}`, () => {
    // TODO try to fix test failing, while it should succeed
    xtest('should load and commit settings if data is not null', () => {
      // Arrange
      const actions: ActionTree<LocalStorageState, LocalStorageState> = createActions<LocalStorageState>(appName, vuetify);
      const commit = jest.fn();
      const localStorageSettings: LocalStorageSettings = {
        isDarkTheme: true
      };
      localStorage.setItem(`${appName}${LocalStorageTypes.settings}`, JSON.stringify(localStorageSettings));

      // Assert
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(`${appName}${LocalStorageTypes.settings}`, JSON.stringify(localStorageSettings));
      expect(localStorage.__STORE__[`${appName}${LocalStorageTypes.settings}`]).toBe(JSON.stringify(localStorageSettings));

      // Act
      (actions[ActionTypes.loadSettings] as Function)({ commit });

      // Assert
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenLastCalledWith(`${appName}${LocalStorageTypes.settings}`);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(MutationTypes.setSettings, {
        settings: {
          isDarkTheme: true
        }
      });
    });

    test('should load settings, but not commit if data is null', () => {
      // Arrange
      const actions: ActionTree<LocalStorageState, LocalStorageState> = createActions<LocalStorageState>(appName, vuetify);
      const commit = jest.fn();

      // Act
      (actions[ActionTypes.loadSettings] as Function)({ commit });

      // Assert
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenLastCalledWith(`${appName}${LocalStorageTypes.settings}`);
      expect(commit).toHaveBeenCalledTimes(0);
    });
  });

  describe(`${ActionTypes.updateIsDarkTheme}`, () => {
    test('should set dark theme on vuetify, commit it to the store and store it in the localstorage', () => {
      // Arrange
      const actions: ActionTree<LocalStorageState, LocalStorageState> = createActions<LocalStorageState>(appName, vuetify);
      const commit = jest.fn();
      const getters = {
        [GetterTypes.settings]: { isDarkTheme: true }
      };
      vuetify.framework.theme.dark = false;

      // Act
      (actions[ActionTypes.updateIsDarkTheme] as Function)({ commit, getters }, { isDarkTheme: true });

      // Assert
      expect(vuetify.framework.theme.dark).toBeTruthy();
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith(MutationTypes.updateIsDarkTheme, { isDarkTheme: true });
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(`${appName}${LocalStorageTypes.settings}`, "{\"isDarkTheme\":true}");
    });
  });

  describe(`${ActionTypes.updateLastRoutes}`, () => {
    test.todo('should have an unit test');
  });
});
