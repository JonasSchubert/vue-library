<template>
  <v-card :flat="flat" style="text-align: center">
    <v-card-text>
      <v-btn
        :color="color"
        :disabled="!loaded"
        @click.native="playing ? pause() : play()"
        class="ma-2"
        icon
        outlined
        ripple
      >
        <v-icon v-if="!playing || paused">mdi-play</v-icon>
        <v-icon v-else>mdi-pause</v-icon>
      </v-btn>

      <v-btn
        :color="color"
        :disabled="!loaded"
        @click.native="stop()"
        class="ma-2"
        icon
        outlined
        ripple
      >
        <v-icon>mdi-stop</v-icon>
      </v-btn>

      <v-btn
        :color="color"
        :disabled="!loaded"
        @click.native="mute()"
        class="ma-2"
        icon
        outlined
        ripple
      >
        <v-icon v-if="!isMuted">mdi-volume-high</v-icon>
        <v-icon v-else>mdi-volume-mute</v-icon>
      </v-btn>

      <v-btn
        :color="color"
        @click.native="loaded ? download() : reload()"
        class="ma-2"
        icon
        outlined
        ripple
        v-if="!loaded"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-btn
        :color="color"
        @click.native="loaded ? download() : reload()"
        class="ma-2"
        icon
        outlined
        ripple
        v-if="loaded && downloadable"
      >
        <v-icon>mdi-download</v-icon>
      </v-btn>

      <v-progress-linear
        :disabled="!loaded"
        @click.native="setPosition()"
        class="mb-4 mt-4"
        height="5"
        v-model="percentage"
      ></v-progress-linear>
      <p>{{ currentTime }} / {{ duration }}</p>
    </v-card-text>

    <audio
      :src="file"
      id="player"
      ref="player"
      v-on:ended="ended"
      v-on:canplay="canPlay"
    ></audio>
  </v-card>
</template>

<script lang="ts">
// Inspired by https://github.com/wilsonwu/vuetify-audio/blob/master/src/vuetifyaudio.vue

import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

const formatTime = (second: number): string => new Date(second * 1000).toISOString().substr(11, 8);

@Component({
  name: "audio-player",
})
export default class AudioPlayer extends Vue {
  @Prop({ default: false, required: false, type: Boolean })
  autoPlay!: boolean;

  @Prop({ default: (): boolean => true, required: false, type: Function })
  canPlay!: boolean;

  @Prop({ default: undefined, required: true, type: String })
  color!: string;

  @Prop({ default: false, required: false, type: Boolean })
  downloadable!: boolean;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Prop({ default: (): void => {}, required: false, type: Function })
  ended!: boolean;

  @Prop({ default: undefined, required: true, type: String })
  file!: string;

  @Prop({ default: false, required: false, type: Boolean })
  flat!: boolean;

  get duration(): string {
    return this.audio ? formatTime(this.totalDuration) : "";
  }

  audio: HTMLAudioElement = {} as HTMLAudioElement;

  currentTime = "00:00:00";

  firstPlay = true;

  isMuted = false;

  loaded = false;

  paused = false;

  percentage = 0;

  playing = false;

  totalDuration = 0;

  mounted(): void {
    this.audio = this.$refs.player as HTMLAudioElement;
    this.audio.addEventListener("timeupdate", this.handlePlayingUI);
    this.audio.addEventListener("loadeddata", this.handleLoaded);
    this.audio.addEventListener("pause", this.handlePlayPause);
    this.audio.addEventListener("play", this.handlePlayPause);
    this.audio.addEventListener("ended", this.handleEnded);
  }

  beforeDestroy(): void {
    this.audio.removeEventListener("timeupdate", this.handlePlayingUI);
    this.audio.removeEventListener("loadeddata", this.handleLoaded);
    this.audio.removeEventListener("pause", this.handlePlayPause);
    this.audio.removeEventListener("play", this.handlePlayPause);
    this.audio.removeEventListener("ended", this.handleEnded);
  }

  public download(): void {
    this.audio.pause();
    window.open(this.file, "download");
  }

  public mute(): void {
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    this.audio.volume = this.isMuted ? 0 : 1;
  }

  public pause(): void {
    this.paused = !this.paused;
    if (this.paused) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }

  public play(): void {
    if (this.playing) return;
    this.audio.play().then(() => { this.playing = true; });
    this.paused = false;
  }

  public reload(): void {
    this.audio.load();
  }

  public setPosition(): void {
    this.audio.currentTime = (this.audio.duration / 100) * this.percentage;
  }

  public stop(): void {
    this.audio.pause();
    this.paused = true;
    this.playing = false;
    this.audio.currentTime = 0;
  }

  private handleEnded(): void {
    this.paused = false;
    this.playing = false;
  }

  private handleLoaded(): void {
    if (this.audio.readyState >= 2) {
      if (this.audio.duration === Infinity) {
        // Fix duration for streamed audio source or blob based
        // https://stackoverflow.com/questions/38443084/how-can-i-add-predefined-length-to-audio-recorded-from-mediarecorder-in-chrome/39971175#39971175
        this.audio.currentTime = 1e101;
        this.audio.ontimeupdate = (): void => {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          this.audio.ontimeupdate = (): void => {};
          this.audio.currentTime = 0;
          this.totalDuration = this.audio.duration;
          this.loaded = true;
        };
      } else {
        this.totalDuration = this.audio.duration;
        this.loaded = true;
      }

      if (this.autoPlay) {
        this.audio.play();
      }
    } else {
      throw new Error("Failed to load sound file");
    }
  }

  private handlePlayingUI(): void {
    this.percentage = (this.audio.currentTime / this.audio.duration) * 100;
    this.currentTime = formatTime(this.audio.currentTime);
    this.playing = true;
  }

  private handlePlayPause(event: Event): void {
    if (event.type === "play" && this.firstPlay) {
      this.audio.currentTime = 0;
      if (this.firstPlay) {
        this.firstPlay = false;
      }
    }

    if (event.type === "pause" && !this.paused && !this.playing) {
      this.currentTime = "00:00:00";
    }
  }
}
</script>
