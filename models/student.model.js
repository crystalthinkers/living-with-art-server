const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentSchema = new Schema({
    phone: {type: Number, required: true},
    address: {type: String, required: false},
    email:{type: String, required: false, max: 100},
    fName:{type: String, required: true, max: 50},
    lName:{type: String, required: true, max: 50},
    gender:{type: String, required: false, max: 20},
    password:{type: String, required: false, max: 20},
    otp:{type: String, required: false, max: 6},
    status:{type: Boolean, required: false},
    categoryId:{type: String, required: true, max: 100},
    payment_status:{type: Boolean, required: false},
});

//Export the model
module.exports = mongoose.model('Student', StudentSchema);
