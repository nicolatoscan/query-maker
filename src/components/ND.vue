<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea v-model="columns" label="Columns" :rows="10" hide-details />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="key" label="Key Column" hide-details />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="table" label="Table" hide-details />
        </v-col>
        <v-col cols="6" md="12">
          <v-btn color="primary" block @click="nd()">Generate ND</v-btn>
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
import { Column, mapTypes, getColumnsAndTypesx } from '@/misc/types'

const columns = ref('');
const key = ref('');
const table = ref('');
const result = ref('');

const emit = defineEmits<{
  (e: 'copy', str: string): void
}>()

function queryND(columns: Column[], table: string, key: string): string {
  return `SET IDENTITY_INSERT ${table} ON;\n` +
    `IF NOT EXISTS(SELECT ${key} FROM ${table} WHERE ${key} = 0)\n` +
    `BEGIN INSERT INTO ${table}(\n` +
      columns.map(f => `\t${f.name}`).join(',\n') +
    `\n) VALUES (\n` +
      columns.map(f => `\t${mapTypes(f.type, true)}`).join(',\n') +
    `\n) END;\n` +
    `SET IDENTITY_INSERT ${table} OFF;`;
}

function nd() {
  const res = queryND(getColumnsAndTypesx(columns.value), table.value, key.value);
  result.value = res;
  emit('copy', res);
}

</script>
