const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer')

const DEV = process.env.NODE_ENV == "dev"

module.exports = {
    entry: './src/app.js',
    output: {
        publicPath: '/dist/',
        path: path.resolve(__dirname, '../dist'),
        filename: 'build.js',
    },
    module: {
        rules: [
            {

                test: /\.vue$/,
                loader: 'vue-loader',
            
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
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
                test: /\.(png|jpe?g|gif|svg|eot|ttf|otf|woff2?)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            limit: 8192
                        }
                    }
                ]
            }

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
            filename : 'app.css',
            disable : DEV
        })
        
    ],
    devServer: {
        contentBase: path.resolve(__dirname,'../public'),
        compress: true,
        port: 9000,
    }
}