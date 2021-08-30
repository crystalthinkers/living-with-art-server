const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SubscriptionSchema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    paymentStatus:{type: Boolean, required: false},
    transactionId: {type: String, required: false},
    startDate:{
        type: Date,
      },
    approveStatus:{type: Boolean, required: false},
});

//Export the model
module.exports = mongoose.model('Subscription', SubscriptionSchema);
