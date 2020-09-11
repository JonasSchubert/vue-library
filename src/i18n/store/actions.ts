import axios, { AxiosResponse } from 'axios';
import { ActionTree } from 'vuex';
import { ActionLoadPayload, I18nModuleConfig, I18nState } from '../models';
import { ActionTypes, MutationTypes, RouteTypes } from './types';

export const createActions = <T>({ baseUrl, i18n, token }: I18nModuleConfig): ActionTree<I18nState, T> => ({
  [ActionTypes.getAllTranslations]({ commit }): Promise<any> {
    commit(MutationTypes.setError, { error: undefined });

    return new Promise((resolve) => {
      axios.get<any>(`${baseUrl}${RouteTypes.getAllTranslations}${token ? `/${token}` : ""}`)
        .then((response: AxiosResponse<any>) => {
          if (response.data && !!Object.keys(response.data).length) {
            commit(MutationTypes.setLocales, { locales: response.data });
          } else {
            const error: Error = {
              name: 'EmptyI18nAllTranslationsResponse',
              message: 'Found no translations'
            };
            commit(MutationTypes.setError, { error });
          }
        })
        .catch((error: Error) => commit(MutationTypes.setError, { error }))
        .finally(() => resolve());
    });
  },
  [ActionTypes.getAvailableLocales]({ commit, dispatch }): Promise<string[]> {
    commit(MutationTypes.setError, { error: undefined });

    return new Promise((resolve) => {
      axios.get<string[]>(`${baseUrl}${RouteTypes.getAvailableLocales}${token ? `/${token}` : ""}`)
        .then((response: AxiosResponse<string[]>) => {
          const availableLocales: string[] = response.data;
          if (availableLocales?.length) {
            commit(MutationTypes.setAvailableLocales, { availableLocales });
            if (!availableLocales.includes(i18n.locale)) {
              commit(MutationTypes.setCurrentLocale, { currentLocale: availableLocales[0] });
              dispatch(ActionTypes.getLocaleTranslations, { ietfTag: availableLocales[0] });
            } else {
              dispatch(ActionTypes.getLocaleTranslations, { ietfTag: i18n.locale });
            }
          } else {
            const error: Error = {
              name: 'EmptyI18nAvailableLocalesResponse',
              message: 'Found no available locales'
            };
            commit(MutationTypes.setError, { error });
          }
        })
        .catch((error: Error) => commit(MutationTypes.setError, { error }))
        .finally(() => resolve());
    });
  },
  [ActionTypes.getLocaleTranslations]({ commit }, { ietfTag }: ActionLoadPayload): Promise<any> {
    commit(MutationTypes.setError, { error: undefined });

    return new Promise((resolve) => {
      axios.get<any>(`${baseUrl}${RouteTypes.getLocaleTranslations}${token ? `/${token}` : ""}/${ietfTag}`)
        .then((response: AxiosResponse<any>) => {
          if (response.data && !!Object.keys(response.data).length) {
            commit(MutationTypes.updateLocales, { locale: ietfTag, translations: response.data });
            commit(MutationTypes.setCurrentLocale, { currentLocale: ietfTag });
          } else {
            const error: Error = {
              name: 'EmptyI18nLocaleTranslationsResponse',
              message: `Found no translations for ${ietfTag}`
            };
            commit(MutationTypes.setError, { error });
          }
        })
        .catch((error: Error) => commit(MutationTypes.setError, { error }))
        .finally(() => resolve());
    });
  }
});
