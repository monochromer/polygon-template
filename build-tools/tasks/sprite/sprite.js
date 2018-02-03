const buffer = require('vinyl-buffer');

module.exports = (gulp, plugins) => (config) => (done) => {

    const spriteData = gulp.src(config.src)
        .pipe(plugins.spritesmith(config.spriteOptions));

    const imgStream = spriteData.img
        // We must buffer our stream into a Buffer for imagemin
        .pipe(buffer())
        .pipe(plugins.if(
            config.isProduction,
            plugins.imagemin(),
            plugins.util.noop()
        ))
        .pipe(gulp.dest(config.imgDest));

    const styleStream = spriteData.css
        .pipe(gulp.dest(config.stylesDest));

    return plugins.combiner(
        imgStream,
        styleStream,
        plugins.if(
            !!plugins.browserSync.active,
            plugins.browserSync.stream({
                once: true
            }),
            plugins.util.noop()
        )
    )
    .on('error', config.onError);
};
