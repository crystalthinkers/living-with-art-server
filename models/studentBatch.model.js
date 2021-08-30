const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentBatchSchema = new Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryModule'
    },
    startDate:{
        type: Date,
      },
    endDate:{
        type: Date,
      },
    pricing: {
        type: String,
      },
    status:{type: Boolean,default:true, required: false},
});

//Export the model
module.exports = mongoose.model('StudentBatch', StudentBatchSchema);
