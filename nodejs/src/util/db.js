const mysql = require("mysql");
const util = require("util");
const db = mysql.createConnection({
  host: "bkrdefp2vqlzenurj5yw-mysql.services.clever-cloud.com",
  user: "u3kgy2cmh3p8x3un",
  password: "QPGkWtpxfYTBSeblI8Sy",
  database: "bkrdefp2vqlzenurj5yw",
  port: "3306",
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "ecommerce",
  // port: "3306",
});

// promise wrapper to enable async await with mysql
db.query = util.promisify(db.query).bind(db);
module.exports = db;
