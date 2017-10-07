var express = require('express');
var router = express.Router();
var cloudinaryUtils = require('../utils/cloudinary');
var Album = require('../db/models/albumDetails');
var ObjectID = require('mongodb').ObjectID;
var appConfig = require('../app.config');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: appConfig.cloudinary.cloudName,
    api_key: appConfig.cloudinary.apiKey,
    api_secret: appConfig.cloudinary.apiSecret
});

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

/* POST album */
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

/* PUT album */
router.put('/:id', function (req, res, next) {

    Album.findById(req.params.id, function (err, album) {
        if (err) {
            res.send(err);
        }
        console.log(album);
        album.set({
            title: req.body.title,
            description: req.body.description,
            edited: new Date(),
            cover: req.body.images[0],
            images: req.body.images
        });

        album.save(function (err, updatedAlbum) {
            if (err) {
                res.send(err);
            }

            res.send(updatedAlbum);
        });
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

router.delete('/:id', function (req, res, next) {
    // need to clean up photos. If fails on find step - send error. If fails on delete step - no cares.
    Album.findOne({ id: req.params.id }, function(err, data) {
        if (err) {
            return res.send(err);
        }

        var images = data.images;

        for(var i = 0; i < images.length; i++) {
            cloudinary.v2.uploader.destroy(images[i].publicId,
                { invalidate: true }, function (error, result) {});
        }

        Album.remove({ id: req.params.id }, function(err, data) {
            if (err) {
                return res.send(err);
            }

            res.send(data);
        });
    });
});
module.exports = router;
