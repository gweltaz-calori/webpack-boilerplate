// Offline plugins options (see https://github.com/NekR/offline-plugin/blob/master/docs/options.md for more options)

module.exports = {
    enable: true,                        // Enable service worker cache management
    caches: 'all',                       // Files cached
    responseStrategy: 'network-first',   // Either use cache or network file first ('cache-first' | 'network-first')
    cache_static_file: true,             // Cache static files (if you only want some of them, turn to false and add
                                         // them in the externals property)
    externals: [                         // External file to cache (ex: fonts)
        'https://fonts.googleapis.com/css?family=Work+Sans:100,400',
    ]
};
