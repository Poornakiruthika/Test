//this function is for 
exports.command = function () {

    this.globals.transporter.sendMail(this.globals.mailOptions, function (globalsErr, globalsInfo) {
      if (globalsErr) {
        return console.log(globalsErr);
      }
      else {
        console.log('Message sent: ' + globalsInfo.response);
        console.log("Test Case Fail");
      }
    });

    /*fs.unlink('D:/mailOptions - Copy.html', function (err) {
        if (err) return console.log(err);
        console.log('File deleted successfully');
      });*/
  this.end();
};