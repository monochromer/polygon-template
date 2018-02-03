const webpack = require('webpack');

module.exports = (gulp, plugins) => (config) => {
    return (done) => {
        // в режиме разработки скрипты собираются
        // в webpack-dev-middleware в browser-sync
        if (!config.isProduction) {
            return done();
        }

        const webpackConfig = require(config.webpackConfigPath);

        return new Promise(resolve => webpack(webpackConfig, (err, stats) => {
            if (err) console.log('Webpack', err);
            console.log(stats.toString({ colors: true }));
            resolve();
        }))
    };
};
