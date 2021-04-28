const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");
const devServer = require("./parts/devServer");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const styleLoaders = require("./parts/styleLoaders");
const { STYLE_REGEX } = require("./constants");

const config = {
  devtool: "eval-cheap-module-source-map",
  devServer,
  module: {
    rules: [
      {
        test: STYLE_REGEX,
        use: ["style-loader", ...styleLoaders],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new ProgressBarPlugin()],
};

module.exports = merge(common, config);
