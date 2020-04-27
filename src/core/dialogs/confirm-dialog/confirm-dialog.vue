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
  public buttons: ConfirmDialogButtons = {
    confirm: {
      icon: undefined,
      iconColor: undefined,
      text: "message.confirm",
      textColor: "success"
    }
  };

  public maxWidth = 360;

  public message = "";

  public messageParams: string[] = [];

  private meta: any = undefined;

  public showDialog = false;

  public title = "";

  public translate = true;

  public cancel(): void {
    this.$emit("cancel", this.meta);
    this.showDialog = false;
  }

  public confirm(): void {
    this.$emit("confirm", this.meta);
    this.showDialog = false;
  }

  public open<T>(config: ConfirmDialogConfig<T>): void {
    this.buttons = config.buttons;
    this.maxWidth = config.maxWidth || 360;
    this.message = config.message;
    this.messageParams = config.messageParams || [];
    this.meta = config.meta;
    this.title = config.title;
    this.showDialog = true;
    this.translate = config.translate !== undefined ? config.translate : true;
  }
}
</script>
