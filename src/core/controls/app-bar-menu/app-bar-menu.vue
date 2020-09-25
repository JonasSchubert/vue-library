<template>
  <v-menu bottom close-on-click offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-icon :color="iconColorMain()">{{ icon }}</v-icon>
        <div :style="textStyleMain()" class="d-none d-sm-flex ml-2">{{ text }}</div>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        :key="`Entry_${index}_${entry.text}`"
        :to="entry.to"
        v-for="(entry, index) in entries"
      >
        <v-list-item-icon>
          <v-icon :color="iconColor(entry)">{{ entry.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title :style="textStyle(entry)">{{ entry.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

interface MenuEntry {
  icon: string;
  text: string;
  to: string;
}

@Component({
  name: "app-bar-menu"
})
export default class AppBarBtn extends Vue {
  @Prop({ default: (): MenuEntry[] => [], required: true })
  entries?: MenuEntry[];

  @Prop({ default: "", required: true })
  icon?: string;

  @Prop({ default: "", required: true })
  text?: string;

  iconColor(menuEntry: MenuEntry): string {
    return this.$route.path === menuEntry.to ? "primary" : "";
  }

  iconColorMain(): string {
    return this.entries?.find(
      (menuEntry: MenuEntry) => this.$route.path === menuEntry.to
    )
      ? "primary"
      : "";
  }

  textStyle(menuEntry: MenuEntry): string {
    return this.$route.path === menuEntry.to
      ? `color: ${this.$vuetify.theme.currentTheme.primary};`
      : "";
  }

  textStyleMain(): string {
    return this.entries?.find(
      (menuEntry: MenuEntry) => this.$route.path === menuEntry.to
    )
      ? `color: ${this.$vuetify.theme.currentTheme.primary};`
      : "";
  }
}
</script>
