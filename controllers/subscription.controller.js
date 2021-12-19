const Subscription = require("../models/subscription.model");
// const path = require("path");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");

exports.subscription_create = function(req, res, next) {
  const subscription = new Subscription();
  subscription.studentId = req.body.studentId;
  subscription.paymentStatus = req.body.paymentStatus;
  subscription.transactionId = req.body.transactionId;
  subscription.expiryDate = req.body.expiryDate;
  subscription.approveStatus = req.body.approveStatus;
  subscription.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Subscription Created successfully");
  });
};
exports.subscription_details = function(req, res, next) {
  Subscription.findById(req.params.id, function(err, subscription) {
    if (err) return next(err);
    res.send(subscription);
  });
};

exports.subscription_update = function(req, res, next) {
  Subscription.findByIdAndUpdate(req.params.id, {$set: req.body},
      function(err, subscription) {
        if (err) return next(err);
        res.send(subscription+" is updated.");
      });
};
exports.subscription_verification = function(req, res) {
  const secret = "razorpaysecret";

  console.log(req.body);

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    res.status(200).json({
      message: "OK",
    });
  } else {
    res.status(403).json({message: "Invalid"});
  }
};
exports.subscription_payment = async function(req, res, next){
  // const paymentCapture = 1;
  const amount = 500;
  const currency = "INR";
  const razorpay = new Razorpay();
  razorpay.key_id = "rzp_test_fcGZ0Fdsv9dtRt";
  razorpay.key_secret = "9OYyQ4oB6CvpfverYVLmj3US";
  const options = {
    amount,
    currency,
    receipt: shortid.generate(),
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.subscription_delete = function(req, res, next) {
  Subscription.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted subscription"+req.params.id+"succesfully");
  });
};
