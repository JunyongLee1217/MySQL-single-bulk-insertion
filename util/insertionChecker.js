
const dbfunc = require('../util/dbfunction');


exports.singleInsertion = (data, tableName) => {
    console.log('Single insertion:')
    //console.log(data);
    //console.log(typeof(data));
    data.forEach(element => {
        line = element.split(',')
        //console.log(line);

        // Single Insertion operation
        dbfunc.singleInsertion(line, tableName);
        

    });
    

}


exports.bulkLoading = (data, fileName, tableName) => {
    dbfunc.bulkInsertion(data, fileName, tableName);
}

