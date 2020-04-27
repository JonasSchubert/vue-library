import { LocalStorageHistory } from "./local-storage-history";
import { LocalStorageSettings } from "./local-storage-settings";

export interface LocalStorageState {
  history: LocalStorageHistory;
  settings: LocalStorageSettings;
}
