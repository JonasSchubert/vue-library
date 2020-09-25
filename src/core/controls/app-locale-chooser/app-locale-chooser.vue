<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn class="subtitle-1" ripple text v-on="on">
        <v-icon>mdi-translate</v-icon>
        <div class="d-none d-sm-flex mx-2">{{ $t(`message.${$i18n.locale}`) }}</div>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group v-model="locale">
        <v-list-item ripple v-for="(item, index) in availableLocales" :key="`Locale_${item}_${index}`">
          <v-list-item-title>{{ `${$t(`message.${item}`)} (${$t(`message.${item}-native`)})` }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import {
  ActionTypes as I18nActionTypes,
  MutationTypes as I18nMutationTypes
} from "../../../i18n/store/types";

@Component({
  name: "app-locale-chooser"
})
export default class AppLocaleChooser extends Vue {
  get availableLocales(): any {
    return this.$store.state.i18n.availableLocales;
  }

  get locale(): number {
    return this.availableLocales.findIndex((locale: string) => locale === this.$store.state.i18n.currentLocale);
  }

  set locale(value: number) {
    if (value !== undefined) {
      const selectedLocale = this.availableLocales[value];
      const availableTranslations = this.$store.state.i18n.locales;

      if (!availableTranslations[selectedLocale]) {
        this.$store.dispatch(`i18n/${I18nActionTypes.getLocaleTranslations}`, { ietfTag: selectedLocale });
      } else {
        this.$store.commit(`i18n/${I18nMutationTypes.setCurrentLocale}`, { currentLocale: selectedLocale });
      }
    }
  }
}
</script>
