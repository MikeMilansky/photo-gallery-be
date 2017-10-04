//Require Mongoose
var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var AlbumDetailsSchema = new Schema({
    id: String,
    title: String,
    description: String,
    published: Date,
    edited: Date,
    imageCount: Number,
    cover: { publicId: String, url: String },
    images: [{
        publicId: String,
        url: String,
        title: String
    }]
});

// Compile model from schema
module.exports = mongoose.model('AlbumDetailsModel', AlbumDetailsSchema);
