const fs = require('fs');

module.exports = function (src, dest) {
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
  }
}
