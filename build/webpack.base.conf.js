const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlConfig = require('./html.conf');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const NullPlugin = require('webpack-null-plugin');

const DEV = process.env.NODE_ENV === "dev";
const pwaConfig = require('./pwa.conf');
const envConfig = require('./env.conf');
const offlinePlugin = require('./service-worker.conf');
const globalConfig = require('../config/index');


// Base config
const config = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: globalConfig.build_dist,
        filename: 'assets/js/main.js',
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'assets/css/style.css',
            disable: DEV
        }),
        new webpack.DefinePlugin(envConfig),
        ...htmlConfig,
        ...pwaConfig,
        offlinePlugin ? offlinePlugin : new NullPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(s)?css$|\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [autoprefixer('last 10 versions', 'Firefox >= 18', 'ie 10')]
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'assets/images/[name].[ext]',
                            limit: 8192,
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|otf|woff2?)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'assets/fonts/[name].[ext]',
                            limit: 8192,
                        }
                    }
                ]
            },

        ]
    },
    resolve: {
        alias: {
            '@': path.resolve('src')
        }
    }
};

module.exports = config;
