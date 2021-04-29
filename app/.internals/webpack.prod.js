const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const styleLoaders = require("./parts/styleLoaders");
const common = require("./webpack.common");
const { STYLE_REGEX, DST, ASSETS_PATH } = require("./constants");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const config = {
  devtool: false,
  watch: false,
  module: {
    rules: [
      {
        test: STYLE_REGEX,
        use: [{ loader: MiniCssExtractPlugin.loader }, ...styleLoaders],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css",
    }),
    new ProgressBarPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: ASSETS_PATH,
          to: DST,
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};

module.exports = merge(common, config);