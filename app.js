
const mongoUtil = require( './mongoUtil' );
const express = require('express')
const student = require('./routes/student.route'); 
const auth = require('./routes/auth.route'); 
const category = require('./routes/category.route'); 
const artClass = require('./routes/artClass.route'); 
const subscription = require('./routes/subscription.route'); 
const app = express()
const port = 3000
const bodyParser = require('body-parser');
mongoUtil.connectWhatsapp();
app.use(express.json()); 
app.use(express.urlencoded());
app.use('/auth', auth);
app.use('/students', student);
app.use('/category', category);
app.use('/artClass', artClass);
app.use('/subscription', subscription);
app.listen(port, () => {
    console.log('Server is running on ' + port);
});