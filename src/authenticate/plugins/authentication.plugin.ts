/* eslint-disable no-underscore-dangle */

import VueRouter, { Route, RawLocation } from 'vue-router';
import { Store } from 'vuex';
import { BaseAuthenticateState } from '../models';
import { UserRole } from "../enums";
import { GetterTypes, ModuleType } from '../store/types';

interface GaHTMLElement extends HTMLElement {
  __ga_authentication_watch__: () => void;
  __ga_authentication_store__: {
    onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    style: CSSStyleDeclaration;
  } | undefined;
}

interface RouterPluginOptions<TState extends BaseAuthenticateState> {
  router: VueRouter;
  store: Store<TState>;
}

const handle = <TState extends BaseAuthenticateState>(element: GaHTMLElement, binding: any, store: Store<TState>): void => {
  const allowedUserRoles: UserRole[] = binding.value;
  const existingUserRols: UserRole[] = store.getters[`${ModuleType}/${GetterTypes.userRoles}`] ?? [];

  if (allowedUserRoles.filter((allowedUserRole: UserRole) => existingUserRols.includes(allowedUserRole)).length === 0) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    element.__ga_authentication_store__ = {
      onclick: element.onclick,
      style: element.style
    };

    element.onclick = null;
    element.style.cursor = 'not-allowed';
    element.style.display = 'none';
  } else if (element.__ga_authentication_store__) {
    element.onclick = element.__ga_authentication_store__.onclick;
    Object.assign(element.style, element.__ga_authentication_store__.style);

    // eslint-disable-next-line @typescript-eslint/camelcase
    element.__ga_authentication_store__ = undefined;
  }
};

export default {
  install<TState extends BaseAuthenticateState>(Vue: any, { router, store }: RouterPluginOptions<TState>): void {
    Vue.directive('ga-authentication', {
      bind: (element: GaHTMLElement, binding: any): void => {
        // eslint-disable-next-line @typescript-eslint/camelcase
        element.__ga_authentication_watch__ = store.watch((state: TState) => state.authenticate.data, () => handle(element, binding, store));
        handle(element, binding, store);
      },
      inserted: (element: GaHTMLElement, binding: any): void => handle(element, binding, store),
      update: (element: GaHTMLElement, binding: any): void => handle(element, binding, store),
      componentUpdated: (element: GaHTMLElement, binding: any): void => handle(element, binding, store),
      unbind: (element: GaHTMLElement): void => element.__ga_authentication_watch__ && element.__ga_authentication_watch__()
    });

    router.beforeEach((to: Route, _from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void): any => {
      const userRoles: UserRole[] = store.getters[`${ModuleType}/${GetterTypes.userRoles}`] ?? [];
      if (!!store.state.authenticate
        && !store.state.authenticate.data?.token
        && (userRoles.length === 0 || userRoles.includes(UserRole.Null))
        && to.path !== '/login') {
        next('/login');
      } else if (to.meta.needsLogin
        && to.meta.allowedUserRoles.filter((allowedUserRole: UserRole) => userRoles.includes(allowedUserRole)).length === 0) {
        next('/no-permission');
      } else {
        next();
      }
    });
  }
};
