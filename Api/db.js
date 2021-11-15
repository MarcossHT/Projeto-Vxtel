const mysql = require("mysql2/promise")

async function connect() {
    if(global.connection && global.connection.state !== 'disconnected') {
        return global.connection
    }
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'vxtell',
        password : 'k93521'
      });
    
    console.log("Conectou ao MySQL!")
    global.connection = connection
    return connection
}

async function selectTarifas() {
    const conn = await connect()
    const [rows] = await conn.query('Select * from tarifas;')
    return rows
}


async function selectPlanos() {
    const conn = await connect()
    const [rows] = await conn.query('Select * from planos;')
    return rows
}

module.exports = {selectTarifas, selectPlanos}