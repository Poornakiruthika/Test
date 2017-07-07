const fs = require('fs');
const path = require('path');

let copy;

module.exports = copy = function(src, dest) {
  if (!fs.existsSync(dest) && fs.existsSync(src)) {
    const stats = fs.existsSync(src) && fs.statSync(src);
    const isDirectory = fs.existsSync(src) && stats.isDirectory();

    if (fs.existsSync(src) && isDirectory) {
      fs.mkdirSync(dest);
      fs.readdirSync(src).forEach(function(key) {
        copy(path.join(src, key), path.join(dest, key));
      });
    } else {
      fs.linkSync(src, dest);
    }
  }
}
