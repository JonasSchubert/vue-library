<template>
  <div class="d-flex flex-column text-center">
    <v-img src="/img/icons/msapplication-icon-144x144.png" />
    <div class="display-1 mb-4">{{ $t("message.app-name") }}</div>
    <div class="headline my-2">{{ $t("message.last-used") }}</div>
    <app-bar-btn
      v-for="route in lastRoutes"
      v-i18n-authentication="route.allowedUserRoles"
      :icon="route.icon"
      :key="`Route_${route.path}`"
      :text="$tc(route.text, 1)"
      :to="route.path"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapGetters } from "vuex";
import {
  GetterTypes as LocaleStorageGetterTypes,
  ModuleType as LocaleStorageModuleType
} from "@/local-storage/store/types";

@Component({
  name: "home",
  computed: {
    ...mapGetters(LocaleStorageModuleType, [
      LocaleStorageGetterTypes.lastRoutes
    ])
  }
})
export default class Home extends Vue {
  public lastRoutes!: any[];

  mounted() {
    if (this.lastRoutes.length === 1) {
      this.$router.push(this.lastRoutes[0].path);
    }
  }
}
</script>
