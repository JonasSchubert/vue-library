import { GaColor } from '@/core/types';

export interface SnackbarButton {
  callback: Function;
  color: GaColor;
  text: string;
}
