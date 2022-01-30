import mysql from "mysql2/promise";

import { connectionSettings } from "../settings";

export default async () => {
  //connecting to mysql server using usr from ../setting.js
  const conn = await mysql.createConnection(connectionSettings);
  try {
    await conn.execute(`
        SELECT *
        FROM test_table
      `);
  } catch (error) {
    // If table does not exist, create it
    if (error.errno === 1146) {
      console.log("Initializing table: test_table");
      await conn.execute(`
        CREATE TABLE test_table (
          id int UNSIGNED NOT NULL AUTO_INCREMENT,
          field_1 varchar(255) NOT NULL,
          field_2 int,
          PRIMARY KEY (id)
        )
      `);
      console.log("...success!");
    }
  }
  try {
    await conn.execute(`
        SELECT *
        FROM todos
      `);
  } catch (error) {
    // If table does not exist, create it
    if (error.errno === 1146) {
      console.log("Initializing table: todos");
      await conn.execute(`
          CREATE TABLE todos (
            id serial primary key,
            device_id varchar(100),
            date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            data json
          )
        `);
      console.log("...success!");
    }
  }
};
