const fs = require('fs');

module.exports = function (path) {
  if (fs.existsSync(path)) {
    const stats = fs.lstatSync(path);
    return stats.isDirectory();
  } else {
    return false;
  }
};
