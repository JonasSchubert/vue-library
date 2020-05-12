import axios, { AxiosStatic } from 'axios';
import { UserRole } from '@/authenticate/enums';
import { LoginResponse, } from '@/authenticate/models';
import { createActions } from '@/authenticate/store/actions';
import { ActionTypes } from '@/authenticate/store/types';

jest.mock('axios');

describe('authenticate/actions', () => {
  const actions = createActions();

  describe(`${ActionTypes.login}`, () => {
    test('should call backend as expected and commit with returned data for login succeeded', async (done) => {
      // Arrange
      const responseData: LoginResponse = {
        item1: true,
        item2: 'token',
        item3: UserRole.Administrator + UserRole.User
      };
      const commit = jest.fn();
      const dispatch = jest.fn();
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.login] as Function)({ commit, dispatch }, { password: 'password', saveLoginDataTemporary: false, userName: 'userName' })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('authenticate/login/userName/password');
          expect(commit).toHaveBeenCalledTimes(8);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setToken', { token: undefined, saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setUserRoles', { userRoles: [] });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setToken', { token: 'token', saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setUserRoles', { userRoles: [UserRole.User, UserRole.Administrator] });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend as expected and commit with returned data for login failed', async (done) => {
      // Arrange
      const responseData: LoginResponse = {
        item1: false,
        item2: '',
        item3: UserRole.Null
      };
      const commit = jest.fn();
      const dispatch = jest.fn();
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.login] as Function)({ commit, dispatch }, { password: 'password', saveLoginDataTemporary: false, userName: 'userName' })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('authenticate/login/userName/password');
          expect(commit).toHaveBeenCalledTimes(6);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setToken', { token: undefined, saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setUserRoles', { userRoles: [] });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              name: 'login-failure',
              message: 'message.login-failure'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          // expect(snackbarModule.snackbar.error).toHaveBeenCalledTimes(1);
          // expect(snackbarModule.snackbar.error).toHaveBeenCalledWith({ message: 'message.login-failure' });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend and handle error', async (done) => {
      // Arrange
      const responseError: Error = {
        message: 'message',
        name: 'name'
      };
      const commit = jest.fn();
      const dispatch = jest.fn();
      axios.get = jest.fn(() => Promise.reject(responseError)) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.login] as Function)({ commit, dispatch }, { password: 'password', saveLoginDataTemporary: false, userName: 'userName' })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('authenticate/login/userName/password');
          expect(commit).toHaveBeenCalledTimes(6);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setToken', { token: undefined, saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setUserRoles', { userRoles: [] });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'message',
              name: 'name'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });
  });

  describe(`${ActionTypes.logout}`, () => {
    test('should call backend as expected and commit with returned data for logout succeeded', async (done) => {
      // Arrange
      const responseData = true;
      const commit = jest.fn();
      const dispatch = jest.fn();
      const getters = { token: 'token' };
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.logout] as Function)({ commit, dispatch, getters })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('authenticate/logout/token');
          expect(commit).toHaveBeenCalledTimes(5);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setToken', { token: undefined, saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setUserRoles', { userRoles: [] });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend as expected and commit with returned data for logout failed', async (done) => {
      // Arrange
      const responseData = false;
      const commit = jest.fn();
      const dispatch = jest.fn();
      const getters = { token: 'token' };
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.logout] as Function)({ commit, dispatch, getters })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('authenticate/logout/token');
          expect(commit).toHaveBeenCalledTimes(3);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              name: 'logout-failure',
              message: 'message.logout-failure'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend and handle error', async (done) => {
      // Arrange
      const responseError: Error = {
        message: 'message',
        name: 'name'
      };
      const commit = jest.fn();
      const dispatch = jest.fn();
      const getters = { token: 'token' };
      axios.get = jest.fn(() => Promise.reject(responseError)) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.logout] as Function)({ commit, dispatch, getters })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('authenticate/logout/token');
          expect(commit).toHaveBeenCalledTimes(3);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'message',
              name: 'name'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });
  });

  describe(`${ActionTypes.validateToken}`, () => {
    test('should call backend as expected and commit with returned data for validation succeeded as Administrator', async (done) => {
      // Arrange
      const responseData: LoginResponse = {
        item1: true,
        item2: 'token',
        item3: UserRole.Administrator
      };
      const commit = jest.fn();
      const dispatch = jest.fn();
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.validateToken] as Function)({ commit, dispatch }, { token: 'token' })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('authenticate/validate-token/token');
          expect(commit).toHaveBeenCalledTimes(8);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setToken', { token: undefined, saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setUserRoles', { userRoles: [] });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setToken', { token: 'token', saveLoginDataTemporary: true });
          expect(commit).toHaveBeenCalledWith('setUserRoles', { userRoles: [UserRole.Administrator] });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend as expected and commit with returned data for validation succeeded as Editor', async (done) => {
      // Arrange
      const responseData: LoginResponse = {
        item1: true,
        item2: 'token',
        item3: UserRole.User
      };
      const commit = jest.fn();
      const dispatch = jest.fn();
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.validateToken] as Function)({ commit, dispatch }, { token: 'token' })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('authenticate/validate-token/token');
          expect(commit).toHaveBeenCalledTimes(8);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setToken', { token: undefined, saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setUserRoles', { userRoles: [] });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setToken', { token: 'token', saveLoginDataTemporary: true });
          expect(commit).toHaveBeenCalledWith('setUserRoles', { userRoles: [UserRole.User] });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend as expected and commit with returned data for validation failed', async (done) => {
      // Arrange
      const responseData: LoginResponse = {
        item1: false,
        item2: '',
        item3: UserRole.Null
      };
      const commit = jest.fn();
      const dispatch = jest.fn();
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.validateToken] as Function)({ commit, dispatch }, { token: 'token' })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('authenticate/validate-token/token');
          expect(commit).toHaveBeenCalledTimes(6);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setToken', { token: undefined, saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setUserRoles', { userRoles: [] });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              name: 'token-validation-failure',
              message: 'message.token-validation-failure'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend and handle error', async (done) => {
      // Arrange
      const responseError: Error = {
        message: 'message',
        name: 'name'
      };
      const commit = jest.fn();
      const dispatch = jest.fn();
      axios.get = jest.fn(() => Promise.reject(responseError)) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.validateToken] as Function)({ commit, dispatch }, { token: 'token' })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('authenticate/validate-token/token');
          expect(commit).toHaveBeenCalledTimes(6);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setToken', { token: undefined, saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setUserRoles', { userRoles: [] });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'message',
              name: 'name'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });
  });
});
