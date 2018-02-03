module.exports = {
  taskName: 'deploy',
  description: 'Публикация результата сборки в git-репозитории',
  src: 'build/**/*',
  deployOptions: {
    prefix: 'build',
    repository: '',
    message: 'deploy',
    remoteBranch: 'gh-pages',
    verbose: true,
    debug: true
  }
}
