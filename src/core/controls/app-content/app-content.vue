<template>
  <v-content>
    <v-container class="fill-height pa-0" fluid>
      <v-row align="center" class="fill-height" justify="center">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-row>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "app-content"
})
export default class AppContent extends Vue {}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
