/**
 * Обработка стилей
 */

module.exports = (gulp, plugins) => (config) => {
    const processors = ['autoprefixer', 'css-mqpacker']
        .concat(config.isProduction
            ? ['postcss-csso']
            : []
        ).map(pluginName => require(pluginName)(config.plugins[pluginName]))

    return (done) => {
        return plugins.combiner(
            gulp.src(config.src),
            plugins.if(
                !config.isProduction,
                plugins.sourcemaps.init(),
                plugins.noop()
            ),
            plugins.stylus(config.engineOptions),
            plugins.postcss(processors),
            plugins.if(
                !config.isProduction,
                plugins.sourcemaps.write('.'),
                plugins.noop()
            ),
            gulp.dest(config.dest),
            plugins.if(
                !!plugins.browserSync.active,
                    plugins.browserSync.stream(),
                    // plugins.browserSync.reload({ stream: true }),
                    plugins.noop()
            )
        ).on('error', config.onError);
    }
};
