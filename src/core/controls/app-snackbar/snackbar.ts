// eslint-disable-next-line import/named
import { createCommunicationBus } from '../../bus';
import { SnackbarConfig } from './snackbar-config';
import { SnackbarEvents } from './snackbar-events.enum';
import { defaultSnackbarConfig } from './snackbar.constants';

export const snackbarCommunicationBus = createCommunicationBus();

export const snackbar = {
  error: (config: SnackbarConfig): void => {
    snackbarCommunicationBus.publish(SnackbarEvents.show, {
      ...defaultSnackbarConfig,
      color: 'error',
      icon: 'mdi-alert-circle',
      iconColor: 'white',
      ...config
    });
  },
  hide: (): void => snackbarCommunicationBus.publish(SnackbarEvents.hide),
  info: (config: SnackbarConfig): void => {
    snackbarCommunicationBus.publish(SnackbarEvents.show, {
      ...defaultSnackbarConfig,
      color: 'info',
      icon: 'mdi-information',
      iconColor: 'white',
      ...config
    });
  },
  open: (config: SnackbarConfig): void => {
    snackbarCommunicationBus.publish(SnackbarEvents.show, {
      ...defaultSnackbarConfig,
      ...config
    });
  },
  success: (config: SnackbarConfig): void => {
    snackbarCommunicationBus.publish(SnackbarEvents.show, {
      ...defaultSnackbarConfig,
      color: 'success',
      icon: 'mdi-check',
      iconColor: 'white',
      ...config
    });
  },
  warning: (config: SnackbarConfig): void => {
    snackbarCommunicationBus.publish(SnackbarEvents.show, {
      ...defaultSnackbarConfig,
      color: 'warning',
      icon: 'mdi-alert',
      iconColor: 'white',
      ...config
    });
  }
};
