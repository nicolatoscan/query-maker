<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea v-model="inputQuery" label="Query" :rows="10" hide-details />
        </v-col>
        <v-col cols="6" md="6">
          <v-btn color="secondary" block @click="deparseQuery()">De-parse</v-btn>
        </v-col>
        <v-col cols="6" md="6">
          <v-btn color="primary" block @click="parseQuery()">Parse</v-btn>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea v-model="result" disabled :rows="10" hide-details />
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';


const inputQuery = ref('');
const result = ref('');

const emit = defineEmits<{
  (e: 'copy', str: string): void
}>()

function parseQuery() {
  let t = inputQuery.value;
  t = t.replace(/\r\n/g, '\\n').replace(/\n/g, '\\n').replace(/@(\w+)/g, '\'{$$$1}\'').replace(/DECLARE/g, '-- DECLARE');
  if (!t.startsWith('"'))
    t = `"${t}`;
  if (!t.endsWith('"'))
    t = `${t}"`;
  result.value = t;
  emit('copy', t);

}

function deparseQuery() {
  let t = inputQuery.value;
  if (t.startsWith('"'))
    t = t.slice(1)
  if (t.endsWith('"'))
    t = t.slice(0, -1)
  t = t.replace(/\\n/g, '\n').replace(/'{\$(\w+)}'/g, '@$1').replace(/-- DECLARE/g, 'DECLARE');
  // t = t.replace(/\\n/g, '\n').replace(/\'{\$(\w+)}'/g, '@$1').replace(/-- DECLARE/g, 'DECLARE');
  result.value = t;

  emit('copy', t);
}

</script>
