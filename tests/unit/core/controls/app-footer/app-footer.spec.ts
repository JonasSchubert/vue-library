/* eslint-disable max-len */
import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueI18n, { I18nOptions } from 'vue-i18n';
import Vuex, { Store } from 'vuex';
import AppFooter from '@/core/controls/app-footer/app-footer.vue';
import vuetify from '../../../../mocks/vuetify.plugin';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);

const i18nOptions: I18nOptions = {
  getters: {
    'local-storage/isDarkTheme': true
  }
} as I18nOptions;

const i18n = new VueI18n(i18nOptions);

const store: Store<any> = new Store({
  state: { i18n: { currentLocale: 'de-DE', locales: { 'de-DE': {}, 'es-ES': {} } } }
});

// helper function that mounts and returns the rendered component
const getMountedComponent = (Component: any, propsData: any) => shallowMount(Component, {
  i18n,
  localVue,
  propsData,
  store,
  vuetify
});

describe('AppFooter', () => {
  test('renders as expected', () => {
    // Assert
    expect(getMountedComponent(AppFooter, { version: '20.09.10-0' }).html()).toBe(`<v-footer-stub color=\"secondary\" height=\"auto\" dark=\"true\" tag=\"footer\" app=\"true\" dense=\"\">
  <v-switch-stub errorcount=\"1\" errormessages=\"\" messages=\"\" rules=\"\" successmessages=\"\" value=\"\" backgroundcolor=\"\" dense=\"true\" hidedetails=\"true\" label=\"message.light-theme\" ripple=\"true\" valuecomparator=\"function deepEqual(a, b) {
          if (a === b) return true;

          if (a instanceof Date &amp;&amp; b instanceof Date) {
            // If the values are Date, they were convert to timestamp with getTime and compare it
            if (a.getTime() !== b.getTime()) return false;
          }

          if (a !== Object(a) || b !== Object(b)) {
            // If the values aren't objects, they were already checked for equality
            return false;
          }

          var props = Object.keys(a);

          if (props.length !== Object.keys(b).length) {
            // Different number of props, don't bother to check
            return false;
          }

          return props.every(function (p) {
            return deepEqual(a[p], b[p]);
          });
        }\" input-value=\"true\" class=\"mt-0\"></v-switch-stub>
  <div class="d-flex">
    <div>20.09.10-0</div>
    <div class="d-none d-sm-flex ml-1">(20.09.24-1)</div>
  </div>
</v-footer-stub>`);
  });
});
