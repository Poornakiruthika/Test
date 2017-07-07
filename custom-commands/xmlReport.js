//this function is for switch To Secondary Window when using FB, twitter, google+
var fs = require('fs');
const xmlFolder = __dirname + '/..' + '/reports/';
exports.command = function ( fileName ) {
  fs.readdir(xmlFolder, (xmlFolderErr, xmlFolderFiles) => {
      xmlFolderFiles.forEach(xmlFolderFile => {
        var xmlFilePrefix = xmlFolderFile.substr(0, xmlFolderFile.lastIndexOf(fileName));
        var xmlSpecificFile = xmlFilePrefix + "deleteReports.xml";
        fs.unlink(__dirname + '/../reports/' + xmlSpecificFile, function (err) {
          //if (err) return console.log(err);
        });
      });
    });
};
