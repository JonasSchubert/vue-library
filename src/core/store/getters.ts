import { GetterTree } from 'vuex';
import { BaseState } from '../models';
import { GetterTypes } from './types';

export const createGetters = <T extends BaseState>(): GetterTree<T, T> => ({
  [GetterTypes.isAnythingLoading]: (state: T): boolean => state.requests > 0
});
