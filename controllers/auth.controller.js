// const {response} = require("express");
const nodemailer = require("nodemailer");
const Student = require("../models/student.model");
const mongoUtil = require("../mongoUtil");
const jwt = require("jsonwebtoken");
const db = mongoUtil.getDb();
// const twilio = require("twilio");
const jwtdecode = require("jwt-decode");

const successResponse = {
  status: true,
  data: {},
};
const errorResponse = {
  status: false,
  msg: "some error occured",
};
exports.auth_create = function(req, res) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "livingwithartsapp@gmail.com",
      pass: "thisisnotmypassword",
    },
  });
  const partOne = Math.floor(100000 + Math.random());
  const oneTimePassword = (partOne * 900000).toString();
  const mailOptions = {
    from: "livingwithartsapp@gmail.com",
    to: req.body.email,
    subject: "Your OTP Verification",
    text: oneTimePassword,
  };

  transporter.sendMail(mailOptions, function(error, info, next) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      const student = new Student({
        phone: req.body.phone,
        address: req.body.address,
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        gender: req.body.gender,
        password: req.body.password,
        otp: oneTimePassword,
        status: false,
      });
      student.save(function(err) {
        if (err) {
          return next(err);
        }
        res.send("Registration Success!.OTP Send Successfully");
      });
    }
  });
};

exports.auth_verification = function(req, res) {
  // this will return as array

  // db.collection("students").find({email:"arungmani@gmail.com"}).
  // toArray(function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   db.close();
  // });
  db.collection("students")
      .findOne({email: req.body.email})
      .then(function(doc) {
        if (!doc) {
          throw new Error("No record found.");
        } else {
          console.log("doc", doc);
          if (doc.email == req.body.email && doc.otp == req.body.otp) {
            successResponse.data.msg = "OTP valid";
            res.send(successResponse);
          } else {
            errorResponse.msg = "OTP is Invalid";
            res.send(errorResponse);
          }
        }
      });
};

exports.login = function(req, res) {
  db.collection("students")
      .findOne({email: req.body.email, password: req.body.password})
      .then(function(doc) {
        if (!doc) {
          errorResponse.msg = "Invalid Login";
          res.send(errorResponse);
        } else {
          const token = jwt.sign({email: doc.email}, "artofliving");
          successResponse.data.email = doc.email;
          successResponse.data.phone = doc.phone;
          successResponse.data.address = doc.address;
          successResponse.data.fName = doc.fName;
          successResponse.data.lName = doc.lName;
          successResponse.data.role = doc.role;
          successResponse.token = token;
          res.send(successResponse);
        }
      });
};

exports.verify_token = function(req, res, next) {
  console.log("this is a test ");
  const token = req.body.token;
  const decoded = jwtdecode(token);
  console.log(decoded);
  if (decoded.email) {
    next();
  } else {
    res.send(errorResponse);
  }
  // db.collection('students').findOne({email:req.body.email,
  // password:req.body.password});
  // .then(function(doc) {
  //        if(!doc)
  //           {
  //             errorResponse.msg = 'Invalid Login';
  //             res.send(errorResponse)
  //           }
  //     else{
  //       let token = jwt.sign({ email: doc.email }, 'artofliving');
  //       successResponse.data.email = doc.email;
  //       successResponse.data.phone = doc.phone;
  //       successResponse.data.address = doc.address;
  //       successResponse.data.fName = doc.fName;
  //       successResponse.data.lName = doc.lName;
  //       successResponse.token = token;
  //       res.send(successResponse)
  //     }
  //  });
};

exports.send_message = function(req, res) {
  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;
  const accountSid = "AC1b16e843e43bc17fc711975d2fc43e87";
  const authToken = "6b9efdca24ee5d7b19f94d24a8c108d3";
  const client = require("twilio")(accountSid, authToken);
  console.log("reached here");
  client.messages
      .create({
        from: "whatsapp:+14155238886",
        body: "tick tick tokkk!",
        to: "whatsapp:+918943471583",
      })
      .then((message) => console.log(message));
};

exports.checkMessage = function(req, res) {
  const {Client} = require("whatsapp-web.js");
  const client = new Client();

  client.on("qr", (qr) => {
    console.log("QR RECEIVED111", qr);
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.initialize();
};

exports.authenticateToken = function(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["auth"];
  console.log(authHeader);
  if (authHeader || authHeader != null) {
    const token = authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401); // if there isn't any token
    const decoded = jwtdecode(token);
    if (decoded.email) {
      next();
      // pass the execution off to whatever request the client intended
    } else {
      return res.status(403).send({status: false, msg: "Invalid Token"});
    }
  } else {
    return res.sendStatus(401);
  }
  // if(authHeader || authHeader != null ){
  //     const token = authHeader.split(' ')[1]
  //     if (token == null) return res.sendStatus(401) // if there isn't any
  // token

  //     jwt.verify(token, "key", (err, user) => {
  //         console.log(err)
  //         if (err) return res.status(403).send({ status: false, msg:
  // "Invalid token" })
  //         req.user = user
  //         next() // pass the execution off to whatever
  // request the client intended
  //     })
  // }else{
  //     return res.sendStatus(401)
  // }
};
