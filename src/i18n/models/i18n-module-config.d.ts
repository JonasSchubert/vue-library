import { IVueI18n, LocaleMessageObject } from 'vue-i18n';

export interface I18nModuleConfig {
  applicationToken: string;
  baseUrl: string;
  defaultLocale: string;
  defaultMessages: LocaleMessageObject;
  i18n: IVueI18n;
}
