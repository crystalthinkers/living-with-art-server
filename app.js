const CONNECTION_URL = "mongodb+srv://livingwithart-admin:livingwithart123@living-with-art.wlxu2.mongodb.net/livingart?retryWrites=true&w=majority";
const DATABASE_NAME = "livingart";
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI || CONNECTION_URL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const express = require('express')
const student = require('./routes/student.route'); //imports routes
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.use(express.json()); 
app.use(express.urlencoded());
app.use('/students', student);


app.listen(port, () => {
    console.log('Server is running on ' + port);
});