// Import `shallowMount` from Vue Test Utils and the component being tested
import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import Vuex, { Store } from 'vuex';
import { SnackbarConfig } from '@/core/controls/app-snackbar';
import AppSnackbar from '@/core/controls/app-snackbar/app-snackbar.vue';
import vuetify from '../../../../mocks/vuetify.plugin';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);

const i18n = new VueI18n({});
const store: Store<any> = new Store({});

// helper function that mounts and returns the rendered component
const getMountedComponent = (Component: any, propsData: any) => shallowMount(Component, {
  i18n,
  localVue,
  propsData,
  store,
  vuetify
});

// TODO Fix new communication bus mocking
xdescribe('AppSnackbar', () => {
  test('renders defined', () => {
    // Assert
    expect(getMountedComponent(AppSnackbar, {}).html()).toBe(`<v-snackbar-stub color=\"primary\" timeout=\"3000\">
  <!---->

  <v-spacer-stub></v-spacer-stub>
  <!---->
</v-snackbar-stub>`);
  });

  test('sets the correct default data when mounted', () => {
    // Assert
    const defaultData = getMountedComponent(AppSnackbar, {}).vm.$data;
    expect(defaultData.btn).toBeUndefined();
    expect(defaultData.color).toBe('primary');
    expect(defaultData.message).toBe('');
    expect(defaultData.multiLine).toBeFalsy();
    expect(defaultData.open).toBeFalsy();
    expect(defaultData.timeout).toBe(3000);
    expect(defaultData.vertical).toBeFalsy();
  });

  describe('methods', () => {
    describe('hide', () => {
      test('should reset $data to initial default value', () => {
        // Arrange
        const wrapper = getMountedComponent(AppSnackbar, {});
        wrapper.vm.$data.btn = {
          callback: () => ({}),
          color: 'primary',
          text: 'message'
        };
        wrapper.vm.$data.color = 'accent';
        wrapper.vm.$data.message = 'message';
        wrapper.vm.$data.multiLine = true;
        wrapper.vm.$data.open = true;
        wrapper.vm.$data.timeout = 0;
        wrapper.vm.$data.vertical = true;

        // Assert
        expect(wrapper.vm.$data.btn).toBeDefined();
        expect(wrapper.vm.$data.color).toBe('accent');
        expect(wrapper.vm.$data.message).toBe('message');
        expect(wrapper.vm.$data.multiLine).toBeTruthy();
        expect(wrapper.vm.$data.open).toBeTruthy();
        expect(wrapper.vm.$data.timeout).toBe(0);
        expect(wrapper.vm.$data.vertical).toBeTruthy();

        // Act
        (wrapper.vm as any).hide();

        // Assert
        expect(wrapper.vm.$data.btn).toBeUndefined();
        expect(wrapper.vm.$data.color).toBe('primary');
        expect(wrapper.vm.$data.message).toBe('');
        expect(wrapper.vm.$data.multiLine).toBeFalsy();
        expect(wrapper.vm.$data.open).toBeFalsy();
        expect(wrapper.vm.$data.timeout).toBe(3000);
        expect(wrapper.vm.$data.vertical).toBeFalsy();
      });
    });

    describe('show', () => {
      test('should set $data to provided config', () => {
        // Arrange
        jest.useFakeTimers();
        const wrapper = getMountedComponent(AppSnackbar, {});
        const config: SnackbarConfig = {
          btn: undefined,
          color: 'accent',
          message: 'message',
          multiLine: false,
          timeout: 0,
          vertical: true
        };
        (wrapper.vm as any).hide = jest.fn();

        // Act
        (wrapper.vm as any).show(config);
        jest.advanceTimersByTime(1000);

        // Assert
        expect((wrapper.vm as any).hide).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.$data.btn).toBeUndefined();
        expect(wrapper.vm.$data.color).toBe('accent');
        expect(wrapper.vm.$data.message).toBe('message');
        expect(wrapper.vm.$data.multiLine).toBeFalsy();
        expect(wrapper.vm.$data.open).toBeTruthy();
        expect(wrapper.vm.$data.timeout).toBe(0);
        expect(wrapper.vm.$data.vertical).toBeTruthy();
      });
    });
  });
});
