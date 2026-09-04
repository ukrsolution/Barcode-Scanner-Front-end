import * as webpack from "webpack";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import dotenv from 'dotenv';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const plan = "plan";

const config: Configuration = {
    mode: "development",
    output: {
        publicPath: "http://192.168.0.77:3002/",
    },
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                        },
                    },
                    {
                        loader: "webpack-preprocessor-loader",
                        options: {
                            debug: process.env.NODE_ENV !== "production",
                            directives: { secret: false },
                            params: { plan: plan, ENV: process.env.NODE_ENV },
                            verbose: false,
                            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                        },
                    }
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
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
        new ForkTsCheckerWebpackPlugin({ async: false }),
        new ESLintPlugin({ extensions: ["js", "jsx", "ts", "tsx"] }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed)
        })
    ],
    devtool: "source-map", // "inline-source-map",
    devServer: {
        historyApiFallback: true,
        host: "192.168.0.77",
        port: 3002,
        open: true,
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        // disableHostCheck: true,
        allowedHosts: [
            'wordpress',
            '192.168.0.77',
        ],
    },
};

export default config;
