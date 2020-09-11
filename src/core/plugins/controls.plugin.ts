import { VueConstructor } from 'vue/types/umd';
import { controls } from '../controls';
import { dialogs } from '../dialogs';

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  install(Vue: any): void {
    controls.forEach((control: VueConstructor<Vue>) => {
      if ((control as any).extendOptions.name) {
        Vue.component((control as any).extendOptions.name, control);
      } else {
        throw new Error(`No name for control ${control}`);
      }
    });

    dialogs.forEach((dialog: VueConstructor<Vue>) => {
      if ((dialog as any).extendOptions.name) {
        Vue.component((dialog as any).extendOptions.name, dialog);
      } else {
        throw new Error(`No name for dialog ${dialog}`);
      }
    });
  }
};
