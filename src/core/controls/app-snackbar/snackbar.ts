import { EventBus } from '@/core/bus';
import { SnackbarConfig } from './snackbar-config';
import { SnackbarEvents } from './snackbar-events.enum';
import { defaultSnackbarConfig } from './snackbar.constants';

export const snackbar = {
  error: (config: SnackbarConfig) => {
    EventBus.$emit(SnackbarEvents.show, {
      ...defaultSnackbarConfig,
      color: 'error',
      icon: 'mdi-alert-circle',
      iconColor: 'white',
      ...config
    });
  },
  hide: () => EventBus.$emit(SnackbarEvents.hide),
  info: (config: SnackbarConfig) => {
    EventBus.$emit(SnackbarEvents.show, {
      ...defaultSnackbarConfig,
      color: 'info',
      icon: 'mdi-information',
      iconColor: 'white',
      ...config
    });
  },
  open: (config: SnackbarConfig) => {
    EventBus.$emit(SnackbarEvents.show, {
      ...defaultSnackbarConfig,
      ...config
    });
  },
  success: (config: SnackbarConfig) => {
    EventBus.$emit(SnackbarEvents.show, {
      ...defaultSnackbarConfig,
      color: 'success',
      icon: 'mdi-check',
      iconColor: 'white',
      ...config
    });
  },
  warning: (config: SnackbarConfig) => {
    EventBus.$emit(SnackbarEvents.show, {
      ...defaultSnackbarConfig,
      color: 'warning',
      icon: 'mdi-alert',
      iconColor: 'white',
      ...config
    });
  }
};
