<template>
  <v-dialog :max-width="maxWidth" persistent v-model="showDialog">
    <v-card>
      <v-card-title class="headline">{{ translate ? $t(title) : title }}</v-card-title>

      <v-card-text>{{ translate ? !!messageParams && messageParams.length > 0 ? $t(message, messageParams) : $t(message) : message }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel" :color="buttons.cancel.textColor" text v-if="!!buttons.cancel">
          <v-icon
            :color="buttons.cancel.iconColor"
            class="mr-1"
            v-if="!!buttons.cancel.icon"
          >{{ buttons.cancel.icon }}</v-icon>
          {{ translate ? $t(buttons.cancel.text) : buttons.cancel.text }}
        </v-btn>
        <v-btn @click="confirm" :color="buttons.confirm.textColor" text>
          <v-icon
            :color="buttons.confirm.iconColor"
            class="mr-1"
            v-if="!!buttons.confirm.icon"
          >{{ buttons.confirm.icon }}</v-icon>
          {{ translate ? $t(buttons.confirm.text) : buttons.confirm.text }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ConfirmDialogButtons, ConfirmDialogConfig } from "./index";

@Component({
  name: "confirm-dialog"
})
export default class ConfirmDialog extends Vue {
  buttons: ConfirmDialogButtons = {
    confirm: {
      icon: undefined,
      iconColor: undefined,
      text: "message.confirm",
      textColor: "success"
    }
  };

  maxWidth = 360;

  message = "";

  messageParams: string[] = [];

  showDialog = false;

  title = "";

  translate = true;

  private _meta: any = undefined;

  cancel(): void {
    this.$emit("cancel", this._meta);
    this.showDialog = false;
  }

  confirm(): void {
    this.$emit("confirm", this._meta);
    this.showDialog = false;
  }

  open<T>(config: ConfirmDialogConfig<T>): void {
    this.buttons = config.buttons;
    this.maxWidth = config.maxWidth || 360;
    this.message = config.message;
    this.messageParams = config.messageParams || [];
    this._meta = config.meta;
    this.title = config.title;
    this.showDialog = true;
    this.translate = config.translate !== undefined ? config.translate : true;
  }
}
</script>
