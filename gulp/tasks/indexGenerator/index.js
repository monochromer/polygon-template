/**
 * Создание списка страниц
 */
module.exports = (gulp, plugins, config) => (done) => {

  var data;
  if (config.dataPath) {
      let dataPath = config.dataPath;
      delete require.cache[require.resolve(dataPath)];
      data = require(dataPath);
    }

  let indexGenerator = require('./indexGenerator');

  return plugins.combiner(
    gulp.src(config.src),
    indexGenerator({
        filename: config.filename,
        dest: config.dest,
        data: data || {},
        siteMap: []
    }),
    gulp.dest(config.dest),
    plugins.if(
      !!plugins.browserSync.active,
        plugins.browserSync.stream({
          once: true
        }),
        // plugins.browserSync.stream(),
        plugins.util.noop()
    )
  ).on('error', config.onError);
}
