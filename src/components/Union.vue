<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-textarea v-model="columnsA" label="Columns A" :rows="10" hide-details />
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea v-model="columnsB" label="Columns B" :rows="10" hide-details />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="tableA" label="Table A" hide-details />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="tableB" label="Table B" hide-details />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field v-model="key" label="Key Column" hide-details />
        </v-col>
        <v-col cols="6" md="12">
          <v-btn color="primary" block @click="merge()">Union</v-btn>
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

const columnsA = ref('');
const columnsB = ref('');
const tableA = ref('');
const tableB = ref('');
const key = ref('');
const result = ref('');

const emit = defineEmits<{
  (e: 'copy', str: string): void
}>()

function queryUnion(columnsA: Column[], columnsB: Column[], tableA: string, tableB: string, key: string): string {
  const allFields  =  [ ...new Set([...columnsA, ...columnsB]) ];
  const allNames  = allFields.map(f => f.name);
  const namesA = columnsA.map(f => f.name);
  const namesB = columnsB.map(f => f.name);
  return `SELECT\n` +
    allFields.map(f => `\t${mapTypes(f.type, true)} AS ${f.name}`).join(',\n') +
    `\n\nUNION ALL\n\n` +
    `SELECT\n` +
    allNames.map(n => namesA.includes(n) ? `\t${n}` : `\tNULL AS ${n}`).join(',\n') +
    `\nFROM ${tableA}\n` +
    `WHERE ${key} <> 0\n` +
    `\nUNION ALL\n\n` +
    `SELECT\n` +
    allNames.map(n => namesB.includes(n) ? `\t${n}` : `\tNULL AS ${n}`).join(',\n') +
    `\nFROM ${tableB}\n` +
    `WHERE ${key} <> 0\n`;
}

function merge() {
  const res = queryUnion(
    getColumnsAndTypesx(columnsA.value),
    getColumnsAndTypesx(columnsB.value),
    tableA.value, tableB.value, key.value);
  result.value = res;
  emit('copy', res);
}


</script>
