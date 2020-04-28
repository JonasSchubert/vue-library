<template>
  <v-snackbar
    :color="color"
    :multi-line="multiLine"
    :timeout="timeout"
    :vertical="vertical"
    v-model="open"
  >
    <v-icon :color="iconColor" class="mr-1" v-if="!!icon">{{ icon }}</v-icon>
    {{ translate ? !!messageParams && messageParams.length > 0 ? $t(message, messageParams) : $t(message) : message }}
    <v-spacer />
    <v-btn
      @click="btn.callback"
      :color="btn.color"
      dark
      text
      v-if="!!btn"
    >{{ translate ? $t(btn.text) : btn.text }}</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { EventBus } from "../../bus";
import { defaultSnackbarConfig, SnackbarConfig, SnackbarEvents } from "./index";

@Component({
  name: "app-snackbar",
  data: () => ({
    ...defaultSnackbarConfig
  })
})
export default class AppSnackbar extends Vue {
  public open = false;

  mounted() {
    EventBus.$on(SnackbarEvents.hide, () => this.hide());
    EventBus.$on(SnackbarEvents.show, (config: SnackbarConfig) => this.show(config));
  }

  hide() {
    Object.assign(this.$data, {
      ...defaultSnackbarConfig,
      open: false
    });
  }

  show(config: SnackbarConfig) {
    this.hide();
    setTimeout(() => Object.assign(this.$data, {
      ...defaultSnackbarConfig,
      ...config,
      open: true
    }), 0);
  }
}
</script>
