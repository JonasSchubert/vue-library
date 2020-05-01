import { shallowMount } from '@vue/test-utils';
import AppBarBtn from '@/core/controls/app-bar-btn/app-bar-btn.vue';
import vuetify from '../../../../mocks/vuetify.plugin';

// helper function that mounts and returns the rendered component
const getMountedComponent = (Component: any, propsData: any) => shallowMount(Component, {
  propsData,
  vuetify
});

describe('AppBarBtn', () => {
  test('renders correctly with different props', () => {
    // Assert
    expect(getMountedComponent(AppBarBtn, {
      dark: true, icon: 'mdi-apps', text: 'application', to: '/application'
    }).html()).toBe(`<v-btn-stub dark="true" tag="button" activeclass="" to="/application" text="true" type="button">
  <v-icon-stub>mdi-apps</v-icon-stub>
  <div class="d-sm-none d-md-flex ml-2">application</div>
</v-btn-stub>`);
    expect(getMountedComponent(AppBarBtn, {
      dark: false, icon: 'mdi-account-multiple', text: 'users', to: '/users'
    }).html()).toBe(`<v-btn-stub tag="button" activeclass="" to="/users" text="true" type="button">
  <v-icon-stub>mdi-account-multiple</v-icon-stub>
  <div class="d-sm-none d-md-flex ml-2">users</div>
</v-btn-stub>`);
  });
});
