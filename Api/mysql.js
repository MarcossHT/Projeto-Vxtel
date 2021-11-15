const mysql = require('mysql')

var pool = mysql.createPool({
    "user" : "root",
    "password" : "k93521",
    "database" : "vxtell",
    "host" : "localhost",
    "port" : 3306
})

exports.pool = pool