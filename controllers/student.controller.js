const Student = require("../models/student.model");
const StudentBatch = require("../models/studentBatch.model");
const mongoUtil = require("../mongoUtil.js");
// const localdata = require("../localdata.json");
// const fs = require("fs");
exports.student_create = function(req, res, next) {
  const firstName = req.body.first_name;
  const phoneNumber = req.body.phone;
  // let rawdata = fs.readFileSync('localdata.json');
  // let currentData= JSON.parse(rawdata);
  // currentData.data.push({"phone":phoneNumber,"message":firstName});
  const data = [{"phone": phoneNumber, "message": firstName}];
  // fs.writeFileSync('localdata.json', data);
  mongoUtil.sendMessage(data);
  const student = new Student();
  student.fName = req.body.first_name;
  student.lName = req.body.last_name;
  student.phone = req.body.phone;
  student.email = req.body.email;
  student.categoryId = req.body.category_Id;
  student.payment_status = false;
  student.save(function(err) {
    if (err) {
      return next(err);
    }

    res.send("Student Created successfully");
  });
};
exports.student_details = function(req, res, next) {
  Student.findById(req.params.id, function(err, student) {
    if (err) return next(err);
    res.send(student);
  });
};

exports.student_update = function(req, res, next) {
  Student.findByIdAndUpdate(req.params.id, {$set: req.body},
      function(err, student) {
        if (err) return next(err);
        res.send(student+" is updated.");
      });
};

exports.student_delete = function(req, res, next) {
  Student.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted student"+req.params.id+"succesfully");
  });
};


// Batch Process student

exports.studentBatch_create = function(req, res, next) {
  const studentBatch = new StudentBatch();
  studentBatch.categoryId = req.body.categoryId;
  studentBatch.moduleId = req.body.moduleId;
  studentBatch.startDate = req.body.startDate;
  studentBatch.endDate = req.body.moduleId;
  studentBatch.pricing = req.body.startDate;
  studentBatch.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("StudentBatch Created successfully");
  });
};
exports.studentBatch_details = function(req, res, next) {
  StudentBatch.findById(req.params.id, function(err, studentbatch) {
    if (err) return next(err);
    res.send(studentbatch);
  });
};

exports.studentBatch_update = function(req, res, next) {
  StudentBatch.findByIdAndUpdate(req.params.id, {$set: req.body},
      function(err, studentbatch) {
        if (err) return next(err);
        res.send(studentbatch+" is updated.");
      });
};

exports.studentBatch_delete = function(req, res, next) {
  StudentBatch.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted studentBatch"+req.params.id+"succesfully");
  });
};
