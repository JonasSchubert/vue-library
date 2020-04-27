import { SnackbarEvents } from '@/core/controls/app-snackbar/snackbar-events.enum';

describe('SnackbarEvents', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(SnackbarEvents).toMatchSnapshot();
  });
});
