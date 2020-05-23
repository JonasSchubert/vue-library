<template>
  <v-btn text :to="to">
    <v-icon :color="iconColor()">{{ icon }}</v-icon>
    <div :style="textStyle()" class="d-sm-none d-md-flex ml-2">{{ text }}</div>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "app-bar-btn"
})
export default class AppBarBtn extends Vue {
  @Prop({ default: "", required: true })
  icon?: string;

  @Prop({ default: "", required: true })
  text?: string;

  @Prop({ default: "", required: true })
  to?: string;

  iconColor(): string {
    return this.$route.path === this.to ? "primary" : "";
  }

  textStyle(): string {
    return this.$route.path === this.to
      ? `color: ${this.$vuetify.theme.currentTheme.primary};`
      : "";
  }
}
</script>
