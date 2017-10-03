var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary');
var Album = require('../db/models/albumDetails');
var ObjectID = require('mongodb').ObjectID;

/* GET albums listing. */
router.get('/', function (req, res, next) {
    Album.find({}, function(err, data) {
        if (err) {
            return res.send(err);
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
    album.cover = cloudinary.image(req.body.images[0].public_id, { width: 100, height: 150, crop: 'fill' });
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
        res.send(data);
    });
});

module.exports = router;
