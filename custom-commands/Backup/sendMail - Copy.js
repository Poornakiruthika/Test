//this function is for 
exports.command = function (excelResult, jsFileName) {
  console.log(excelResult);


  var handlebars = require('handlebars');
  var fs = require('fs');
  var xml2js = require('xml2js');
  const copy = require('fs-copy');
  var readHtmlFile = function (path, callback) {
    fs.readFile(path, {
      encoding: 'utf-8'
    }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      }
      else {
        callback(null, html);
      }
    });
  };



const xmlFolder = __dirname + '/..' + '/reports/';
fs.readdir(xmlFolder, (xmlFolderErr, xmlFolderFiles) => {
  xmlFolderFiles.forEach(xmlFolderFile => {
    var xmlFilePrefix = xmlFolderFile.substr(0, xmlFolderFile.lastIndexOf("."));

 console.log(xmlFilePrefix);
 // console.log("Good");
     readHtmlFile(xmlFolder + xmlFilePrefix + jsFileName + '.xml', function (xmlError, xmlFiles) {
        //console.log("Good1");
      var xmlData = xmlFiles;   
      var extractedData = "";
      var parser = new xml2js.Parser();
      parser.parseString(xmlData, function (convertionErr, convertionResult) {
        //Extract the value from the data element
        extractedData = convertionResult.testsuites.testsuite;
        var errorCount = extractedData[0].$.errors;
        var failureCount = extractedData[0].$.failures;
       var testsCount = extractedData[0].$.tests;
        console.log(errorCount);
        console.log(failureCount);
        console.log(testsCount);
   
        readHtmlFile('D:/mailOptions.html', function (htmlErr, htmlFiles) {
          var template = handlebars.compile(htmlFiles);
          var replacements = {
            "Name": jsFileName, "errorCount": errorCount, "failureCount": failureCount, "testsCount" : testsCount
          };
          var htmlToSend = template(replacements);
          console.log(htmlToSend);
          copy('D:/mailOptions.html', 'D:/mailOptions - Copy.html', {
            replace: true
          }, function (htmlReplacementErr) {
            if (htmlReplacementErr) {
              // i.e. file already exists or can't write to directory 
              throw htmlReplacementErr;
            }
            console.log("HTML File copied successfully");
          });
          fs.writeFile("D:/mailOptions - Copy.html", htmlToSend, function (htmlWriteErr) {
            if (htmlWriteErr) {
              throw htmlWriteErr;
            }
            console.log("HTML File written successfully");
          });
        });
      });
    });

    this.globals.transporter.sendMail(this.globals.mailOptions, function (globalsErr, globalsInfo) {
      if (globalsErr) {
        return console.log(globalsErr);
      }
      else {
        console.log('Message sent: ' + globalsInfo.response);
        console.log("Test Case Fail");
      }
    });
      });
});


    /*fs.unlink('D:/mailOptions - Copy.html', function (err) {
        if (err) return console.log(err);
        console.log('File deleted successfully');
      });*/
  this.end();
};