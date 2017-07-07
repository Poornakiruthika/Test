const check = require('./lib/app.js');

if (check('lib')) {
  console.log('is a dir');
} else {
  console.log('is not a dir');
}
