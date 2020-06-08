<template>
  <div class="text-center">
    <h1>
      <v-icon x-large>mdi-comment-question-outline</v-icon>
      {{ $t("message.not-found-title") }}
    </h1>
    <br />
    <h3>{{ $t("message.not-found-message") }}</h3>
    <br />
    <app-bar-btn icon="mdi-arrow-left" to="/" :text="$t('message.go-back-to-start')" />
    <br />
    <app-bar-btn icon="mdi-gamepad" to="/dinosaur-game" :text="$t('message.play-a-game')" />
  </div>
</template>
