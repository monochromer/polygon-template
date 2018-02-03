const fs = require('fs');
const path = require('path');

/**
 * Возвращает список директорий в одном каталоге
 */
function getFoldersList(srcpath) {
  return fs
    .readdirSync(srcpath)
    .filter(function(file) {
      return fs.statSync(path.join(srcpath, file)).isDirectory();
    })
    .map(folder => path.join(path.join(srcpath, folder)));
};

/**
 * Возвращает "плоский" список всех директорий, не содержащих каталогов
 */
function getNestedFolderList(dir, tasks) {
  tasks = tasks || [];
  var folders = getFoldersList(dir);

  if (folders) {
    folders.forEach(function (folder) {
      var folderPath = path.join(dir, folder);
      var subfolders = getFoldersList(folderPath);
      if (subfolders.length > 0) {
        tasks = getNestedFolderList(folderPath, tasks);
      } else {
        tasks.push(folderPath);
      }
    })
  };

  return tasks;
};

module.exports = { getFoldersList, getNestedFolderList };
