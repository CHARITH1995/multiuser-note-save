var express = require('express');
var app = express();
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const server = http.createServer(app);
var bodyParser = require('body-parser');
var cors = require('cors');


app.use(express.json({extended:false}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({credentials: true}));

//textFile routes
var textFileRoute = require('./routes/textFile.routes');

//db connection
const con = require('./helpers/connection/connection');
con();

//nodejs running port assignment
const PORT = process.env.PORT || 8000

app.use('/api/v1/textFile', textFileRoute);
//app.use('/', routeFile);



server.listen(PORT, () => console.log(`good to go ${PORT}`));

module.exports = app;
