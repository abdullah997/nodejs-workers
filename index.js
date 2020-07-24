const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://farhan:DD656811@cluster0-v0zrj.gcp.mongodb.net/backup?authSource=admin&retryWrites=true&w=majority";
const dbName = 'backup';
const {updaterandomActivity,classifyUsers} = require("./workers/index");
 
MongoClient.connect(uri, function(error, client) {
  if(error){
      throw error;
  };
  console.log("Connected Successfully");
 
  const db = client.db(dbName);
  const collection = db.collection('users');
  //updaterandomActivity(collection);
  classifyUsers(collection);
});

