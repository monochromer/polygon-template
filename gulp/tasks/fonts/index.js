/**
 * Обработка шрифтов
 */
module.exports = (gulp, plugins, config) => (done) => {
  return plugins.combiner(
      gulp.src(config.src, {
        since: gulp.lastRun(config.taskName)
      }),
      plugins.newer(config.dest),
      gulp.dest(config.dest),
      plugins.if(
        !!plugins.browserSync.active,
          plugins.browserSync.stream({
            once: true,
            match: '**/*.{woff,woff2,ttf,otf,eot}'
          }),
          plugins.util.noop()
      )
    ).on('error', config.onError);
};
