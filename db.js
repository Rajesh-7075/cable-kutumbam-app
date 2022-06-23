
const PouchDB = require('pouchdb');
require('dotenv').config();

const db = new PouchDB(process.env.REACT_APP_COUCH_DATABASE);
db.info().then(function (info) {
    console.log(info,"info");
  });
  
console.log("Connected to database");
     
module.exports = db;






