const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const path = require('path');
const notifier = require('./parts/notifier');
const devServer = require('./parts/devServer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const styleLoaders = require('./parts/styleLoaders');
const { STYLE_REGEX } = require('./constants');

const config = {
  devtool: 'cheap-module-eval-source-map',
  devServer,
  module: {
    rules: [
      {
        test: STYLE_REGEX,
        use: [ 'style-loader', ...styleLoaders ]
      },

    ],
  },
  plugins: [                                                                                                                                                           
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, '..', 'node_modules'),
    ]),
    new webpack.HotModuleReplacementPlugin(),
    notifier,
    new ProgressBarPlugin()
  ],
};

module.exports = merge(common, config);
