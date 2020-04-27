import { ConfirmDialogButtons } from './confirm-dialog-buttons';

export interface ConfirmDialogConfig<T> {
  buttons: ConfirmDialogButtons;
  maxWidth?: number;
  message: string;
  messageParams?: string[];
  meta?: T;
  title: string;
  translate?: boolean;
}
