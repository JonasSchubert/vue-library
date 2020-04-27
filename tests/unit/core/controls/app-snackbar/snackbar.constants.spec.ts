import { defaultSnackbarConfig } from '@/core/controls/app-snackbar/snackbar.constants';

describe('defaultSnackbarConfig', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(defaultSnackbarConfig).toMatchSnapshot();
  });
});
