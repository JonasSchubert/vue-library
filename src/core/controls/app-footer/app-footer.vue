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

    <div class="d-flex">
      <div>{{ version }}</div>
      <div class="d-none d-sm-flex ml-1">({{ libVersion }})</div>
    </div>
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

  get isDarkTheme(): boolean {
    return this.$store.getters[`${LocaleStorageModuleType}/${LocaleStorageGetterTypes.isDarkTheme}`];
  }

  set isDarkTheme(value: boolean) {
    this.$store.dispatch(`${LocaleStorageModuleType}/${LocaleStorageActionTypes.updateIsDarkTheme}`, { isDarkTheme: value });
  }
}
</script>
