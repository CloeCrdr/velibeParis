import * as mysql from "mysql2";

const connectionBdd: mysql.Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "velibparis",
  port: 8889,
});

export default connectionBdd;