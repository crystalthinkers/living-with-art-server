const ArtClass = require('../models/artClass.model');

exports.artclass_create = function (req, res) {
    let artclass = new ArtClass(
        {
            moduleId: req.body.moduleId,
            classVideoLink: req.body.classVideoLink,
            classDescription:req.body.classDescription
        }
    );
    artclass.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Art Class Created successfully')
    })
};
exports.artclass_details = function (req, res) {
    ArtClass.findById(req.params.id, function (err, artclass) {
        if (err) return next(err);
        res.send(artclass);
    })
};

exports.artclass_update = function (req, res) {
    ArtClass.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, artclass) {
            if (err) return next(err);
            res.send(artclass+' is updated.');
        });
};

exports.artclass_delete = function (req, res) {
    ArtClass.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted artclass'+req.params.id+'succesfully')
    })
};
