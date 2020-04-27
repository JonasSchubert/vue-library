import { EditMode } from '@/core/enums';

describe('EditMode', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(EditMode).toMatchSnapshot();
  });
});
