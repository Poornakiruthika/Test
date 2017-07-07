//this function is for mail triggering
var fs = require ( 'fs' );
var fileLocation = __dirname + '/../';
const xmlFolder = __dirname + '/../reports/';
//delete the testreports.xml file 
fs.readdir ( xmlFolder, ( xmlFolderErr, xmlFolderFiles ) => {
  xmlFolderFiles.forEach ( xmlFolderFile => {
    var xmlFilePrefix = xmlFolderFile.substr ( 0, xmlFolderFile.lastIndexOf ( "testReports" ) );
    var xmlSpecificFile = xmlFilePrefix + "testReports.xml";
    fs.unlink ( xmlFolder + xmlSpecificFile, function ( err ) {
    } );
  } );
} );
module.exports = {
  'Mail': function ( mail ) {    
    mail.url ( "file:///C:/Users/SRAUTOMATION/Desktop/Dev/nightwatch/node_modules/nightwatch/mailOptions%20-%20Copy.html" );
    //mail configuration fetched from the environment.js file
    mail.globals.transporter.sendMail ( mail.globals.mailOptions, function ( globalsErr, globalsInfo ) {
      if ( globalsErr ) {
        return console.log ( globalsErr );
      }
      else {
        console.log ( 'Message sent: ' + globalsInfo.response );
        //delete the unwanted file generated after execution
        var deleteFiles = [ fileLocation + 'mailOptions - Copy.html', fileLocation + 'Report.jpg', fileLocation + 'output.json', fileLocation + 'boxxspring.xlsx', fileLocation + 'videoplayer.xlsx' ];
        var pushDeleteFiles = [ ];
        deleteFiles.forEach ( function ( fileName ) {
          pushDeleteFiles.push ( fs.unlink ( fileName, function ( deleteFilesErr ) {
            if ( deleteFilesErr ) return deleteFilesErr;
          } ) );
        } );
      }
    } );
    mail.end ( );
  }
};