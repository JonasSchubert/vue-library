import { AxiosStatic } from 'axios';
import { Store } from 'vuex';
import { BaseState } from '@/core/models';
import { MutationTypes } from '@/core/store/types';

declare module 'vue/types/vue' {
  interface VueConstructor {
    $http: AxiosStatic;
  }
}

interface AxiosPluginOptions<T extends BaseState> {
  axios: AxiosStatic;
  store: Store<T>;
}

interface AxiosPlugin {
  install: Function;
}

export const createAxiosPlugin = <T extends BaseState>(baseUrl: string): AxiosPlugin => ({
  install(Vue: any, { axios, store }: AxiosPluginOptions<T>): void {
    // eslint-disable-next-line no-param-reassign
    axios.defaults.baseURL = baseUrl;

    axios.interceptors.request.use((config) => {
      store.commit(MutationTypes.increaseRequests);
      return config;
    }, (error) => {
      // TODO check if decreasing is valid here
      store.commit(MutationTypes.decreaseRequests);
      return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
      // TODO
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      store.commit(MutationTypes.decreaseRequests);
      return response;
    }, (error) => {
      // TODO
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      store.commit(MutationTypes.decreaseRequests);
      return Promise.reject(error);
    });

    // eslint-disable-next-line no-param-reassign
    Vue.$http = axios;
  }
});
