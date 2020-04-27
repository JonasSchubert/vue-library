<template>
  <div>
    <h1>
      <v-icon color="red" x-large>mdi-cancel</v-icon>
      {{ $t("message.access-denied") }}
    </h1>
    <br />
    <h3>{{ $t("message.missing-rights") }}</h3>
  </div>
</template>
