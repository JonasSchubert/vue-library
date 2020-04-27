import { GetterTypes, MutationTypes } from '@/core/store/types';

describe('GetterTypes', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(GetterTypes).toMatchSnapshot();
  });
});

describe('MutationTypes', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(MutationTypes).toMatchSnapshot();
  });
});
