const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlConfig = require('./html.conf');
const autoprefixer = require('autoprefixer');

const DEV = process.env.NODE_ENV === "dev";

// Base plugins
let plugins = [
    new ExtractTextPlugin({
        filename: 'assets/css/style.css',
        disable: DEV
    }),
    ...htmlConfig
];

// Base config
const config = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: 'assets/js/main.js',
    },
    plugins: plugins,
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
                            publicPath: '../../'
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
                            publicPath: '../../'
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
