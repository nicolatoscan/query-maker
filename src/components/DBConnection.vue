<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="server" label="Server" hide-details/>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="database" label="Database" hide-details/>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="user" label="User" hide-details/>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="password" label="Password" type="password" hide-details/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-btn color="primary" block @click="connect()">Connect</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  c<v-snackbar :timeout="2000" color="green" v-model="connected" >Connected</v-snackbar>
  c<v-snackbar :timeout="2000" color="red" v-model="failed" >Connection Failed</v-snackbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// import { useDbStore } from '@/stores/db'

const connecting = ref(false);
const connected = ref(true);
const failed = ref(true);

const server = ref('');
const database = ref('');
const user = ref('');
const password = ref('');

async function connect() {
  // connecting.value = true;
  // const res = await connect2({
  //   server: server.value,
  //   database: database.value,
  //   user: user.value,
  //   password: password.value,
  // });
  // connecting.value = false;
  // connected.value = res;
  // failed.value = !res;

}

</script>
