const dir = require('dir-copy');
const file = require('file-copy');
const isfile = require('file-check');
const isdir = require('dir-check');

module.exports = function (src, dest) {
  if (isfile(src)) {
    file(src, dest);
    return true;
  } else if (isdir(src)) {
    dir(src, dest);
    return true;
  } else {
    return false;
  }
}
