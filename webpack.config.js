const path = require("path"); // eslint-disable-line
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // eslint-disable-line
const CopyPlugin = require("copy-webpack-plugin"); // eslint-disable-line

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "commonjs",
  },
  target: "web",
  externals: /^k6(\/.*)?/,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "src/index.d.ts" }],
    }),
  ],
};
