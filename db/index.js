var mongoose = require('mongoose');
var mongoUrl = 'mongodb://admin:photo-gallery@ds147964.mlab.com:47964/photo-gallery';

//Set up default mongoose connection
mongoose.connect(mongoUrl, {
    useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
    db: db
};
