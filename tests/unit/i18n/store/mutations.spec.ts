import { IVueI18n, LocaleMessageObject, LocaleMessages } from 'vue-i18n';
import { MutationTree } from 'vuex';
import { I18nModuleConfig, I18nState } from '@/i18n/models';
import { createMutations } from '@/i18n/store/mutations';
import { MutationTypes } from '@/i18n/store/types';

describe('createMutations', () => {
  let i18n: IVueI18n;
  let mutations: MutationTree<I18nState>;
  let state: I18nState;

  const availableLocales: string[] = ['de-DE', 'en-GB'];
  const currentLocale = 'en-GB';
  const locales: LocaleMessages = {
    'de-DE': {
      'message': {
        'value': 'Wert'
      }
    },
    'en-GB': {
      'message': {
        'value': 'Value'
      }
    }
  };

  beforeEach(() => {
    i18n = {
      locale: currentLocale,
      messages: locales,
      setLocaleMessage: jest.fn()
    } as unknown as IVueI18n;

    mutations = createMutations({ i18n } as I18nModuleConfig);

    state = {
      availableLocales,
      currentLocale,
      error: undefined,
      locales
    };
  });

  describe(`${MutationTypes.setAvailableLocales}`, () => {
    test('should set available locales', () => {
      // Arrange
      const newAvailableLocales = ['de-DE', 'en-GB', 'es-ES'];

      // Act
      mutations[MutationTypes.setAvailableLocales](state, { availableLocales: newAvailableLocales });

      // Assert
      expect(state.availableLocales).toMatchSnapshot(['de-DE', 'en-GB', 'es-ES']);
    });
  });

  describe(`${MutationTypes.setCurrentLocale}`, () => {
    test('should set current locale', () => {
      // Arrange
      const newCurrentLocale = 'de-DE';

      // Act
      mutations[MutationTypes.setCurrentLocale](state, { currentLocale: newCurrentLocale });

      // Assert
      expect(state.currentLocale).toBe(newCurrentLocale);
      expect(i18n.locale).toBe(newCurrentLocale);
    });
  });

  describe(`${MutationTypes.setError}`, () => {
    test('should set error', () => {
      // Arrange
      const newError: Error = {
        message: 'Message',
        name: 'Name'
      };

      // Act
      mutations[MutationTypes.setError](state, { error: newError });

      // Assert
      expect(state.error).toMatchObject(newError);
    });
  });

  describe(`${MutationTypes.setLocales}`, () => {
    test('should set set locales', () => {
      // Arrange
      const newLocales: LocaleMessages = {
        'de-DE': {
          'message': {
            'test': 'Test',
            'value': 'Wert'
          }
        },
        'en-GB': {
          'message': {
            'test': 'Test',
            'value': 'Value'
          }
        },
        'es-ES': {
          'message': {
            'test': 'Prueba',
            'value': 'valor'
          }
        }
      };

      // Act
      mutations[MutationTypes.setLocales](state, { locales: newLocales });

      // Assert
      expect(state.locales).toMatchObject({
        'de-DE': {
          'message': {
            'test': 'Test',
            'value': 'Wert'
          }
        },
        'en-GB': {
          'message': {
            'test': 'Test',
            'value': 'Value'
          }
        },
        'es-ES': {
          'message': {
            'test': 'Prueba',
            'value': 'valor'
          }
        }
      });
      /* eslint-disable @typescript-eslint/no-explicit-any */
      expect((i18n as any).messages).toMatchObject({
        'de-DE': {
          'message': {
            'test': 'Test',
            'value': 'Wert'
          }
        },
        'en-GB': {
          'message': {
            'test': 'Test',
            'value': 'Value'
          }
        },
        'es-ES': {
          'message': {
            'test': 'Prueba',
            'value': 'valor'
          }
        }
      });
      /* eslint-enable @typescript-eslint/no-explicit-any */
    });
  });

  describe(`${MutationTypes.updateLocales}`, () => {
    test('should set update locales', () => {
      // Arrange
      const locale = 'es-ES';
      const translations: LocaleMessageObject = {
        'message': {
          'value': 'valor'
        }
      };

      // Act
      mutations[MutationTypes.updateLocales](state, { locale, translations });

      // Assert
      expect(state.locales).toMatchObject({
        'de-DE': {
          'message': {
            'value': 'Wert'
          }
        },
        'en-GB': {
          'message': {
            'value': 'Value'
          }
        },
        'es-ES': {
          'message': {
            'value': 'valor'
          }
        }
      });
      /* eslint-disable @typescript-eslint/no-explicit-any */
      expect((i18n as any).setLocaleMessage).toHaveBeenCalledTimes(1);
      expect((i18n as any).setLocaleMessage).toHaveBeenCalledWith('es-ES', {
        'message': {
          'value': 'valor'
        }
      });
      /* eslint-enable @typescript-eslint/no-explicit-any */
    });
  });
});
