module.exports = (gulp, plugins, config) => {
  return (done) => {
    if (!config.isProduction) {
      done();
      return;
    }

    const webpack = require('webpack');
    const webpackConfig = require(config.webpackConfigPath);

    return new Promise(resolve => webpack(webpackConfig, (err, stats) => {
      if(err) console.log('Webpack', err);
      console.log(stats.toString({ colors: true }));
      console.log(config);
      resolve();
    }))
  };
};
