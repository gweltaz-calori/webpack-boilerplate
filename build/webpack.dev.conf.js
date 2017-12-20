const webpack = require('webpack');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const merge = require('webpack-merge');
const express = require('express');
const path = require('path');

const baseConfig = require('./webpack.base.conf');


let config = merge(baseConfig, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        hot: true,
        inline: true,
        open: true,
        overlay: true,
        contentBase: path.resolve(__dirname, '../public'),
        watchContentBase: true,
        quiet: true,
        compress: true,
        before: function (app) {
            app.use('/static', express.static(path.resolve(__dirname, '../static')));
        }
    }
});


module.exports = new Promise((resolve, reject) => {

    // Get available port for dev server
    portfinder.basePort = 9000;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            config.devServer.port = port;

            // Add FriendlyErrorsPlugin
            config.plugins.push(new FriendlyErrorsPlugin());

            resolve(config);
        }
    });
});

