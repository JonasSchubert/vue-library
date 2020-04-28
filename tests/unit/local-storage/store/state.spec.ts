import { LocalStorageState } from '@/local-storage/models';
import { createLocalStorageState } from '@/local-storage/store/state';

describe('LocalStorageState', () => {
  test('should not change unexpected with isDarkTheme true', () => {
    // Act
    const actual: LocalStorageState = createLocalStorageState(true);

    // Assert
    expect(actual).toMatchSnapshot();
  });
  test('should not change unexpected with isDarkTheme false', () => {
    // Act
    const actual: LocalStorageState = createLocalStorageState(false);

    // Assert
    expect(actual).toMatchSnapshot();
  });
});
