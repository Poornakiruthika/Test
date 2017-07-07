    const copy = require('fs-copy');
exports.command = function () {
this.

    copy('D:/status.png', 'D:/status - Copy.png', {
                replace: true
              } );
         console.log("Screenshot copied successfully"); 
  this.end();
};