import Vue from 'vue';
import { SnackbarConfig } from '@/core/controls/app-snackbar/snackbar-config';
import { SnackbarEvents } from '@/core/controls/app-snackbar/snackbar-events.enum';

import { snackbar } from '@/core/controls/app-snackbar/snackbar';

jest.mock('vue');

describe('snackbar', () => {
  beforeEach(() => {
    Vue.prototype.$emit.mockReset();
  });

  describe('snackbar.error', () => {
    test('should call EventBus.$emit as expected error', () => {
      // Arrange
      const config: SnackbarConfig = { message: 'message.this-is-an-error' };

      // Act
      snackbar.error(config);

      // Assert
      expect(Vue.prototype.$emit).toHaveBeenCalledTimes(1);
      expect(Vue.prototype.$emit).toHaveBeenCalledWith(SnackbarEvents.show, {
        btn: undefined,
        color: 'error',
        icon: 'mdi-alert-circle',
        iconColor: 'white',
        message: 'message.this-is-an-error',
        messageParams: [],
        multiLine: false,
        timeout: 3000,
        translate: true,
        vertical: false
      });
    });

    test('should call EventBus.$emit as expected danger', () => {
      // Arrange
      const config: SnackbarConfig = {
        color: 'danger',
        icon: undefined,
        message: 'message.this-is-dangerous'
      };

      // Act
      snackbar.error(config);

      // Assert
      expect(Vue.prototype.$emit).toHaveBeenCalledTimes(1);
      expect(Vue.prototype.$emit).toHaveBeenCalledWith(SnackbarEvents.show, {
        btn: undefined,
        color: 'danger',
        icon: undefined,
        iconColor: 'white',
        message: 'message.this-is-dangerous',
        messageParams: [],
        multiLine: false,
        timeout: 3000,
        translate: true,
        vertical: false
      });
    });
  });

  describe('snackbar.hide', () => {
    test('should call EventBus.$emit as expected', () => {
      // Arrange && Act
      snackbar.hide();

      // Assert
      expect(Vue.prototype.$emit).toHaveBeenCalledTimes(1);
      expect(Vue.prototype.$emit).toHaveBeenCalledWith(SnackbarEvents.hide);
    });
  });

  describe('snackbar.info', () => {
    test('should call EventBus.$emit as expected info', () => {
      // Arrange
      const config: SnackbarConfig = { message: 'message.this-is-an-info' };

      // Act
      snackbar.info(config);

      // Assert
      expect(Vue.prototype.$emit).toHaveBeenCalledTimes(1);
      expect(Vue.prototype.$emit).toHaveBeenCalledWith(SnackbarEvents.show, {
        btn: undefined,
        color: 'info',
        icon: 'mdi-information',
        iconColor: 'white',
        message: 'message.this-is-an-info',
        messageParams: [],
        multiLine: false,
        timeout: 3000,
        translate: true,
        vertical: false
      });
    });

    test('should call EventBus.$emit as expected information', () => {
      // Arrange
      const config: SnackbarConfig = {
        color: 'information',
        message: 'message.this-is-an-information'
      };

      // Act
      snackbar.info(config);

      // Assert
      expect(Vue.prototype.$emit).toHaveBeenCalledTimes(1);
      expect(Vue.prototype.$emit).toHaveBeenCalledWith(SnackbarEvents.show, {
        btn: undefined,
        color: 'information',
        icon: 'mdi-information',
        iconColor: 'white',
        message: 'message.this-is-an-information',
        messageParams: [],
        multiLine: false,
        timeout: 3000,
        translate: true,
        vertical: false
      });
    });
  });

  describe('snackbar.open', () => {
    test('should call EventBus.$emit as expected', () => {
      // Arrange
      const config: SnackbarConfig = {
        color: 'accent',
        message: 'message.this-is-a-message',
        multiLine: true,
        timeout: 6000,
        vertical: true
      };

      // Act
      snackbar.open(config);

      // Assert
      expect(Vue.prototype.$emit).toHaveBeenCalledTimes(1);
      expect(Vue.prototype.$emit).toHaveBeenCalledWith(SnackbarEvents.show, {
        color: 'accent',
        icon: '',
        iconColor: 'accent',
        message: 'message.this-is-a-message',
        messageParams: [],
        multiLine: true,
        timeout: 6000,
        translate: true,
        vertical: true
      });
    });
  });

  describe('snackbar.success', () => {
    test('should call EventBus.$emit as expected success', () => {
      // Arrange
      const config: SnackbarConfig = { message: 'message.success' };

      // Act
      snackbar.success(config);

      // Assert
      expect(Vue.prototype.$emit).toHaveBeenCalledTimes(1);
      expect(Vue.prototype.$emit).toHaveBeenCalledWith(SnackbarEvents.show, {
        btn: undefined,
        color: 'success',
        icon: 'mdi-check',
        iconColor: 'white',
        message: 'message.success',
        messageParams: [],
        multiLine: false,
        timeout: 3000,
        translate: true,
        vertical: false
      });
    });

    test('should call EventBus.$emit as expected colored success', () => {
      // Arrange
      const config: SnackbarConfig = {
        color: 'green',
        message: 'message.this-is-a-colored-success'
      };

      // Act
      snackbar.success(config);

      // Assert
      expect(Vue.prototype.$emit).toHaveBeenCalledTimes(1);
      expect(Vue.prototype.$emit).toHaveBeenCalledWith(SnackbarEvents.show, {
        btn: undefined,
        color: 'green',
        icon: 'mdi-check',
        iconColor: 'white',
        message: 'message.this-is-a-colored-success',
        messageParams: [],
        multiLine: false,
        timeout: 3000,
        translate: true,
        vertical: false
      });
    });
  });

  describe('snackbar.warning', () => {
    test('should call EventBus.$emit as expected warning', () => {
      // Arrange
      const config: SnackbarConfig = { message: 'message.this-is-a-warning' };

      // Act
      snackbar.warning(config);

      // Assert
      expect(Vue.prototype.$emit).toHaveBeenCalledTimes(1);
      expect(Vue.prototype.$emit).toHaveBeenCalledWith(SnackbarEvents.show, {
        btn: undefined,
        color: 'warning',
        icon: 'mdi-alert',
        iconColor: 'white',
        message: 'message.this-is-a-warning',
        messageParams: [],
        multiLine: false,
        timeout: 3000,
        translate: true,
        vertical: false
      });
    });

    test('should call EventBus.$emit as expected colored warning', () => {
      // Arrange
      const config: SnackbarConfig = {
        color: 'warning darken-4',
        message: 'message.this-is-a-colored-warning'
      };

      // Act
      snackbar.warning(config);

      // Assert
      expect(Vue.prototype.$emit).toHaveBeenCalledTimes(1);
      expect(Vue.prototype.$emit).toHaveBeenCalledWith(SnackbarEvents.show, {
        btn: undefined,
        color: 'warning darken-4',
        icon: 'mdi-alert',
        iconColor: 'white',
        message: 'message.this-is-a-colored-warning',
        messageParams: [],
        multiLine: false,
        timeout: 3000,
        translate: true,
        vertical: false
      });
    });
  });
});
