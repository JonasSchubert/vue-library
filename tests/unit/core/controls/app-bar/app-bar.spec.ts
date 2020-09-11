/* eslint-disable max-len */
import { shallowMount } from '@vue/test-utils';
import AppBar from '@/core/controls/app-bar/app-bar.vue';
import vuetify from '../../../../mocks/vuetify.plugin';

// helper function that mounts and returns the rendered component
const getMountedComponent = (Component: any, propsData: any) => shallowMount(Component, {
  propsData,
  vuetify
});

describe('AppBar', () => {
  test('renders correctly with different props', () => {
    // Assert
    expect(getMountedComponent(AppBar, { isAnythingLoading: true }).html()).toBe(`<v-app-bar-stub elevation="2" tag="header" dense="true" extensionheight="48" src="" value="true" app="true" clippedleft="true" clippedright="true">
  <v-spacer-stub></v-spacer-stub>
  <app-locale-chooser></app-locale-chooser>
  <v-progress-linear-stub color="accent" absolute="true" bottom="true" value="0" active="true" buffervalue="100" height="4" indeterminate="true"></v-progress-linear-stub>
</v-app-bar-stub>`);
    expect(getMountedComponent(AppBar, { isAnythingLoading: false }).html()).toBe(`<v-app-bar-stub elevation="2" tag=\"header\" dense=\"true\" extensionheight=\"48\" src=\"\" value=\"true\" app=\"true\" clippedleft="true" clippedright="true">
  <v-spacer-stub></v-spacer-stub>
  <app-locale-chooser></app-locale-chooser>
  <v-progress-linear-stub color=\"accent\" absolute=\"true\" bottom=\"true\" value=\"0\" buffervalue=\"100\" height=\"4\"></v-progress-linear-stub>
</v-app-bar-stub>`);
  });
});
