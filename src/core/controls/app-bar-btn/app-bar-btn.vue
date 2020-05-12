<template>
  <v-btn text :to="to">
    <v-icon :color="$route.path === to ? 'primary' : ''">{{ icon }}</v-icon>
    <div :style="$route.path === to ? `color: ${$vuetify.theme.currentTheme.primary};` : ''" class="d-sm-none d-md-flex ml-2">{{ text }}</div>
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
}
</script>
