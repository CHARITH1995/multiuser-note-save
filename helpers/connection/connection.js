const mongoose = require('mongoose');
const dbUri =  require('../../config');

//connect to the database
const con = async ()=>{

   await mongoose
    .connect( dbUri.DATA_BASE_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));

}



module.exports = con;