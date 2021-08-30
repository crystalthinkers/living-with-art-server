const Student = require('../models/student.model');
const StudentBatch = require('../models/studentBatch.model');

exports.student_create = function (req, res) {
    let student = new Student(
        {
            studentName: req.body.studentName,
            phoneNumber: req.body.phoneNumber,
            address:req.body.address
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