const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://farhan:DD656811@cluster0-v0zrj.gcp.mongodb.net/backup?authSource=admin&retryWrites=true&w=majority";
const dbName = 'backup';
const {assignRandomActivity} = require("./workers/index");
const {getRandomUsers,classifyUsers} = require("./db/db")
 

MongoClient.connect(uri, function(err, client) {
  if(err){
      throw err;
  };
  console.log("Connected successfully to database server");
 
  const db = client.db(dbName);
  const collection = db.collection('users');
  classifyUsers(collection);
  // assignRandomActivity(collection);
//   console.log(getRandomUsers(collection));
  
});

