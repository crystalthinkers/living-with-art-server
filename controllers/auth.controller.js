						
const { response } = require('express');
var nodemailer = require('nodemailer');
const Student = require('../models/student.model');
var mongoUtil = require( '../mongoUtil' );
var jwt = require('jsonwebtoken');
var db = mongoUtil.getDb();

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
        successResponse.token = token;
        res.send(successResponse)
      }
   });              
};