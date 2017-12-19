const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base.conf');


module.exports = new Promise((resolve, reject) => {

    // Get available port for dev server
    portfinder.basePort = 9000;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            baseConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            baseConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://localhost:${port}`],
                }
            }));

            resolve(baseConfig);
        }
    });
});

