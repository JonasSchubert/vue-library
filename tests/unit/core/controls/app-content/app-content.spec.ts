import { shallowMount } from '@vue/test-utils';
import AppContent from '@/core/controls/app-content/app-content.vue';
import vuetify from '../../../../mocks/vuetify.plugin';

// helper function that mounts and returns the rendered component
const getMountedComponent = (Component: any, propsData: any) => shallowMount(Component, {
  propsData,
  vuetify
});

describe('AppContent', () => {
  test('renders as expected', () => {
    // Assert
    expect(getMountedComponent(AppContent, {}).html()).toBe(`<v-main-stub tag=\"main\">
  <v-container-stub tag=\"div\" fluid=\"true\" class=\"fill-height pa-0\">
    <v-row-stub tag=\"div\" align=\"center\" justify=\"center\" class=\"fill-height\">
      <transition-stub name=\"fade\" mode=\"out-in\">
        <router-view></router-view>
      </transition-stub>
    </v-row-stub>
  </v-container-stub>
</v-main-stub>`);
  });
});
