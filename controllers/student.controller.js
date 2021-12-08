const Student = require('../models/student.model');
const StudentBatch = require('../models/studentBatch.model');
const mongoUtil = require('../mongoUtil.js');
const localdata = require('../localdata.json');
var fs = require('fs');
exports.student_create = function (req, res) {
    var firstName = req.body.first_name;
    var phoneNumber = req.body.phone;
    // let rawdata = fs.readFileSync('localdata.json');
    // let currentData= JSON.parse(rawdata);
    // currentData.data.push({"phone":phoneNumber,"message":firstName});
    let data = [{"phone":phoneNumber,"message":firstName}];
   // fs.writeFileSync('localdata.json', data);
    mongoUtil.sendMessage(data);
   
    let student = new Student(
        {
            fName: req.body.first_name,
            lName: req.body.last_name,
            phone:req.body.phone,
            email:req.body.email,
            categoryId:req.body.category_Id,
            payment_status:false
        }
    );
    student.save(function (err) {
        if (err) {
            return next(err);
        }
        
        res.send('Student Created successfully')
    })
};
exports.student_details = function (req, res) {
    student.findById(req.params.id, function (err, student) {
        if (err) return next(err);
        res.send(student);
    })
};

exports.student_update = function (req, res) {
    Student.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, student) {
            if (err) return next(err);
            res.send(student+' is updated.');
        });
};

exports.student_delete = function (req, res) {
    Student.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted student'+req.params.id+'succesfully')
    })
};


//Batch Process student

exports.studentBatch_create = function (req, res) {
    let studentBatch = new StudentBatch(
        {
            categoryId: req.body.categoryId,
            moduleId: req.body.moduleId,
            startDate:req.body.startDate,
            endDate: req.body.moduleId,
            pricing:req.body.startDate
        }
    );
    studentBatch.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('StudentBatch Created successfully')
    })
};
exports.studentBatch_details = function (req, res) {
    StudentBatch.findById(req.params.id, function (err, studentbatch) {
        if (err) return next(err);
        res.send(studentbatch);
    })
};

exports.studentBatch_update = function (req, res) {
    StudentBatch.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, studentbatch) {
            if (err) return next(err);
            res.send(studentbatch+' is updated.');
        });
};

exports.studentBatch_delete = function (req, res) {
    StudentBatch.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted studentBatch'+req.params.id+'succesfully')
    })
};