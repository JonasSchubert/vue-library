import { BaseState } from '@/core/models';
import { createMutations } from '@/core/store/mutations';
import { MutationTypes } from '@/core/store/types';
import { MutationTree } from 'vuex';

describe('mutations', () => {
  const mutations: MutationTree<BaseState> = createMutations<BaseState>();

  describe(`${MutationTypes.increaseRequests}`, () => {
    test('should increase requests by one', () => {
      // Arrange
      const state: BaseState = {
        requests: 0
      };

      // Act
      mutations[MutationTypes.increaseRequests](state);

      // Assert
      expect(state.requests).toBe(1);
    });
  });

  describe(`${MutationTypes.decreaseRequests}`, () => {
    test('should decrease requests by one', () => {
      // Arrange
      const state: BaseState = {
        requests: 3
      };

      // Act
      mutations[MutationTypes.decreaseRequests](state);

      // Assert
      expect(state.requests).toBe(2);
    });
  });
});
