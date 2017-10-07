var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var appConfig = require('../app.config');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: appConfig.cloudinary.cloudName,
    api_key: appConfig.cloudinary.apiKey,
    api_secret: appConfig.cloudinary.apiSecret
});

/* GET photos listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST new photos listing. */
router.post('/', function(req, res, next) {
    // var photos = [].concat(req.files.photos);
    var form = new formidable.IncomingForm();
    form.multiples = true;

    form.parse(req, function(err, fields, files) {
        var images = [].concat(files.photos);
        var imagesCount = images.length;
        var uploadedImages = [];
        var imagesProcessed = 0;

        console.log(images);
        for(var i = 0; i < imagesCount; i++) {

            cloudinary.v2.uploader.upload(images[i].path, function (error, result) {
                if (!!error) {
                    return res.error(error);
                }
                uploadedImages.push(result);
                imagesProcessed++;
                if (imagesProcessed === imagesCount) {
                    res.send(uploadedImages);
                }
            });
        }
    });
});

/* DELETE photo from media library. */
router.delete('/:publicId', function(req, res, next) {
    cloudinary.v2.uploader.destroy(req.params.publicId,
        { invalidate: true }, function (error, result) {
            res.send(result);
        });
});
module.exports = router;
