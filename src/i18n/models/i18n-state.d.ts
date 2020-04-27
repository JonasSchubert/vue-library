import { LocaleMessages } from 'vue-i18n';

export interface I18nState {
  applicationToken?: string;
  availableLocales: string[];
  currentLocale: string;
  error?: Error;
  locales: LocaleMessages;
}
