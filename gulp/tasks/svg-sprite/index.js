/**
 * SVG Sprite
 */
module.exports = (gulp, plugins, config) => (done) => {
  return plugins.combiner(
    gulp.src(config.src),
    plugins.svgSprite(config.svgSpriteConfig),
    plugins.if('*.styl', gulp.dest(config.stylesDest), gulp.dest(config.dest)),
    plugins.if(
      !!plugins.browserSync.active,
        plugins.browserSync.stream({
          once: true
        }),
        plugins.util.noop()
    )
  ).on('error', config.onError);
};
