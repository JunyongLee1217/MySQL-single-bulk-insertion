const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();
const insertionChecker = require('../util/insertionChecker');
const fs = require('fs');
const connection = require('../util/database');
const dbfunc = require('../util/dbfunction');

//const db = require('../util/database');

//  GET
router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'landing.html'));
});


router.get('/datadone', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'datadone.html'));
});



//  POST
router.post('/result', (req, res, next) => {
  console.log(req.body);

  try {
    var Filedata = fs.readFileSync(req.body.filename, 'utf8');
  } catch (err) {
    //console.error(err);
    res.send("<p>The filename is not correct!<p>    <a href='/'><button>Go back to the Main Page</button></a>");
  }

  const lines = Filedata.split(/\r?\n/);
  //console.log(lines);


  // Create Table
  //const tableName = dbfunc.createTable(req.body.filename);


  tableName = 'player';
  if (req.body.insertion == 'single') {
    //let processed = lines.split(',')
    //console.log(processed)
    console.log('Single insertion here!');
    insertionChecker.singleInsertion(lines, tableName)
  }

  // bulk loading
  else if (req.body.insertion == 'bulk') {
    console.log('Bulk Loading here!');
    insertionChecker.bulkLoading(lines, req.body.filename, tableName);
  }

  res.redirect('/datadone');
});

router.post('/drop', (req, res, next) => {
  dbfunc.dropTable('player');
  res.redirect('/datadone');
});

router.post('/inputquery', (req, res, next) => {
  //console.log(req.body.userquery);
  res.redirect('/');
  dbfunc.executeQuery(req.body.userquery);
});



module.exports = router;