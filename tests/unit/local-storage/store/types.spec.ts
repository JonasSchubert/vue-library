import {
  ActionTypes, GetterTypes, LocalStorageTypes, ModuleType, MutationTypes
} from '@/local-storage/store/types';

describe('ActionTypes', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(ActionTypes).toMatchSnapshot();
  });
});

describe('GetterTypes', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(GetterTypes).toMatchSnapshot();
  });
});

describe('LocalStorageTypes', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(LocalStorageTypes).toMatchSnapshot();
  });
});

describe('ModuleType', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(ModuleType).toMatchSnapshot();
  });
});

describe('MutationTypes', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(MutationTypes).toMatchSnapshot();
  });
});
