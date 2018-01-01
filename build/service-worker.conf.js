const path = require('path');
const fs = require('fs');
const OfflinePlugin = require('offline-plugin');
const config = require('../config/service-worker');

if (config.enable) {

    if (config.cache_static_file) {
        let files = fs.readdirSync(path.resolve(__dirname, '../static'));
        config.externals = config.externals.concat(
            // Concat static filename prefixed with base url
            files.map((x) => './static/' + x)
        );
    }
    module.exports = new OfflinePlugin(config);
} else {
    module.exports = null;
}
