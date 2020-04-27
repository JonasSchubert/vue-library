import { LocaleMessages } from 'vue-i18n';
import { GetterTree } from 'vuex';
import { I18nState } from '../models';
import { GetterTypes } from './types';

export const createGetters = <T>(): GetterTree<I18nState, T> => ({
  [GetterTypes.applicationToken]: (state: I18nState): string | undefined => state.applicationToken,
  [GetterTypes.availableLocales]: (state: I18nState): string[] => state.availableLocales,
  [GetterTypes.currentLocale]: (state: I18nState): string => state.currentLocale,
  [GetterTypes.error]: (state: I18nState): Error | undefined => state.error,
  [GetterTypes.locales]: (state: I18nState): LocaleMessages => state.locales
});
