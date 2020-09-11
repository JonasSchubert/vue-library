import { I18nModuleConfig, I18nState } from '../models';

export const createState = ({ defaultLocale, defaultMessages }: I18nModuleConfig): I18nState => ({
  availableLocales: [defaultLocale],
  currentLocale: defaultLocale,
  error: undefined,
  locales: { [defaultLocale]: defaultMessages }
});
