import axios, { AxiosStatic } from 'axios';
import { IVueI18n } from 'vue-i18n';
import { ActionTree } from 'vuex';
import { I18nModuleConfig, I18nState } from '@/i18n/models';
import { createActions } from '@/i18n/store/actions';
import { ActionTypes } from '@/i18n/store/types';

jest.mock('axios');

describe('createActions', () => {
  let i18n: IVueI18n;

  beforeEach(() => {
    i18n = {
      locale: 'en-GB',
      messages: {
        'en-GB': {
          'message': {
            'value': 'Value'
          }
        }
      },
      setLocaleMessage: jest.fn()
    } as unknown as IVueI18n;
  });

  describe(`${ActionTypes.getAllTranslations}`, () => {
    test('should call backend as expected and commit with existing returned data', async (done) => {
      // Arrange
      const actions: ActionTree<I18nState, I18nState> = createActions<I18nState>({ baseUrl: '/', i18n } as I18nModuleConfig);
      const commit = jest.fn();

      const responseData: any = {
        'de-DE': { message: { 'value': 'Wert' } },
        'en-GB': { message: { 'value': 'Value' } }
      };
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.getAllTranslations] as Function)({ commit })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('/i18n/GetAllIetfTranslations');
          expect(commit).toHaveBeenCalledTimes(2);
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setLocales', {
            locales: {
              'de-DE': { message: { 'value': 'Wert' } },
              'en-GB': { message: { 'value': 'Value' } }
            }
          });
          done();
        });
    });

    test('should call backend as expected and commit error with empty returned data', async (done) => {
      // Arrange
      const actions: ActionTree<I18nState, I18nState> = createActions<I18nState>({ baseUrl: '/', i18n } as I18nModuleConfig);
      const commit = jest.fn();

      const error: Error = {
        name: 'EmptyI18nAllTranslationsResponse',
        message: 'Found no translations'
      };
      const responseData: any = {};
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.getAllTranslations] as Function)({ commit })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('/i18n/GetAllIetfTranslations');
          expect(commit).toHaveBeenCalledTimes(2);
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setError', { error });
          done();
        });
    });

    test('should call backend and handle error', async (done) => {
      // Arrange
      const actions: ActionTree<I18nState, I18nState> = createActions<I18nState>({ baseUrl: '/', i18n } as I18nModuleConfig);
      const commit = jest.fn();

      const responseError: Error = {
        message: 'message',
        name: 'name'
      };
      axios.get = jest.fn(() => Promise.reject(responseError));

      // Act
      (actions[ActionTypes.getAllTranslations] as Function)({ commit })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('/i18n/GetAllIetfTranslations');
          expect(commit).toHaveBeenCalledTimes(2);
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'message',
              name: 'name'
            }
          });
          done();
        });
    });
  });

  describe(`${ActionTypes.getAvailableLocales}`, () => {
    test('should call backend as expected and commit with existing returned data and dispatch available locale', async (done) => {
      // Arrange
      const actions: ActionTree<I18nState, I18nState> = createActions<I18nState>({ baseUrl: '/', i18n } as I18nModuleConfig);
      const commit = jest.fn();
      const dispatch = jest.fn();

      const responseData: string[] = ['de-DE', 'en-GB'];
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.getAvailableLocales] as Function)({ commit, dispatch })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('/i18n/GetAvailableIetf');
          expect(commit).toHaveBeenCalledTimes(2);
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setAvailableLocales', { availableLocales: ['de-DE', 'en-GB'] });
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenCalledWith('getLocaleTranslations', { ietfTag: 'en-GB' });
          done();
        });
    });

    test('should call backend as expected and commit with existing returned data and dispatch new locale', async (done) => {
      // Arrange
      const actions: ActionTree<I18nState, I18nState> = createActions<I18nState>({ baseUrl: '/', i18n } as I18nModuleConfig);
      const commit = jest.fn();
      const dispatch = jest.fn();

      const responseData: string[] = ['de-DE', 'es-ES'];
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.getAvailableLocales] as Function)({ commit, dispatch })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('/i18n/GetAvailableIetf');
          expect(commit).toHaveBeenCalledTimes(3);
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setAvailableLocales', { availableLocales: ['de-DE', 'es-ES'] });
          expect(commit).toHaveBeenCalledWith('setCurrentLocale', { currentLocale: 'de-DE' });
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenCalledWith('getLocaleTranslations', { ietfTag: 'de-DE' });
          done();
        });
    });

    test('should call backend as expected and commit error with empty returned data', async (done) => {
      // Arrange
      const actions: ActionTree<I18nState, I18nState> = createActions<I18nState>({ baseUrl: '/', i18n } as I18nModuleConfig);
      const commit = jest.fn();
      const dispatch = jest.fn();

      const error: Error = {
        name: 'EmptyI18nAvailableLocalesResponse',
        message: 'Found no available locales'
      };
      const responseData: string[] = [];
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.getAvailableLocales] as Function)({ commit, dispatch })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('/i18n/GetAvailableIetf');
          expect(commit).toHaveBeenCalledTimes(2);
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setError', { error });
          done();
        });
    });

    test('should call backend and handle error', async (done) => {
      // Arrange
      const actions: ActionTree<I18nState, I18nState> = createActions<I18nState>({ baseUrl: '/', i18n } as I18nModuleConfig);
      const commit = jest.fn();
      const dispatch = jest.fn();

      const responseError: Error = {
        message: 'message',
        name: 'name'
      };
      axios.get = jest.fn(() => Promise.reject(responseError));

      // Act
      (actions[ActionTypes.getAvailableLocales] as Function)({ commit, dispatch })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('/i18n/GetAvailableIetf');
          expect(commit).toHaveBeenCalledTimes(2);
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'message',
              name: 'name'
            }
          });
          done();
        });
    });
  });

  describe(`${ActionTypes.getLocaleTranslations}`, () => {
    test('should call backend as expected and commit with existing returned data', async (done) => {
      // Arrange
      const actions: ActionTree<I18nState, I18nState> = createActions<I18nState>({ baseUrl: '/', i18n } as I18nModuleConfig);
      const commit = jest.fn();
      const ietfTag = 'de-DE';

      const responseData: any = {
        message: { 'value': 'Wert' }
      };
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.getLocaleTranslations] as Function)({ commit }, { ietfTag })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('/i18n/GetIetfTranslations/de-DE');
          expect(commit).toHaveBeenCalledTimes(3);
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('updateLocales', { locale: 'de-DE', translations: { message: { 'value': 'Wert' } } });
          expect(commit).toHaveBeenCalledWith('setCurrentLocale', { currentLocale: 'de-DE' });
          done();
        });
    });

    test('should call backend as expected and commit error with empty returned data', async (done) => {
      // Arrange
      const actions: ActionTree<I18nState, I18nState> = createActions<I18nState>({ baseUrl: '/', i18n } as I18nModuleConfig);
      const commit = jest.fn();
      const ietfTag = 'es-ES';

      const error: Error = {
        name: 'EmptyI18nLocaleTranslationsResponse',
        message: `Found no translations for ${ietfTag}`
      };
      const responseData: any = {};
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as unknown as AxiosStatic;

      // Act
      (actions[ActionTypes.getLocaleTranslations] as Function)({ commit }, { ietfTag })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('/i18n/GetIetfTranslations/es-ES');
          expect(commit).toHaveBeenCalledTimes(2);
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setError', { error });
          done();
        });
    });

    test('should call backend and handle error', async (done) => {
      // Arrange
      const actions: ActionTree<I18nState, I18nState> = createActions<I18nState>({ baseUrl: '/', i18n } as I18nModuleConfig);
      const commit = jest.fn();
      const ietfTag = 'de-DE';

      const responseError: Error = {
        message: 'message',
        name: 'name'
      };
      axios.get = jest.fn(() => Promise.reject(responseError));

      // Act
      (actions[ActionTypes.getLocaleTranslations] as Function)({ commit }, { ietfTag })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('/i18n/GetIetfTranslations/de-DE');
          expect(commit).toHaveBeenCalledTimes(2);
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'message',
              name: 'name'
            }
          });
          done();
        });
    });
  });
});
