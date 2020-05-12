<template>
  <v-card max-width="520" min-width="520" @keydown="onKeydown">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              :disabled="isLoading"
              :label="$t('message.user-name')"
              :rules="rules.userName"
              autofocus
              clearable
              prepend-icon="mdi-account"
              type="text"
              v-model="userName"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              :disabled="isLoading"
              :label="$t('message.password')"
              :rules="rules.password"
              clearable
              prepend-icon="mdi-lock-question"
              type="password"
              v-model="password"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-checkbox
              :disabled="isLoading"
              :label="$t('message.save-login-data-temporary')"
              v-model="saveLoginDataTemporary"
            >
              <template v-slot:prepend>
                <v-icon>mdi-pin</v-icon>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn
              class="float-right"
              color="primary"
              text
              :disabled="!valid || isLoading"
              :loading="isLoading"
              @click="login"
            >
              <v-icon class="mr-2">mdi-login</v-icon>
              {{ $t("message.login") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { LocaleMessages } from "vue-i18n";
import { LoginData } from "../models";
import { ActionTypes, GetterTypes, ModuleType } from "../store/types";

@Component({
  name: "login",
  computed: {
    ...mapGetters(ModuleType, [GetterTypes.isLoading])
  }
})
export default class Login extends Vue {
  password = "";

  saveLoginDataTemporary = true;

  userName = "";

  valid = false;

  get rules() {
    return {
      password: [
        (value: string): boolean | string | LocaleMessages => !!value || this.$t("message.required")
      ],
      userName: [
        (value: string): boolean | string | LocaleMessages => !!value || this.$t("message.required")
      ]
    };
  }

  login(): void {
    if (this.valid) {
      const loginData: LoginData = {
        password: this.password,
        saveLoginDataTemporary: this.saveLoginDataTemporary,
        userName: this.userName
      };
      this.$store.dispatch(
        `${ModuleType}/${ActionTypes.login}`,
        loginData
      );
    }
  }

  onKeydown(keyEvent: KeyboardEvent): void {
    if (keyEvent.code === "Enter") {
      this.login();
    }
  }
}
</script>
