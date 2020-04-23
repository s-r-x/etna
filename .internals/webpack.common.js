const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {FILE_REGEX} = require('./constants');
const {SRC, DST} = require('./constants');
const alias = require('./aliases');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: path.join(SRC, 'index.tsx'),
  },
  output: {
    filename: isProd ? '[name].[chunkhash:8].js' : '[name].js',
    chunkFilename: isProd ? '[name].[chunkhash:8].js' : '[id].js',

    path: DST,
  },
  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts)(x?)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: FILE_REGEX,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC, 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
    }),
  ],
};
