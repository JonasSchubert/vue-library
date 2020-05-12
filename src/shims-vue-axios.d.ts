import { AxiosStatic } from 'axios';

declare module 'vue/types/vue' {
  interface VueConstructor {
    $http: AxiosStatic;
  }
}
