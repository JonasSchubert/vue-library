export const ActionTypes = {
  getAllTranslations: 'getAllTranslations',
  getAvailableLocales: 'getAvailableLocales',
  getLocaleTranslations: 'getLocaleTranslations'
};

export const GetterTypes = {
  availableLocales: 'availableLocales',
  currentLocale: 'currentLocale',
  error: 'error',
  locales: 'locales'
};

export const MutationTypes = {
  setAvailableLocales: 'setAvailableLocales',
  setCurrentLocale: 'setCurrentLocale',
  setError: 'setError',
  setLocales: 'setLocales',
  updateLocales: 'updateLocales'
};

export const RouteTypes = {
  getAllTranslations: 'i18n/GetAllIetfTranslations',
  getAvailableLocales: 'i18n/GetAvailableIetf',
  getLocaleTranslations: 'i18n/GetIetfTranslations'
};
