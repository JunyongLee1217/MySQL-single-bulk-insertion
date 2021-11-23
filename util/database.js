const mysql = require('mysql2');
const dbfunc = require('../util/dbfunction');
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'phase2',
//     password: '111111'
// });


const connection = mysql.createConnection({
    host: 'localhost',
    //database: 'phase2',
    user: 'root',
    password: 'Sodapop1324!'
});

connection.connect( (err) => {
    if(err) throw err;
    console.log('dbconnected!');
    connection.query('CREATE DATABASE IF NOT EXISTS phase2', (err, result) => {
        if(err) throw err;
        console.log('Database phase2 created!(IF NOT EXISTS)');
    });
})

// Create Table
//dbfunc.createTable('player.txt');





//module.exports = pool.promise();
module.exports = connection

