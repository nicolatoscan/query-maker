<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea v-model="columns" label="Columns" :rows="10" hide-details />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field v-model="extkey" label="ExtKey Column" hide-details />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="tableFrom" label="Table From" hide-details />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="tableTo" label="Table To" hide-details />
        </v-col>
        <v-col cols="6" md="12">
          <v-btn color="primary" block @click="merge()">Merge</v-btn>
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
const extkey = ref('');
const tableFrom = ref('');
const tableTo = ref('');
const result = ref('');

const emit = defineEmits<{
  (e: 'copy', str: string): void
}>()

function queryMerge(columns: Column[], extKey: string, tableFrom: string, tableTo: string): string {
  const lastUpdateDtField: Column = { name: 'LastUpdateDt', type: 'datetime' };
  const extKeyField: Column = { name: extKey, type: 'string' };

  const res = `MERGE ${tableFrom} AS MyTarget USING (\n` + 
  `SELECT \n` +
    [lastUpdateDtField, extKeyField, ...columns].map(c => `\t${c.name}`).join(',\n') +
  `\n\tFROM ${tableTo}` +
  `\n) AS MySource ON MyTarget.${extKey} = MySource.${extKey} WHEN MATCHED AND NOT (\n` +
  columns.map(c => `\tMySource.${c.name} = ISNULL(MyTarget.${c.name},${mapTypes(c.type)})`).join(' AND\n') +
  `\n) THEN UPDATE SET\n` +
  [lastUpdateDtField, ...columns].map(c => `\tMyTarget.${c.name} = MySource.${c.name}`).join(',\n') +
  ';'

  return res;
}

function merge() {
  const res = queryMerge(getColumnsAndTypesx(columns.value), extkey.value, tableFrom.value, tableTo.value);
  result.value = res;
  emit('copy', res);
}


</script>
