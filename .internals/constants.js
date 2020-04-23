const path = require('path');

module.exports.SRC = path.resolve(__dirname, '..', 'src');
module.exports.DST = path.resolve(__dirname, '..', 'dist');
module.exports.ASSETS_PATH = path.resolve(__dirname, '..', 'assets');
module.exports.STYLE_REGEX = /(\.css)|(\.less)$/i;
module.exports.FILE_REGEX = /\.(woff|woff2|otf|ttf|eot|svg|png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i;

