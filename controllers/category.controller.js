const Category = require("../models/category.model");

exports.category_create = function(req, res, next) {
  console.log("body:", req.body);
  const category = new Category();
  category.categoryName = req.body.categoryName;
  category.syllabus = req.body.syllabus;
  category.fees = req.body.fees;
  category.duration = req.body.duration;
  category.status = true;
  category.save(function(err) {
    if (err) {
      console.log("my error", err);
      return next(err);
    }
    res.send("Category Created successfully");
  });
};
exports.category_details = function(req, res, next) {
  Category.findById(req.params.id, function(err, category) {
    if (err) return next(err);
    res.send({"status": true, "data": category});
  });
};

exports.allCategories = function(req, res, next) {
  Category.find({status: true}, function(err, category) {
    if (err) return next(err);

    res.send({"status": true, "data": category});
  });
};

exports.allCategories = function(req, res, next) {
  Category.find({}, function(err, category) {
    if (err) return next(err);
    res.send(category);
  });
};

exports.category_update = function(req, res, next) {
  Category.findByIdAndUpdate(req.params.id, {$set: req.body},
      function(err, category) {
        if (err) return next(err);
        res.send(category +" is updated.");
      });
};

exports.category_delete = function(req, res, next) {
  Category.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted category"+req.params.id+"succesfully");
  });
};
