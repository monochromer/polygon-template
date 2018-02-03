const path = require('path');

module.exports = {
  taskName: 'indexgen',
  description: 'Создание списка страниц',
  filename: 'index.html',
  src: ['build/*.html', '!build/index.html'],
  dest: 'build',
  get dataPath() {
      return path.join(process.cwd(), 'data')
  }
}
