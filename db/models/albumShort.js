//Require Mongoose
var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var AlbumShortSchema = new Schema({
    id: Number,
    title: String,
    published: Date,
    edited: Date,
    imageCount: Number,
    img: String
});

module.exports = mongoose.model('AlbumShortModel', AlbumShortSchema);
