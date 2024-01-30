const mysql = require('mysql');
const util = require('util');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce',
    port: "3306"
})

// promise wrapper to enable async await with mysql
db.query = util.promisify(db.query).bind(db);
module.exports = db;