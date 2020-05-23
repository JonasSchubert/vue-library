<template>
  <v-app-bar app clipped-left clipped-right dense elevation="2">
    <slot />

    <v-spacer v-if="!hideSpacer" />

    <app-locale-chooser />

    <v-progress-linear
      :active="isAnythingLoading"
      :indeterminate="isAnythingLoading"
      absolute
      bottom
      color="accent"
    ></v-progress-linear>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "app-bar"
})
export default class AppBar extends Vue {
  @Prop({ default: false, required: true })
  isAnythingLoading!: boolean;

  @Prop({ default: false, required: false })
  hideSpacer!: boolean;
}
</script>
