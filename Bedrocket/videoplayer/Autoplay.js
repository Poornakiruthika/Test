//this function is to check the Autoplay functionality in videoplayer 
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx' );
var worksheet = workbook.Sheets [ 'Autoplay' ];
var url =  [ ];
module.exports = {
  tags: [ 'autoplay' ],
  'Autoplay': function  ( autoplay ) {
    //Read values from Excel File
    for ( z in worksheet ) {
      if ( z [ 0 ] === '!' ) continue;
      //Read URL from excel sheet
      if ( z.includes ( 'A' ) ) {
        url.push ( worksheet [ z ].v  ) ;
      }
    }
    if ( url.length > 0 ) {
      var excelLength = url.length - 1;
      //get the excel data row count
      console.log ( "Excel row count: " + excelLength );
      for ( var excelColumn = 1, excelRow = 1; excelColumn != excelLength; excelColumn++ ) {
        autoplay.url ( url[ excelColumn ] ).
        url ( function  ( getUrl ) {
          //Check the string "autoplay=true" present in URL 
          var urlstr = getUrl.value;
          var urlData = urlstr.match ( /autoplay=true|autoplay=1|autoplay=false|autoplay=0/ );
          if ( urlData == "autoplay=true" || urlData == "autoplay=1" ) {
            autoplay.pause ( 15000 ).
            useXpath().            
            waitForElementVisible ( "//div[@class='unimatrix-video-controls']/div/div[@class='unimatrix-video-control-bar']", 30000, false, function () {} ).
            //Get the current time of the videoplayer
            moveToElement ( "//div[contains(@class,'unimatrix-video-current-time-display')]", 0, 0 ).
            pause ( 5000 ).
            useCss().
            getText ( '.unimatrix-video-current-time-display > span', function ( currenttime ) {
              var autoPlayTime = currenttime.value;
              //Check the video playing automatically       
              if ( autoPlayTime > '00:00' ) {
                this.verify.ok ( true, 'Autoplay functionality is working' );
                autoplay.writeToExcelPass ( 'videoplayer.xlsx', 'Autoplay', ++excelRow, 2 );
              }
              else {
                //write the fail status in excel spreadsheet 
                this.verify.fail ( autoPlayTime, 'Current time should be greater then "00:00" ', 'Autoplay functionality is not working' );
                autoplay.writeToExcelFail ( 'videoplayer.xlsx', 'Autoplay', ++excelRow, 2, 3, "ActualResult: '" + autoPlayTime +
                  "'. ExpectedResult: 'Current time should be greater then 00:00' ( Autoplay functionality is not working as the video fail to play automatically )" );
              }
            } );
          }
          //write the pass status in excel spreadsheet
          else if ( urlData == 'autoplay=false' || urlData == 'autoplay=0' ) {
            autoplay.waitForElementVisible ( '.unimatrix-video-controls-indicator-icon', 9000, false, function ( urlDataError ) {
              if ( urlDataError.value == true ) {
                autoplay.writeToExcelPass ( 'videoplayer.xlsx', 'Autoplay', ++excelRow, 2 );
              }
              else {
                autoplay.writeToExcelFail ( 'videoplayer.xlsx', 'Autoplay', ++excelRow, 2, 3, "ActualResult: '" + urlDataError.value +
                  "'. ExpectedResult: 'true' ( 'Autoplay=false' or 'Autoplay=0' functionality is not working as expected )" );
              }
            } );
          }
          else {
            //check the player support autoplay option
            this.verify.fail ( urlData, 'autoplay=true', 'Player does not support autoplay option' );
            autoplay.writeToExcelFail ( 'videoplayer.xlsx', 'Autoplay', ++excelRow, 2, 3, "ActualResult: '" + urlData +
              "'. ExpectedResult: 'autoplay=true' in the URL  ( Player doesn't support autoplay option )" );
          }
        } );
      }
    }
    autoplay.end ( );
  },
};