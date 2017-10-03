var appConfig = require('../app.config');

var CLOUDINARY_URL = 'http://res.cloudinary.com';

function crop(publicId, width, height) {
    return CLOUDINARY_URL + '/' + appConfig.cloudinary.cloudName + '/image/upload/c_fill,h_' + height + ',w_' + width + '/' + publicId;
    // return `${CLOUDINARY_URL}/${appConfig.cloudinary.cloudName}/image/upload/c_fill,h_${height},w_${width}/${publicId}`; TODO: use ES6
}

module.exports = { crop: crop };
