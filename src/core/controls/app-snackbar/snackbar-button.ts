import { GaColor } from '../../types';

export interface SnackbarButton {
  callback: Function;
  color: GaColor;
  text: string;
}
