/**
 * Публикация сборки проекта в git-репозитории
 */
module.exports = (gulp, plugins, config) => (done) => {
  return plugins.combiner(
      gulp.src(config.src, { read: false }),
      plugins.deployGit(config.deployOptions)
    ).on('error', config.onError);
};
