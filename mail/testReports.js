//this function is for generating the overall test reports
var handlebars = require ( 'handlebars' );
var fs = require ( 'fs' );
var xml2js = require ( 'xml2js' );
var webshot = require ( 'webshot' );
var scriptsName = "";
var scriptsTitle = "";
var errCount = 0;
var failCount = 0;
var testCount = 0;
var skippedCount = 0;
var executedTime = 0;
var strtTime = "";
var passCount = 0;
var resultCount = [ ];
var fileLocation = __dirname + '/../';
var htmlOptions = {
  screenSize: {
    width: 1024,
    height: 768
  },
  shotSize: {
    width: "all",
    height: "all"
  },
  defaultWhiteBackground: true
};
// read the html file path
var readHtmlFile = function ( path, callback ) {
  fs.readFile ( path, {
    encoding: 'utf-8'
  }, function ( err, html ) {
    if ( err ) {
      throw err;
      callback ( err );
    }
    else {
      callback ( null, html );
    }
  } );
};
// search the xml file reports 
const xmlFolder = fileLocation + 'reports/';
var walk = require ( 'walk' );
var files = [ ];
// Walker options
var walker = walk.walk ( xmlFolder, { followLinks: true } );
walker.on ( 'file', function ( root, stat, next ) {
  // Add this file to the list of files
  files.push ( root + '/' + stat.name );
  next ( );
} );
// delete the reports xml file
fs.readdir ( xmlFolder, ( xmlFolderErr, xmlFolderFiles ) => {
  xmlFolderFiles.forEach ( xmlFolderFile => {
    var xmlFilePrefix = xmlFolderFile.substr ( 0, xmlFolderFile.lastIndexOf ( "deleteReports" ) );
    var xmlSpecificFile = xmlFilePrefix + "deleteReports.xml";
    fs.unlink ( fileLocation + 'reports/' + xmlSpecificFile, function ( err ) { } );
  } );
} );
walker.on ( 'end', function (  ) {
  for ( let file = 0; file < files.length; file++ ) {
    readHtmlFile ( files[ file ], function ( xmlError, xmlFiles ) {
      var xmlData = xmlFiles;
      var extractedData = "";
      var parser = new xml2js.Parser (  );
      parser.parseString ( xmlData, function ( convertionErr, convertionResult ) {
        // Extract the json value of xml file from the data element
        extractedData = convertionResult.testsuites.testsuite;
        var scriptName = extractedData[ 0 ].testcase[ 0 ].$.name;
        var testSuiteName = extractedData[ 0 ].$.name;
        var scriptsTitle = testSuiteName.substring ( testSuiteName.lastIndexOf ( "." ) + 1 );
        var errorCount = extractedData[ 0 ].$.errors;
        var testsCount = extractedData[ 0 ].$.tests;
        var skipped = extractedData[ 0 ].$.skipped;
        var elapsedTime = extractedData[ 0 ].testcase[ 0 ].$.time;
        var startTime = extractedData[ 0 ].$.timestamp;
        var package = extractedData[ 0 ].$.package;
        // add the script error count from xml file
        errCount += parseInt ( errorCount );
        // add the script executed count from xml file
        testCount += parseInt ( testsCount );
        // add the script name from xml file
        scriptsName += scriptName + ' / ';
        // add the script skipped count from xml file
        skippedCount += parseInt ( skipped );
        // get the Total duration time 
        executedTime += parseFloat ( elapsedTime );
        strtTime += startTime + ' / ';
        var startTimeData = strtTime.substring ( 0, strtTime.indexOf ( '/' ) );
        //get the result from the excel sheet
        var excelName = fileLocation + package + ".xlsx";
        xmlOptions = require ( "xls-to-json" );
        xmlOptions ( {
          input: excelName,
          output: fileLocation + 'output.json',
          sheet: scriptsTitle,
          isColOriented: false
        }, function ( excelErr, excelData ) {
          if ( excelErr ) {
            console.error ( excelErr );
          }
          for ( var result = 0; result < excelData.length; result++ ) {
            resultCount.push ( excelData[ result ].Result );
          }
          console.log ( resultCount );
          // Add the total pass and fail count from spreadsheet
          var sheetPassCount = resultCount.toString().match ( /PASS/g );
          var sheetFailCount = resultCount.toString().match ( /FAIL/g );
          if ( sheetPassCount == null ) {
            passCount += parseInt ( 0 );
            if ( sheetFailCount == null ) {
              failCount += parseInt ( 0 );
            }
            else {
              var overallFailCount = resultCount.toString().match ( /FAIL/g ).length;
              failCount += parseInt ( overallFailCount );
            }
          }
          else {
            var overallPassCount = resultCount.toString().match ( /PASS/g ).length;
            passCount += parseInt ( overallPassCount );
            if ( sheetFailCount != null ) {
              var overallFailCount = resultCount.toString().match ( /FAIL/g ).length;
              failCount += parseInt ( overallFailCount );
            }
            else {
              failCount += parseInt ( 0 );
            } 
          }
          //pass the overall count to the html file
          readHtmlFile ( fileLocation + 'mailOptions.html', function ( htmlErr, htmlFiles ) {
            var template = handlebars.compile ( htmlFiles );
            var replacements = {
              "name": scriptsName,
              "passCount": passCount,
              "errorCount": errCount,
              "failureCount": failCount,
              "testsCount": testCount,
              "skipCount": skippedCount,
              "executedTime": executedTime,
              "startTime": startTimeData
            };
            var htmlToSend = template ( replacements );
            if ( file == files.length -1 ) {
              fs.writeFile ( fileLocation + "mailOptions - Copy.html", htmlToSend, function ( htmlWriteErr ) {
                if ( htmlWriteErr ) {
                  throw htmlWriteErr;
                }
                else {
                  console.log ( "HTML File written successfully" );
                  //screenshot the generated html report
                  webshot ( 'file:///C:/Users/SRAUTOMATION/Desktop/Dev/nightwatch/node_modules/nightwatch/mailOptions%20-%20Copy.html', fileLocation + 'Report.jpg', htmlOptions, function ( imgErr ) {
                    // screenshot now saved to Report.png 
                    if ( imgErr ) {
                      throw imgErr;
                    }
                    else {
                      console.log ( "Screenshot created successfully" );
                    }
                  } );
                }
              } );
            }
          } );
          resultCount.length = 0;
        } );
      } );
    } );
  }
} );