<template>
  <v-footer app color="secondary" dark dense>
    <v-switch
      :label="$t(`message.${isDarkTheme ? 'dark-theme' : 'light-theme'}`)"
      class="mt-0"
      dense
      hide-details
      input-value="true"
      value
      v-model="isDarkTheme"
    ></v-switch>

    <slot></slot>

    <div>{{ version }} ({{ libVersion }})</div>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import {
  ActionTypes as LocaleStorageActionTypes,
  GetterTypes as LocaleStorageGetterTypes,
  ModuleType as LocaleStorageModuleType
} from "../../../local-storage/store/types";
import { version as libVersion } from "../../../version.json";

@Component({
  name: "app-footer"
})
export default class AppFooter extends Vue {
  @Prop({ default: "", required: true })
  version!: string;

  libVersion: string = libVersion;

  get isDarkTheme() {
    return this.$store.getters[
      `${LocaleStorageModuleType}/${LocaleStorageGetterTypes.isDarkTheme}`
    ];
  }

  set isDarkTheme(value) {
    this.$store.dispatch(
      `${LocaleStorageModuleType}/${LocaleStorageActionTypes.updateIsDarkTheme}`,
      { isDarkTheme: value }
    );
  }
}
</script>
