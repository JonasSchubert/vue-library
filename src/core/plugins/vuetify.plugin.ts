import Vue from 'vue';
import Vuetify from 'vuetify';
import { Ripple } from 'vuetify/lib/directives';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  directives: {
    Ripple
  }
});

export const isDarkTheme = true;

export default new Vuetify({
  theme: {
    dark: isDarkTheme
  }
});
