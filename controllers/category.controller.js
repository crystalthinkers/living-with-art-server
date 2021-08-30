const Category = require('../models/category.model');

exports.cateegory_create = function (req, res) {
    let category = new Category(
        {
            categoryName: req.body.categoryName,
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