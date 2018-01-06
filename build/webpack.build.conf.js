const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const baseConfig = require('./webpack.base.conf');
const globalConfig = require('../config/index');

const config = merge(baseConfig, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '../static'),
                to: path.join(globalConfig.build_dist, '/static'),
                ignore: ['.*']
            }
        ]),
        
    ]
});


module.exports = config;
