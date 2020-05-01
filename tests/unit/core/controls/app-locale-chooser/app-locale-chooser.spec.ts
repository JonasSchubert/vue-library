import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import Vuex, { Store } from 'vuex';
import AppLocaleChooser from '@/core/controls/app-locale-chooser/app-locale-chooser.vue';
import vuetify from '../../../../mocks/vuetify.plugin';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);

const i18n = new VueI18n({});

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

describe('AppLocaleChooser', () => {
  test('renders defined', () => {
    // Assert
    expect(getMountedComponent(AppLocaleChooser, {}).text()).toBe('message.de-DE (message.de-DE-native)message.es-ES (message.es-ES-native)');
  });
});
