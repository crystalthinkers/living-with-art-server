const Category = require('../models/category.model');

exports.category_create = function (req, res) {
    let category = new Category(
        {
            categoryName: req.body.categoryName,
            teacherName: req.body.teacherName,
            teacherDescription:req.body.teacherDescription,
            videoLink:req.body.videoLink,
            sessions:req.body.sessions,
            status:true
        }
    );
    category.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Category Created successfully')
    })
};
exports.category_details = function (req, res) {
    category.findById(req.params.id, function (err, category) {
        if (err) return next(err);
        res.send(category);
    })
};

exports.allCategories = function (req, res) {
    category.find({}, function (err, category) {
        if (err) return next(err);
        res.send(category);
    })
};

exports.category_update = function (req, res) {
    Category.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, category) {
            if (err) return next(err);
            res.send(category +' is updated.');
        });
};

exports.category_delete = function (req, res) {
    Category.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted category'+req.params.id+'succesfully')
    })
};