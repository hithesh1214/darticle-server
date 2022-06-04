const mysql = require("mysql");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "newuser",
  password: "password",
  database: "darticle",
  insecureAuth: true,
});
module.exports = { db };
