// Import `shallowMount` from Vue Test Utils and the component being tested
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { shallowMount } from '@vue/test-utils';
import { SnackbarConfig } from '@/core/controls/app-snackbar';
import vuetify from '@/core/plugins/vuetify.plugin';
import AppSnackbar from '@/core/controls/app-snackbar/app-snackbar.vue';

Vue.use(VueI18n);
const i18n: VueI18n = new VueI18n({});

// Mount the component
const wrapper = shallowMount(AppSnackbar, {
  i18n,
  vuetify
});

describe('AppSnackbar', () => {
  test('sets the correct default data when mounted', () => {
    // Assert
    const defaultData = wrapper.vm.$data;
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
