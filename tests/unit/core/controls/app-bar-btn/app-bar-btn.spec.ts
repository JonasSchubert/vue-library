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
    expect(
      getMountedComponent(AppBarBtn, {
        dark: true,
        icon: 'mdi-apps',
        text: 'application',
        to: '/application'
      }).text()
    ).toBe('mdi-apps application');

    // Assert
    expect(
      getMountedComponent(AppBarBtn, {
        dark: true,
        icon: 'mdi-account-multiple',
        text: 'users',
        to: '/users'
      }).text()
    ).toBe('mdi-account-multiple users');
  });
});
