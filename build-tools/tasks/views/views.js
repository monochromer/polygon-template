/**
 * Обработка представлений
 */
//   let indexGenerator = require('./indexGenerator');

module.exports = (gulp, plugins) => (config) => (done) => {
    let data;
    if (config.dataPath) {
        let dataPath = config.dataPath;
        delete require.cache[require.resolve(dataPath)];
        data = require(dataPath);
        Object.assign(config.engineOptions, {
            locals: data
        });
    }

    return plugins.combiner(
        gulp.src(config.src,),
        plugins.pug(config.engineOptions),
        plugins.rename(path => {
            let { dirname, basename } = path;
            path.basename = basename === 'index' ? dirname : `${dirname}-${basename}`;
            path.dirname = '.';
        }),
        // indexGenerator({
        //     dest: config.dest,
        //     data: data || {},
        //     siteMap: []
        // }),
        gulp.dest(config.dest),
        plugins.if(
            !!plugins.browserSync.active,
            plugins.browserSync.stream({
                once: true
            }),
            // plugins.browserSync.stream(),
            plugins.noop()
        )
        // plugins.if(
        //   !config.isProduction,
        //     plugins.prettify(config.prettify),
        //     plugins.util.noop()
        // )
    ).on('error', config.onError);
}
