						
const { response } = require('express');
var nodemailer = require('nodemailer');
const Student = require('../models/student.model');
var mongoUtil = require( '../mongoUtil' );
var jwt = require('jsonwebtoken');
var db = mongoUtil.getDb();
const twilio = require('twilio');
var jwt_decode = require("jwt-decode");

let successResponse = {
  status:true,
  data:{}
}
let errorResponse ={
  status:false,
  msg:'some error occured'
}
exports.auth_create = function (req, res) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: 'livingwithartsapp@gmail.com',
          pass: 'thisisnotmypassword'
        }
      });
      let oneTimePassword = Math.floor(100000 + Math.random() * 900000).toString();
      var mailOptions = {
        from: 'livingwithartsapp@gmail.com',
        to: req.body.email,
        subject: 'Your OTP Verification',
        text: oneTimePassword
      };
        
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          let student = new Student(
            {
                phone: req.body.phone,
                address:req.body.address,
                fName:req.body.fName,
                lName:req.body.lName,
                email:req.body.email,
                gender:req.body.gender,
                password:req.body.password,
                otp:oneTimePassword,
                status:false
            }
        );
        student.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Registration Success!.OTP Send Successfully')
        })
        }
      });
                     
};


exports.auth_verification = async function (req, res) {
  
  // this will return as array

  // db.collection("students").find({email:"arungmani@gmail.com"}).toArray(function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   db.close();
  // });
  db.collection('students').findOne({email:req.body.email})
  .then(function(doc) {
         if(!doc)
             throw new Error('No record found.');
      else{
        console.log('doc',doc);
        if(doc.email==req.body.email && doc.otp==req.body.otp){
        successResponse.data.msg = 'OTP valid';
        res.send(successResponse)
        }
        else
        {
        errorResponse.msg = 'OTP is Invalid';
        res.send(errorResponse)
        }
      }
   });             
};

exports.login = async function (req, res) {
  
  
  db.collection('students').findOne({email:req.body.email,password:req.body.password})
  .then(function(doc) {
         if(!doc)
            {
              errorResponse.msg = 'Invalid Login';
              res.send(errorResponse)
            }
      else{
        let token = jwt.sign({ email: doc.email }, 'artofliving');
        successResponse.data.email = doc.email;
        successResponse.data.phone = doc.phone;
        successResponse.data.address = doc.address;
        successResponse.data.fName = doc.fName;
        successResponse.data.lName = doc.lName;
        successResponse.data.role = doc.role;
        successResponse.token = token;
        res.send(successResponse)
      }
   });              
};

exports.verify_token = async function (req, res,next) {
console.log('this is a test ');
var token = req.body.token;
var decoded = jwt_decode(token);
console.log(decoded);
if(decoded.email){
  next();
} else
res.send(errorResponse)
  // db.collection('students').findOne({email:req.body.email,password:req.body.password})
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

exports.send_message = function (req, res) {
  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;
  const accountSid = 'AC1b16e843e43bc17fc711975d2fc43e87';
  const authToken = '6b9efdca24ee5d7b19f94d24a8c108d3';
  const client = require('twilio')(accountSid, authToken);
  console.log('reached here')
  client.messages
  .create({
     from: 'whatsapp:+14155238886',
     body: 'tick tick tokkk!',
     to: 'whatsapp:+918943471583'
   })
  .then(message => console.log(message));
};

exports.authenticateToken = async function (req, res,next) {
  
    // Gather the jwt access token from the request header
    const authHeader = req.headers['auth']
    console.log(authHeader)
  if(authHeader || authHeader != null ){
    const token = authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401) // if there isn't any token
    var decoded = jwt_decode(token);
        if(decoded.email)
        next() // pass the execution off to whatever request the client intended
        else
        {
        return res.status(403).send({ status: false, msg: "Invalid Token" })
        }

}else{
    return res.sendStatus(401)
}
    // if(authHeader || authHeader != null ){
    //     const token = authHeader.split(' ')[1]
    //     if (token == null) return res.sendStatus(401) // if there isn't any token
    
    
    //     jwt.verify(token, "key", (err, user) => {
    //         console.log(err)
    //         if (err) return res.status(403).send({ status: false, msg: "Invalid token" })
    //         req.user = user
    //         next() // pass the execution off to whatever request the client intended
    //     })
    // }else{
    //     return res.sendStatus(401)
    // }
    


};