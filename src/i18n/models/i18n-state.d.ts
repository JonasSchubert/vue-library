import { LocaleMessages } from 'vue-i18n';

export interface I18nState {
  availableLocales: string[];
  currentLocale: string;
  error?: Error;
  locales: LocaleMessages;
}
