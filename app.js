
const mongoUtil = require( './mongoUtil' );
const express = require('express')
const student = require('./routes/student.route'); //imports routes
const auth = require('./routes/auth.route'); //imports routes
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.use(express.json()); 
app.use(express.urlencoded());
app.use('/auth', auth);
app.use('/students', student);


app.listen(port, () => {
    console.log('Server is running on ' + port);
});