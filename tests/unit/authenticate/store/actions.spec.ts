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
        role: UserRole.Administrator + UserRole.User,
        success: true,
        token: 'token'
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
          expect(commit).toHaveBeenCalledTimes(5);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setData', { data: undefined, saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setData', {
            data: {
              role: UserRole.Administrator + UserRole.User,
              success: true,
              token: 'token'
            },
            saveLoginDataTemporary: false
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend as expected and commit with returned data for login failed', async (done) => {
      // Arrange
      const responseData: LoginResponse = {
        role: UserRole.Null,
        success: false,
        token: ''
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
          expect(commit).toHaveBeenCalledTimes(5);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setData', { data: undefined, saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              name: 'login-failure',
              message: 'message.login-failure'
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
      (actions[ActionTypes.login] as Function)({ commit, dispatch }, { password: 'password', saveLoginDataTemporary: false, userName: 'userName' })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('authenticate/login/userName/password');
          expect(commit).toHaveBeenCalledTimes(5);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setData', { data: undefined, saveLoginDataTemporary: false });
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
          expect(commit).toHaveBeenCalledTimes(4);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setData', { data: undefined, saveLoginDataTemporary: false });
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
        role: UserRole.Administrator,
        success: true,
        token: 'token'
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
          expect(commit).toHaveBeenCalledTimes(5);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setData', { data: undefined, saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setData', {
            data: {
              role: UserRole.Administrator,
              success: true,
              token: 'token'
            },
            saveLoginDataTemporary: true
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend as expected and commit with returned data for validation succeeded as User', async (done) => {
      // Arrange
      const responseData: LoginResponse = {
        role: UserRole.User,
        success: true,
        token: 'token'
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
          expect(commit).toHaveBeenCalledTimes(5);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setData', { data: undefined, saveLoginDataTemporary: false });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setData', {
            data: {
              role: UserRole.User,
              success: true,
              token: 'token'
            },
            saveLoginDataTemporary: true
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend as expected and commit with returned data for validation failed', async (done) => {
      // Arrange
      const responseData: LoginResponse = {
        role: UserRole.Null,
        success: false,
        token: ''
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
          expect(commit).toHaveBeenCalledTimes(5);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setData', { data: undefined, saveLoginDataTemporary: false });
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
          expect(commit).toHaveBeenCalledTimes(5);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setData', { data: undefined, saveLoginDataTemporary: false });
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
