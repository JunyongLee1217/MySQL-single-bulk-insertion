const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const adminRoutes = require('./routes/admin');
const db = require('./util/database');

//app.set('view engine', 'ejs');



app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: false}));


app.use(adminRoutes);



app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});



app.listen(3000);
