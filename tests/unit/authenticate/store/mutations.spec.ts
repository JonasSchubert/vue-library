import { UserRole } from '@/authenticate/enums';
import { AuthenticateState, LoginResponse } from '@/authenticate/models';
import { createMutations } from '@/authenticate/store/mutations';
import { MutationTypes } from '@/authenticate/store/types';

describe('authenticate/mutations', () => {
  let state: AuthenticateState<LoginResponse>;

  const mutations = createMutations({ cookieKeyAuthenticationToken: 'unit-test', daysTilExpiredAuthenticationCookie: 1 });

  beforeEach(() => {
    state = {
      data: undefined,
      error: undefined,
      isLoading: false
    };
  });

  describe(`${MutationTypes.setData}`, () => {
    test('should set data', () => {
      // Arrange
      const data: LoginResponse = {
        role: UserRole.User,
        success: true,
        token: 'token'
      };

      // Act
      mutations[MutationTypes.setData](state, { data });

      // Assert
      expect(state.data).toMatchSnapshot({
        role: UserRole.User,
        success: true,
        token: 'token'
      });
    });
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
});
