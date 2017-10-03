var express = require('express');
var router = express.Router();
var cloudinaryUtils = require('../utils/cloudinary');
var Album = require('../db/models/albumDetails');
var ObjectID = require('mongodb').ObjectID;

/* GET albums listing. */
router.get('/', function (req, res, next) {
    Album.find({}, function(err, data) {
        if (err) {
            return res.send(err);
        }
        console.log(cloudinaryUtils);
        for (var i = 0; i < data.length; i++) {
            data[i].cover.url = cloudinaryUtils.crop(data[i].cover.publicId, 200, 200); // TODO: use ES6
        }
        res.send(data);
    });
});

/* POST albums listing. */
router.post('/', function (req, res, next) {
    var album = new Album();

    album.id = new ObjectID();
    album.title = req.body.title;
    album.description = req.body.description;
    album.published = new Date();
    album.edited = new Date();
    album.cover = req.body.images[0]; // TODO: use ES6
    album.images = req.body.images;

    album.save(function(err) {
        console.log(album);
        if (err) {
            res.send(err);
        }

        res.json({ message: 'Album created!', albumId: album.id });
    });
});

router.get('/:id', function (req, res, next) {
    Album.findOne({ id: req.params.id }, function(err, data) {
        if (err) {
            return res.send(err);
        }
        console.log(data.images[0].publicId);
        res.send(data);
    });
});

module.exports = router;
