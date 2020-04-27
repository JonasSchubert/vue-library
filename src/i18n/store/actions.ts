import axios, { AxiosResponse } from 'axios';
import { IVueI18n } from 'vue-i18n';
import { ActionTree } from 'vuex';
import { ActionLoadPayload, I18nState } from '../models';
import {
  ActionTypes, GetterTypes, MutationTypes, RouteTypes
} from './types';

export const createActions = <T>(baseUrl: string, i18n: IVueI18n): ActionTree<I18nState, T> => ({
  [ActionTypes.getAllTranslations]({ commit, getters }): Promise<any> {
    const token: string = getters[GetterTypes.applicationToken];
    commit(MutationTypes.setError, { error: undefined });

    return new Promise((resolve) => {
      axios.get<any>(`${baseUrl}${RouteTypes.getAllTranslations}/${token}`)
        .then((response: AxiosResponse<any>) => {
          if (response.data && Object.keys(response.data).length > 0) {
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
  [ActionTypes.getAvailableLocales]({ commit, dispatch, getters }): Promise<string[]> {
    const token: string = getters[GetterTypes.applicationToken];
    commit(MutationTypes.setError, { error: undefined });

    return new Promise((resolve) => {
      axios.get<string[]>(`${baseUrl}${RouteTypes.getAvailableLocales}/${token}`)
        .then((response: AxiosResponse<string[]>) => {
          const availableLocales: string[] = response.data;
          if (availableLocales && availableLocales.length > 0) {
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
  [ActionTypes.getLocaleTranslations]({ commit, getters }, { ietfTag }: ActionLoadPayload): Promise<any> {
    const token: string = getters[GetterTypes.applicationToken];
    commit(MutationTypes.setError, { error: undefined });

    return new Promise((resolve) => {
      axios.get<any>(`${baseUrl}${RouteTypes.getLocaleTranslations}/${token}/${ietfTag}`)
        .then((response: AxiosResponse<any>) => {
          if (response.data && Object.keys(response.data).length > 0) {
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
