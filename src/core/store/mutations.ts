import { MutationTree } from 'vuex';
import { BaseState } from '../models';
import { MutationTypes } from './types';

export const createMutations = <T extends BaseState>(): MutationTree<T> => ({
  [MutationTypes.decreaseRequests]: (state: T): void => { state.requests -= 1; },
  [MutationTypes.increaseRequests]: (state: T): void => { state.requests += 1; }
});
