// shared config (dev and prod)
const webpack = require("webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config({ path: __dirname + "/../../.env" });

module.exports = {
  context: resolve(__dirname, "../../src"),
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "webpack-preprocessor-loader",
            options: {
              debug: process.env.NODE_ENV !== "product",
              directives: { secret: false },
              params: { plan: "plan", ENV: process.env.NODE_ENV },
              verbose: false,
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]",
          "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
        ],
      },
      { test: /\.svg$/, use: [{ loader: "svg-url-loader", options: { limit: 10000 } }] },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      // path: require.resolve("path-browserify"),
      crypto: false,
    },
  },
  plugins: [new HtmlWebpackPlugin({ template: "../public/index.html" }), new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/)],
  externals: {
    // react: "React",
    // "react-dom": "ReactDOM",
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  performance: {
    hints: false,
  },
  stats: "minimal",
};
