import { LocaleMessages } from 'vue-i18n';
import { GetterTree } from 'vuex';
import { I18nState } from '@/i18n/models';
import { createGetters } from '@/i18n/store/getters';
import { GetterTypes } from '@/i18n/store/types';

describe('createGetters', () => {
  let state: I18nState;

  const availableLocales: string[] = ['de-DE', 'en-GB'];
  const currentLocale = 'en-GB';
  const error: Error = {
    message: 'Message',
    name: 'Name'
  };
  const locales: LocaleMessages = {
    'en-GB': {
      'message': {
        'key': 'value'
      }
    }
  };

  const getters: GetterTree<I18nState, I18nState> = createGetters<I18nState>();

  beforeEach(() => {
    state = {
      availableLocales,
      currentLocale,
      error,
      locales
    };
  });

  describe(`${GetterTypes.availableLocales}`, () => {
    test('should return availableLocales as expected', () => {
      // Arrange & Act
      const actual = getters[GetterTypes.availableLocales](state, getters, state, {});

      // Assert
      expect(actual).toMatchObject(availableLocales);
    });
  });

  describe(`${GetterTypes.currentLocale}`, () => {
    test('should return currentLocale as expected', () => {
      // Arrange & Act
      const actual = getters[GetterTypes.currentLocale](state, getters, state, {});

      // Assert
      expect(actual).toBe(currentLocale);
    });
  });

  describe(`${GetterTypes.error}`, () => {
    test('should return error as expected', () => {
      // Arrange & Act
      const actual = getters[GetterTypes.error](state, getters, state, {});

      // Assert
      expect(actual).toMatchObject(error);
    });
  });

  describe(`${GetterTypes.locales}`, () => {
    test('should return locales as expected', () => {
      // Arrange & Act
      const actual = getters[GetterTypes.locales](state, getters, state, {});

      // Assert
      expect(actual).toMatchObject(locales);
    });
  });
});
