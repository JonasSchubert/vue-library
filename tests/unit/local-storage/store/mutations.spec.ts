import { MutationTree } from 'vuex';
import { LocalStorageHistory, LocalStorageSettings, LocalStorageState } from '@/local-storage/models';
import { createMutations } from '@/local-storage/store/mutations';
import { MutationTypes } from '@/local-storage/store/types';

describe('local-storage/mutations', () => {
  let state: LocalStorageState;

  const mutations: MutationTree<LocalStorageState> = createMutations();

  beforeEach(() => {
    state = {
      history: { lastRoutes: [] },
      settings: { isDarkTheme: false }
    };
  });

  describe(`${MutationTypes.setHistory}`, () => {
    test('should set history', () => {
      // Arrange
      const history: LocalStorageHistory = {
        lastRoutes: []
      };

      // Act
      mutations[MutationTypes.setHistory](state, { history });

      // Assert
      expect(state.history).toMatchSnapshot();
    });
  });

  describe(`${MutationTypes.setSettings}`, () => {
    test('should set settings', () => {
      // Arrange
      const settings: LocalStorageSettings = {
        isDarkTheme: true
      };

      // Act
      mutations[MutationTypes.setSettings](state, { settings });

      // Assert
      expect(state.settings).toMatchSnapshot();
    });
  });

  describe(`${MutationTypes.updateIsDarkTheme}`, () => {
    test('should update isDarkTheme', () => {
      // Arrange
      const isDarkTheme = true;

      // Act
      mutations[MutationTypes.updateIsDarkTheme](state, { isDarkTheme });

      // Assert
      expect(state.settings).toMatchSnapshot();
    });
  });

  describe(`${MutationTypes.updateLastRoutes}`, () => {
    test('should update last routes', () => {
      // Arrange
      const lastRoutes: any[] = [];

      // Act
      mutations[MutationTypes.updateLastRoutes](state, { lastRoutes });

      // Assert
      expect(state.history).toMatchSnapshot();
    });
  });
});
