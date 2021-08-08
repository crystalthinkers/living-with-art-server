const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentSchema = new Schema({
    studentName: {type: String, required: true, max: 50},
    phoneNumber: {type: Number, required: true},
    address: {type: String, required: false},
});

//Export the model
module.exports = mongoose.model('Student', StudentSchema);
