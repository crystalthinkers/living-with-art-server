const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    categoryName: {type: String, required: true},
    teacherName: {type: String, required: false},
    teacherDescription:{type: String, required: false},
    videoLink:{type: String, required: false},
    // sessions:[{
    //     sessionId: {
    //         type: String
    //     },
    //     SessionName: {
    //         type: String
    //     },
    //     sessionImage: {
    //         type: String
    //     },
    //     sessionDescription: {
    //         type: String
    //     },
    //     driveLink: {
    //         type: String
    //     }
    // }],
    syllabus:[{
        subHeader:{type: String, required: true},
        description:{type: String, required: true}
    }],
    fees:{type: Number, required:true},
    duration:{type:Number, required:true},
    status:{type: Boolean, required: false},
});

//Export the model
module.exports = mongoose.model('Category', CategorySchema);
