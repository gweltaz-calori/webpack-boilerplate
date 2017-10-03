const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer');


const DEV = process.env.NODE_ENV == "dev";

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: './',
        path: path.resolve(__dirname, '../dist/'),
        filename: 'assets/js/main.js',
    },
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
                            loader : 'css-loader',
                            options : {
                                minimize: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options : {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [autoprefixer('last 10 versions','Firefox >= 18','ie 10')]
                                }
                            }
                        }]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'assets/images/[name].[ext]',
                            limit: 8192
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
                            limit: 8192
                        }
                    }
                ]
            },
            /*{
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            }*/


        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new ExtractTextPlugin({
            filename : 'assets/css/style.css',
            disable : DEV
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'../src/index.html'),
            inject: true,
            filename: 'index.html',
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },

        }),

        
    ],
    devServer: {
        contentBase: path.resolve(__dirname,'../src'),
        watchContentBase : true,
        compress: true,
        publicPath: '/dist',
        port: 9000,
    }
}