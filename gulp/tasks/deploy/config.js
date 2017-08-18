module.exports = {
  taskName: 'deploy',
  description: 'Публикация сборки проекта в git-репозитории',
  src: 'build/**/*',
  deployOptions: {
    prefix: 'build',
    repository: 'https://github.com/polygonweb/technomart.git',
    message: 'deploy',
    // branches: ['gh-pages'],
    remoteBranch: 'gh-pages',
    verbose: true,
    debug: true
  }
}
