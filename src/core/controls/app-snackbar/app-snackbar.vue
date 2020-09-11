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
// eslint-disable-next-line import/named
import { snackbarCommunicationBus } from "./snackbar";
import { defaultSnackbarConfig } from "./snackbar.constants";
import { SnackbarConfig } from "./snackbar-config";
import { SnackbarEvents } from "./snackbar-events.enum";

@Component({
  name: "app-snackbar",
  data: () => ({
    ...defaultSnackbarConfig
  })
})
export default class AppSnackbar extends Vue {
  open = false;

  mounted(): void {
    snackbarCommunicationBus.subscribe(SnackbarEvents.hide, () => this.hide());
    snackbarCommunicationBus.subscribe(SnackbarEvents.show, (config: SnackbarConfig) => this.show(config));
  }

  // eslint-disable-next-line class-methods-use-this
  beforeDestroy(): void{
    snackbarCommunicationBus.unsubscribe(SnackbarEvents.hide);
    snackbarCommunicationBus.unsubscribe(SnackbarEvents.show);
  }

  hide(): void {
    Object.assign(this.$data, {
      ...defaultSnackbarConfig,
      open: false
    });
  }

  show(config: SnackbarConfig): void {
    this.hide();
    setTimeout(() => Object.assign(this.$data, {
      ...defaultSnackbarConfig,
      ...config,
      open: true
    }), 0);
  }
}
</script>
