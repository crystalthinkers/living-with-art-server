const CONNECTION_URL = "mongodb+srv://livingwithart-admin:livingwithart123@living-with-art.wlxu2.mongodb.net/livingart?retryWrites=true&w=majority";
//const CONNECTION_URL = "mongodb://nodeUser:Nodevisio123@164.52.204.34:27017/?authSource=admin&readPreference=primary&appname=MongoDBCompass&directConnection=true&ssl=false";

const DATABASE_NAME = "livingart";
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI || CONNECTION_URL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
  getDb: function() {
    return db;
  }
};