// Import the 'mongodb' package which allows interaction with MongoDB.
const mongodb = require('mongodb');
// Create an instance of MongoClient from the 'mongodb' package.
const MongoClient = mongodb.MongoClient;

// Variable to hold the database connection.
let _db;

//here shop is a database and if the database(shop)  does not exists it creaets it and sotes the data in it .
const mongoConnect = (callback) => {
  const client = new MongoClient("mongodb+srv://naveenwali403:0e8lMxGid1SzraXs@cluster0.tbe89z3.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0");

  client.connect()
    .then(result => {
      console.log('connected');
       // Store the database reference in the _db variable.
      _db = result.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err
    });
};

// Function to retrieve the database connection.
// If the connection (_db) exists, return it.
// If the connection (_db) does not exist, throw an error.
const getDb=()=>{
  if(_db){
    return _db;
  }
  throw 'No database found!';
}


//module.exports = mongoConnect;
exports.mongoConnect=mongoConnect;
exports.getDb = getDb;
