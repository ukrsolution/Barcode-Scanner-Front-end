// development config
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const path = require("path");
const commonConfig = require("./common");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "development",
  output: {
    publicPath: "/",
  },
  // cache: {
  //   type: "memory", // filesystem
  //   // cacheDirectory: path.resolve(__dirname, ".temp_cache"),
  // },
  entry: [
    // "react-hot-loader/patch", // activate HMR for React
    "webpack-dev-server/client?http://192.168.0.77:3002/", // bundle the client for webpack-dev-server and connect to the provided endpoint
    "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
    // "./index.tsx", // the entry point of our app
    path.join(__dirname, "../../src", "index.tsx"),
  ],
  devServer: {
    host: "192.168.0.77",
    hot: true, // enable HMR on the server
    port: 3002,
    compress: true,
  },
  // devtool: "cheap-module-source-map",
  // devtool: "source-map",
  devtool: "inline-source-map",
  optimization: {
    minimize: true,
  },
  watchOptions: {
    poll: 500,
    ignored: /node_modules/,
  },
  target: "web",
  externals: [
    // nodeExternals({
    //   allowlist: ["webpack/hot/dev-server", /^lodash/],
    // }),
  ],
  plugins: [
    // new ForkTsCheckerWebpackPlugin({ async: false, typescript: { configFile: path.resolve(__dirname, "../") } }),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
});
