const Student = require('../models/student.model');

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