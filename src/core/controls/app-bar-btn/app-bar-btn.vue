<template>
  <v-btn text :dark="dark" :to="to">
    <v-icon v-once>{{ icon }}</v-icon>
    <div class="d-sm-none d-md-flex ml-2">{{ text }}</div>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "app-bar-btn"
})
export default class AppBarBtn extends Vue {
  @Prop({ default: false, required: true })
  dark?: boolean;

  @Prop({ default: "", required: true })
  icon?: string;

  @Prop({ default: "", required: true })
  text?: string;

  @Prop({ default: "", required: true })
  to?: string;
}
</script>
