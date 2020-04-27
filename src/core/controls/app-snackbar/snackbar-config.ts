import { SnackbarButton } from './snackbar-button';

export interface SnackbarConfig {
  btn?: SnackbarButton;
  color?: string;
  icon?: string;
  iconColor?: string;
  message: string;
  messageParams?: string[];
  multiLine?: boolean;
  timeout?: number;
  translate?: boolean;
  vertical?: boolean;
}
