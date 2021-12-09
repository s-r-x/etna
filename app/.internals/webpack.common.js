const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { FILE_REGEX } = require("./constants");
const { SRC, DST } = require("./constants");
const alias = require("./aliases");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { ProvidePlugin } = require("webpack");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  target: "web",
  entry: {
    app: path.join(SRC, "index.tsx"),
  },
  output: {
    filename: isProd ? "[name].[chunkhash:8].js" : "[name].js",
    chunkFilename: isProd ? "[name].[chunkhash:8].js" : "[id].js",

    path: DST,
  },
  resolve: {
    alias,
    extensions: [".ts", ".tsx", ".js"],
    fallback: {
      stream: require.resolve("stream-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts)(x?)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: FILE_REGEX,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]",
          },
        },
      },
    ],
  },
  plugins: [
    new ProvidePlugin({
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: path.join(SRC, "index.html"),
      minify: {
        removeComments: false,
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}", // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
    }),
  ],
};
