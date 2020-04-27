import { LocaleMessageObject } from 'vue-i18n';
import { I18nModuleConfig, I18nState } from '@/i18n/models';
import { createState } from '@/i18n/store/state';

describe('createState', () => {
  test('should create expected state', () => {
    // Arrange
    const applicationToken = 'token';
    const defaultLocale = 'en-GB';
    const defaultMessages: LocaleMessageObject = {
      'message': {
        'key': 'value'
      }
    };

    // Act
    const state: I18nState = createState({ applicationToken, defaultLocale, defaultMessages } as I18nModuleConfig);

    // Assert
    expect(state).toMatchObject({
      applicationToken: 'token',
      availableLocales: ['en-GB'],
      currentLocale: 'en-GB',
      error: undefined,
      locales: {
        'en-GB': {
          'message': {
            'key': 'value'
          }
        }
      }
    });
  })
});
