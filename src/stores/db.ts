import { defineStore } from 'pinia'
// import { computed, ref } from 'vue'
// import sql, { ConnectionPool } from 'mssql'

// type SQLConfig = {
//   server: string,
//   user: string,
//   password: string,
//   database: string
// }

export const useDbStore = defineStore('db', () => {

  // let connection: ConnectionPool | null = null;

  // async function connect(config: SQLConfig): Promise<boolean> {
  //   try {
  //     connection = await sql.connect({
  //       server: config.server,
  //       user: config.user,
  //       password: config.password,
  //       database: config.database
  //     });
  //     return true;
  //   }
  //   catch (err) {
  //     console.log(err);
  //     return false;
  //   }
  // }

  // async function getTables(): Promise<string[]> {
  //   if (!connection) {
  //     return [];
  //   }
  //   const request = connection.request();
  //   const res = await request.query('SELECT * FROM INFORMATION_SCHEMA.TABLES');
  //   return res.recordset.map(r => r.TABLE_NAME as string)
  // }
  
  // return { connect }
})