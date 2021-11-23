const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'phase2',
    user: 'root',
    password: 'Sodapop1324!'
});

exports.createTable = async function (tableName) {

    // Get Table name
    tableName = tableName.slice(0, -4);

    // Create Table
    connection.connect((err) => {
        console.log('Table Created!');
        var sql = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (Name varchar(64) NOT NULL, PlayerID integer NOT NULL, TeamName varchar(64) NOT NULL, Position varchar(64) NOT NULL, Touchdowns integer NOT NULL, TotalYards integer NOT NULL, Salary integer NOT NULL, primary key (PlayerID), unique(PlayerID), check (Position = \'QB\' or Position = \'RB\' or Position = \'WR\'))';
        // console.log(sql);
        connection.query(sql, (err, result) => {
            if (err) throw err;
        })
    });
}


exports.dropTable = function (tablename) {
    //Drop Table
    connection.connect((err) => {
        //console.log('Table Created!');
        var sql = 'DELETE FROM ' + tablename + ';';
        console.log(sql);

        //console.log(sql);
        connection.query(sql, (err, result) => {
            if (err) throw err;
        })

    });
}



exports.singleInsertion = function (line, tableName) {
    // Single Insertion query
    //console.log(line[0]);
    var sql = 'INSERT INTO ' + tableName + ' VALUES(' + '\'' + line[0] + '\'' + ', ' + '\'' + line[1] + '\'' + ', ' + '\'' + line[2] + '\'' + ', ' + '\'' + line[3] + '\'' + ', ' + '\'' + line[4] + '\'' + ', ' + '\'' + line[5] + '\'' + ', ' + '\'' + line[6] + '\'' + ');';
    console.log(sql);
    connection.query(sql, (err, result) => {
        if (err) throw err;
    })
}

exports.bulkInsertion = function (line, fileName, tableName) {
    const path = require('path');
    //console.log(typeof(path.dirname(__dirname)));
    const currentDir = path.dirname(__dirname);
    console.log(currentDir);

    //Bulk Insertion query
    connection.connect((err) => {

        var start = Date.now;

        //var sql = 'LOAD DATA INFILE ' + '\'' + currentDir + '\\' + fileName + '\'' + ' INTO TABLE ' + tableName + ' FIELDS TERMINATED BY' + ' \',\'' + ' OPTIONALLY ENCLOSED BY' + ' \'\"\'' + ' LINES TERMINATED BY' + '\'\r\n\' ';
        var sql = 'LOAD DATA INFILE ' + '\'' + fileName + '\'' + ' INTO TABLE ' + tableName + ' FIELDS TERMINATED BY' + ' \',\'' + ' OPTIONALLY ENCLOSED BY' + ' \'\"\'' + ' LINES TERMINATED BY' + '\'\r\n\' ';
        
        console.log(sql);
        connection.query(sql, (err, result) => {
            if (err) throw err;
        })
        var end = Date.now;
        var time = end - start;
        console.log('Execution time: ', time);
    });

}

exports.executeQuery = function (query) {
        //Bulk Insertion query
    connection.connect((err) => {

        //var sql = 'LOAD DATA INFILE ' + '\'' + currentDir + '\\' + fileName + '\'' + ' INTO TABLE ' + tableName + ' FIELDS TERMINATED BY' + ' \',\'' + ' OPTIONALLY ENCLOSED BY' + ' \'\"\'' + ' LINES TERMINATED BY' + '\'\r\n\' ';
        var sql = query;
        
        console.log("input query: ", sql);
        connection.query(sql, (err, result) => {
            if (err) throw err;
        })

    });
}