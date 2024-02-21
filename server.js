const express = require("express");
const app = express();
require("dotenv").config();
const mysql = require("mysql2/promise");

const NODE_PORT = 8000;
const name = process.env.NAME;
const mysqlport = process.env.MYSQL_PORT;
const hostName = process.env.HOST_NAME

const pool = mysql.createPool({
  host: hostName || "localhost",
  user: "subash",
  port: mysqlport || 3307,
  password: "password",
  database: "db_test",
});

app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.send("Hello world from nodejs\n");
// });

app.get("/name", (req, res) => {
  res.send(`Hello ${name}\n`);
});

app.get("/run-mysql-command", async (req, res) => {
  let command = req.query.command;
  //console.log('command', command)
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`${command}`);
    res.send(rows);
  } catch (err) {
    res.send(err);
  }
});

app.listen(NODE_PORT, () => {
  console.log("env passes in this app: (name,mysqlport,hostName)",name,mysqlport,hostName)
  console.log(`Server is running at http://localhost:${NODE_PORT}`);
});
