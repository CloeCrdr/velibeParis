import * as mysql from "mysql";

const connectionBdd: mysql.Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "velibparis",
  port: 3306
});

export default connectionBdd;