const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const express = require('express');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const DEV = process.env.NODE_ENV === "dev";

const cssLoaders = [
    {
        loader : 'css-loader',
        options : {
            minimize: true,
        }
    },
];

// Files output
const output = {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'assets/js/main.js',
};

// Base plugins
const plugins = [
    new ExtractTextPlugin({
        filename : 'assets/css/style.css',
        disable : DEV
    }),

    new HtmlWebpackPlugin({
        template: path.resolve(__dirname,'../public/index.html'),
        inject: true,
        filename: 'index.html',
        hash: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },

    }),

];

// Build additional plugins
if(!DEV) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
    }));

    plugins.push(new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../static'),
            to: path.resolve(__dirname,'../dist/static'),
            ignore: ['.*']
        }
    ]));

    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: function () {
                return [autoprefixer('last 10 versions','Firefox >= 18','ie 10')]
            }
        },
    });

    output.publicPath = './'

}




const config = {
    entry: ['babel-polyfill','./src/index.js'],
    output,
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
                        ...cssLoaders,
                        {
                            loader: "sass-loader",
                            options : {
                                minimize: true
                            }
                        },


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
                            publicPath : '../../'
                        }
                    }
                ]
            },

        ]
    },
    resolve : {
        alias : {
            '@' : path.resolve('src')
        }
    },
    plugins,
    devServer: {
        contentBase: path.resolve(__dirname,'../public'),
        watchContentBase : true,
        quiet : true,
        compress: true,
        before : function (app) {
            app.use('/static', express.static(path.resolve(__dirname,'../static')));
        }
    }
};


module.exports = new Promise((resolve, reject) => {

    // Get available port for dev server
    portfinder.basePort = 9000;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            config.devServer.port = port;

            // Add FriendlyErrorsPlugin
            config.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://localhost:${port}`],
                }
            }));

            resolve(config);
        }
    });
});
