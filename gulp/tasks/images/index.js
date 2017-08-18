/**
 * Обработка изображений
 */
module.exports = (gulp, plugins, config) => (done) => {
  return plugins.combiner(
    gulp.src(config.src, { since: gulp.lastRun(config.taskName) }),
    plugins.newer(config.dest),
    plugins.imagemin(config.imageminOptions),
    gulp.dest(config.dest),
    plugins.if(
      !!plugins.browserSync.active,
        plugins.browserSync.stream({
          once: true
        }),
        plugins.util.noop()
    )
  ).on('error', config.onError);
};
