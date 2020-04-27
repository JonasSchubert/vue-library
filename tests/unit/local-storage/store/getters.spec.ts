import { GetterTree } from 'vuex';
import {
  LocalStorageHistory, LocalStorageSettings, LocalStorageState
} from '@/local-storage/models';
import { createGetters } from '@/local-storage/store/getters';
import { GetterTypes } from '@/local-storage/store/types';

describe('getters', () => {
  const state: LocalStorageState = {
    history: {
      lastRoutes: []
    },
    settings: { isDarkTheme: true }
  };

  const getters: GetterTree<LocalStorageState, LocalStorageState> = createGetters<LocalStorageState>();

  describe(`${GetterTypes.history}`, () => {
    test('should return history as expected', () => {
      // Arrange && Act
      const actual: LocalStorageHistory = getters[GetterTypes.history](state, getters, state, {});

      // Assert
      expect(actual).toMatchSnapshot();
    });
  });

  describe(`${GetterTypes.isDarkTheme}`, () => {
    test('should return isDarkTheme as expected', () => {
      // Arrange && Act
      const actual: boolean = getters[GetterTypes.isDarkTheme](state, getters, state, {});

      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe(`${GetterTypes.lastRoutes}`, () => {
    test('should return lastRoutes as expected', () => {
      // Arrange && Act
      const actual: any[] = getters[GetterTypes.lastRoutes](state, getters, state, {});

      // Assert
      expect(actual).toMatchSnapshot();
    });
  });

  describe(`${GetterTypes.settings}`, () => {
    test('should return settings as expected', () => {
      // Arrange && Act
      const actual: LocalStorageSettings = getters[GetterTypes.settings](state, getters, state, {});

      // Assert
      expect(actual).toMatchSnapshot();
    });
  });
});
