import { LocalStorageState } from '@/local-storage/models';
import { createLocalStorageState } from '@/local-storage/store/state';

describe('LocalStorageState', () => {
  test('should not change unexpected', () => {
    // Act
    const actual: LocalStorageState = createLocalStorageState();

    // Assert
    expect(actual).toMatchSnapshot();
  });
});
