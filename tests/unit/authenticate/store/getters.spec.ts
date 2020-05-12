import { UserRole } from '@/authenticate/enums';
import { AuthenticateState } from '@/authenticate/models';
import { createGetters } from '@/authenticate/store/getters';
import { GetterTypes } from '@/authenticate/store/types';

describe('authenticate/getters', () => {
  let state: AuthenticateState;

  const getters = createGetters();

  beforeEach(() => {
    state = {
      error: {
        message: 'message',
        name: 'name'
      },
      isLoading: false,
      token: 'token',
      userRoles: [UserRole.Administrator]
    };
  });

  describe(`${GetterTypes.error}`, () => {
    test('should return error as expected', () => {
      // Arrange && Act
      const actual = getters[GetterTypes.error](state, getters, {} as AuthenticateState, {});

      // Assert
      expect(actual).toMatchSnapshot({
        message: 'message',
        name: 'name'
      });
    });
  });

  describe(`${GetterTypes.isAdministrator}`, () => {
    test('should return isAdministrator as expected', () => {
      // Arrange && Act
      const actual = getters[GetterTypes.isAdministrator](state, getters, {} as AuthenticateState, {});

      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe(`${GetterTypes.isLoading}`, () => {
    test('should return isLoading as expected', () => {
      // Arrange && Act
      const actual = getters[GetterTypes.isLoading](state, getters, {} as AuthenticateState, {});

      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe(`${GetterTypes.isUser}`, () => {
    test('should return isEditor as expected', () => {
      // Arrange && Act
      const actual = getters[GetterTypes.isUser](state, getters, {} as AuthenticateState, {});

      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe(`${GetterTypes.token}`, () => {
    test('should return token as expected', () => {
      // Arrange && Act
      const actual = getters[GetterTypes.token](state, getters, {} as AuthenticateState, {});

      // Assert
      expect(actual).toBe('token');
    });
  });

  describe(`${GetterTypes.userRoles}`, () => {
    test('should return userRoles as expected', () => {
      // Arrange && Act
      const actual = getters[GetterTypes.userRoles](state, getters, {} as AuthenticateState, {});

      // Assert
      expect(actual).toMatchSnapshot([UserRole.Administrator]);
    });
  });
});
