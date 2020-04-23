module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')({
      features: {
        'custom-properties': true,
      },
    }),
  ],
};
