import { UserRole } from '@/authenticate/enums';
import { AuthenticateState } from '@/authenticate/models';
import { createMutations } from '@/authenticate/store/mutations';
import { MutationTypes } from '@/authenticate/store/types';

describe('authenticate/mutations', () => {
  let state: AuthenticateState;

  const mutations = createMutations({ cookieKeyAuthenticationToken: 'unit-test', daysTilExpiredAuthenticationCookie: 1 });

  beforeEach(() => {
    state = {
      error: undefined,
      isLoading: false,
      token: undefined,
      userRoles: []
    };
  });

  describe(`${MutationTypes.setError}`, () => {
    test('should set error', () => {
      // Arrange
      const error: Error = {
        message: 'message',
        name: 'name'
      };

      // Act
      mutations[MutationTypes.setError](state, { error });

      // Assert
      expect(state.error).toMatchSnapshot({
        message: 'message',
        name: 'name'
      });
    });
  });

  describe(`${MutationTypes.setIsLoading}`, () => {
    test('should set isLoading', () => {
      // Arrange
      const isLoading = true;

      // Act
      mutations[MutationTypes.setIsLoading](state, { isLoading });

      // Assert
      expect(state.isLoading).toBeTruthy();
    });
  });

  describe(`${MutationTypes.setToken}`, () => {
    test('should set token', () => {
      // Arrange
      const token = 'token';

      // Act
      mutations[MutationTypes.setToken](state, { token, saveLoginDataTemporary: false });

      // Assert
      expect(state.token).toBe('token');
    });
  });

  describe(`${MutationTypes.setUserRoles}`, () => {
    test('should set userRoles', () => {
      // Arrange
      const userRoles = [UserRole.User];

      // Act
      mutations[MutationTypes.setUserRoles](state, { userRoles });

      // Assert
      expect(state.userRoles).toMatchSnapshot([UserRole.User]);
    });
  });
});
