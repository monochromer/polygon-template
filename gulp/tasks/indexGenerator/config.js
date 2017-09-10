const path = require('path');
const dataPath = path.join(process.cwd(), 'data');

module.exports = {
  taskName: 'indexgen',
  description: 'Создание списка страниц',
  isProduction: process.env.NODE_ENV === 'production',
  filename: 'index.html',
  src: ['build/*.html', '!build/index.html'],
  dest: 'build',
  dataPath: dataPath
}
