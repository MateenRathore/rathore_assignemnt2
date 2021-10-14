const mysql = require('mysql');
const connection = mysql.createConnection({
    host:"localhost",
    database:"pd_db",
    user:"root",
    password:"root"
})

module.exports = connection;