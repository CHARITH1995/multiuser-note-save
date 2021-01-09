const express = require('express');
const app = express();
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(express.json({extended:false}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({credentials: true}));


//db connection
const con = require('./helpers/connection/connection');
con();

//textFile routes
var textFileRoute = require('./routes/textFile.routes');


//nodejs running port assignment
const PORT = process.env.PORT || 8000

app.use('/api/v1/textFile', textFileRoute);
//app.use('/', routeFile);



server.listen(PORT, () => console.log(`good to go ${PORT}`));

module.exports = app;
