const check = require('./lib/app.js');

if (check('test.js')) {
  console.log('is a file');
} else {
  console.log('is not a file');
}
