const path = require("path");

const ROOT = path.resolve(__dirname, "..");
module.exports.SRC = path.join(ROOT, "src");
module.exports.DST = path.join(ROOT, "dist");
module.exports.ASSETS_PATH = path.join(ROOT, "assets");
module.exports.STYLE_REGEX = /(\.css)|(\.less)$/i;
module.exports.FILE_REGEX = /\.(woff|woff2|otf|ttf|eot|svg|png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i;
module.exports.DEV_ENV = path.join(ROOT, ".env.dev");
module.exports.PROD_ENV = path.join(ROOT, ".env.prod");
