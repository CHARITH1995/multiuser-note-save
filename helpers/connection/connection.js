require('dotenv').config()
var mongoose = require('mongoose');

const url = "mongodb+srv://dbUser:dbUser@cluster0.w2z4e.mongodb.net/<dbname>?retryWrites=true&w=majority";

const con = async ()=>{

   await mongoose
    .connect( url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));

}



module.exports = con;