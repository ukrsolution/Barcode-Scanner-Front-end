// production config
const { merge } = require("webpack-merge");
const path = require("path");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "bundle.js",
    chunkFilename: "chunk.js",
    path: path.resolve(__dirname, "../../dist"),
  },
  devtool: "source-map",
  optimization: {
    minimize: true,
  },
  plugins: [],
});
