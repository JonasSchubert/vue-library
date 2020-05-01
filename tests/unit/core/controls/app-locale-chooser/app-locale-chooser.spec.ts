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
    expect(getMountedComponent(AppLocaleChooser, {}).html()).toBe(`<v-menu-stub opendelay=\"0\" closedelay=\"0\" contentclass=\"\" maxwidth=\"auto\" nudgebottom=\"0\" nudgeleft=\"0\" nudgeright=\"0\" nudgetop=\"0\" nudgewidth=\"0\" openonclick=\"true\" closeonclick=\"true\" closeoncontentclick=\"true\" maxheight=\"auto\" offsety=\"true\" origin=\"top left\" transition=\"v-menu-transition\">
  <v-list-stub tag=\"div\" tile=\"true\">
    <v-list-item-group-stub value=\"0\" activeclass=\"v-item--active\">
      <v-list-item-stub activeclass=\"\" ripple=\"true\" tag=\"div\">
        <v-list-item-title-stub>message.de-DE (message.de-DE-native)</v-list-item-title-stub>
      </v-list-item-stub>
      <v-list-item-stub activeclass=\"\" ripple=\"true\" tag=\"div\">
        <v-list-item-title-stub>message.es-ES (message.es-ES-native)</v-list-item-title-stub>
      </v-list-item-stub>
    </v-list-item-group-stub>
  </v-list-stub>
</v-menu-stub>`);
  });
});
