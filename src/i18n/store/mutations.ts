import { LocaleMessageObject, LocaleMessages } from 'vue-i18n';
import { MutationTree } from 'vuex';
import { I18nModuleConfig, I18nState } from '../models';
import { MutationTypes } from './types';

export const createMutations = ({ i18n }: I18nModuleConfig): MutationTree<I18nState> => ({
  [MutationTypes.setAvailableLocales]: (state: I18nState, { availableLocales }: { availableLocales: string[] }): void => {
    state.availableLocales = availableLocales;
  },
  [MutationTypes.setCurrentLocale]: (state: I18nState, { currentLocale }: { currentLocale: string }): void => {
    state.currentLocale = currentLocale;
    i18n.locale = currentLocale;
  },
  [MutationTypes.setError]: (state: I18nState, { error }: { error: Error | undefined }): void => {
    state.error = error;
  },
  [MutationTypes.setLocales]: (state: I18nState, { locales }: { locales: LocaleMessages }): void => {
    state.locales = locales;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (i18n as any).messages = locales;
  },
  [MutationTypes.updateLocales]: (state: I18nState, { locale, translations }: { locale: string; translations: LocaleMessageObject }): void => {
    state.locales[locale] = translations;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (i18n as any).setLocaleMessage(locale, translations);
  }
});
