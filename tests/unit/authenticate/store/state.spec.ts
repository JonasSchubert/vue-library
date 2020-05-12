import { createAuthenticateState } from '@/authenticate/store/state';

describe('createAuthenticateState', () => {
  test('should not change unexpected', () => {
    // Arrange
    const authenticateState = createAuthenticateState();

    // Assert
    expect(authenticateState).toMatchSnapshot();
  });
});
