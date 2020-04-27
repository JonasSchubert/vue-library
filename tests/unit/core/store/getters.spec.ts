import { GetterTree } from 'vuex';
import { BaseState } from '@/core/models';
import { createGetters } from '@/core/store/getters';
import { GetterTypes } from '@/core/store/types';

describe('getters', () => {
  const getters: GetterTree<BaseState, BaseState> = createGetters<BaseState>();

  describe(`${GetterTypes.isAnythingLoading}`, () => {
    test('should return true for requests bigger then 0', () => {
      // Arrange
      const state: BaseState = {
        requests: 5
      };

      // Act
      const actual = getters[GetterTypes.isAnythingLoading](state, getters, state, {});

      // Assert
      expect(actual).toBeTruthy();
    });

    test('should return false for requests equal to 0', () => {
      // Arrange
      const state: BaseState = {
        requests: 0
      };

      // Act
      const actual = getters[GetterTypes.isAnythingLoading](state, getters, state, {});

      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
