<template>
  <v-btn class="toggle-theme" density="comfortable" :icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="toggleTheme"></v-btn>

  <v-card>
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <!-- <v-tab value="db">DB Connection</v-tab> -->
      <v-tab value="param">Parametrize</v-tab>
      <v-tab value="nd">ND</v-tab>
      <v-tab value="merge">Merge</v-tab>
      <v-tab value="union">Union</v-tab>
    </v-tabs>
    <v-window v-model="tab">

      <!-- <v-window-item value="db">
        <DBConnection />
      </v-window-item> -->

      <v-window-item value="param">
        <Parametrize @copy="$event => copy($event)" />
      </v-window-item>

      <v-window-item value="nd">
        <ND @copy="$event => copy($event)" />
      </v-window-item>

      <v-window-item value="merge">
        <Merge @copy="$event => copy($event)" />
      </v-window-item>

      <v-window-item value="union">
        <Union @copy="$event => copy($event)" />
      </v-window-item>

    </v-window>

    <v-snackbar :timeout="2000" color="green" v-model="snackbar">Copied to clipboard</v-snackbar>

  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Parametrize from '@/components/Parametrize.vue';
import DBConnection from './components/DBConnection.vue';
import ND from './components/ND.vue';
import Merge from './components/Merge.vue';
import Union from './components/Union.vue';
import { useTheme } from 'vuetify'

const tab = ref('param')

const snackbar = ref(false);
async function copy(str: string) {
  await navigator.clipboard.writeText(str);
  snackbar.value = true;
}


const theme = useTheme();
function toggleTheme() {
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark';
  theme.global.name.value = newTheme;
  localStorage.setItem('theme', newTheme)
}
</script>

<style scoped>
.toggle-theme {
  position: fixed;
  top: 0.3em;
  right: 0.3em;
  z-index: 999;
}
</style>
