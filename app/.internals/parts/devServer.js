const { ASSETS_PATH } = require("../constants");
module.exports = {
  stats: "errors-only",
  port: process.env.PORT || 8080,
  open: true,
  hot: true,
  overlay: true,
  contentBase: ASSETS_PATH,
  historyApiFallback: true,
};
