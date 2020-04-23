const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = new WebpackNotifierPlugin({
  contentImage: path.join(__dirname, '..', 'webpack-logo.png'),
  title: 'Webpack',
  skipFirstNotification: false,
});
