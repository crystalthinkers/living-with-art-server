const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    categoryName: {type: String, required: true},
    teacherName: {type: String, required: true},
    teacherDescription:{type: String, required: true},
    videoLink:{type: String, required: true},
    sessions:[{
        sessionId: {
            type: String
        },
        SessionName: {
            type: String
        },
        sessionImage: {
            type: String
        },
        sessionDescription: {
            type: String
        },
        driveLink: {
            type: String
        }
    }],
    status:{type: Boolean, required: false},
});

//Export the model
module.exports = mongoose.model('Category', CategorySchema);
