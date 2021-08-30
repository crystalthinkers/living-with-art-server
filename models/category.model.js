const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    categoryName: {type: Number, required: true},
    status:{type: Boolean, required: false},
});

//Export the model
module.exports = mongoose.model('Category', CategorySchema);
