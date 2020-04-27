import { I18nModuleConfig, I18nState } from '../models';

export const createState = ({ applicationToken, defaultLocale, defaultMessages }: I18nModuleConfig): I18nState => ({
  applicationToken,
  availableLocales: [defaultLocale],
  currentLocale: defaultLocale,
  error: undefined,
  locales: { [defaultLocale]: defaultMessages }
});
