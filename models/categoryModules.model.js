const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategoryModuleSchema = new Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    moduleName: {type: String, required: false},
    moduleDescription:{type: String, required: true, max: 500},
    modulePrice:{type: Number, required: true, max: 50},
    totalDuration:{type: String, required: true},
    status:{type: Boolean, required: false},
});

//Export the model
module.exports = mongoose.model('CategoryModule', CategoryModuleSchema);
