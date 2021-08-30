const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ArtClassSchema = new Schema({
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    classVideoLink: {type: String, required: false},
    classDescription:{type: String, required: true, max: 500},
    status:{type: Boolean,default:true,required: false},
});

//Export the model
module.exports = mongoose.model('ArtClass', ArtClassSchema);
