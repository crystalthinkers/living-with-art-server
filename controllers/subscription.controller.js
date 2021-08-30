const Subscription = require('../models/subscription.model');

exports.subscription_create = function (req, res) {
    let subscription = new Subscription(
        {
            studentId: req.body.studentId,
            paymentStatus: req.body.paymentStatus,
            transactionId:req.body.transactionId,
            expiryDate:req.body.expiryDate,
            approveStatus:req.body.approveStatus
        }
    );
    subscription.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Subscription Created successfully')
    })
};
exports.subscription_details = function (req, res) {
    Subscription.findById(req.params.id, function (err, subscription) {
        if (err) return next(err);
        res.send(subscription);
    })
};

exports.subscription_update = function (req, res) {
    Subscription.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, subscription) {
            if (err) return next(err);
            res.send(subscription+' is updated.');
        });
};

exports.subscription_delete = function (req, res) {
    Subscription.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted subscription'+req.params.id+'succesfully')
    })
};
