//this function is to check the Endslate functionality in videoplayer 
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
if ( typeof require !== 'undefined') XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx' );
var worksheet = workbook.Sheets[ 'Endslate' ];
var url = [ ];
module.exports = {
  tags: [ 'endslate' ],
  'Endslate': function ( endslate ) {
    //Read values from Excel File
    for ( z in worksheet ) {
      if ( z[ 0 ] === '!' ) continue;
      //Read URL from excel sheet
      if ( z.includes ( 'A' ) ) {
        url.push ( worksheet[ z ].v );
      }
    }
    if ( url.length > 0 ) {
      console.log ( "Excel row count: " + url.length );
      for ( var excelColumn = 1, excelRow = 1; excelColumn != url.length; excelColumn++ ) {
        endslate.url ( url[ excelColumn ] ).
        url ( function ( getUrl ) {
          //Check the string "endslate=true" present in URL 
          var urlstr = getUrl.value;
          var urlData = urlstr.match ( /endslate=true/g );
          if ( urlData == "endslate=true" ) {
            endslate.playvideo ( ).
            //Get the duration of the videoplayer
            getText ( ".unimatrix-video-duration-display > span", function ( playerDurationTime ) {
              endslate.
              //move the slider to the end of the video time
              slider ( ".unimatrix-video-time-slider-container", 700, 0 ).
              getText ( ".unimatrix-video-current-time-display > span", function ( playerCurrentTime ) {
                //Check the video reach to the end of the slider
                if ( playerCurrentTime.value == playerDurationTime.value ) {
                  endslate.pause ( 5000 ).
                  //Check the gadgets-endslate visibility 
                  waitForElementVisible ( ".gadgets-endslate-overlay-container", 5000, false, function ( endslateResponse ) {
                    if ( endslateResponse.value == true ) {
                      this.verify.ok ( true, "Endslate functionality is working" );
                      endslate.writeToExcelPass ( 'videoplayer.xlsx', 'Endslate', ++excelRow, 2 ).
                      waitForElementVisible ( ".endslate-close-button", 5000, false, function ( ) {} ).
                      //Click the endslate close button 
                      click ( ".endslate-close-button" ).
                      pause ( 2000 ).
                      waitForElementVisible ( ".load-indicator", 5000, false, function ( ) {} );
                    }
                    else {
                      //check the videoplayer display the next level of relevant videos
                      endslate.writeToExcelFail ( 'videoplayer.xlsx', 'Endslate', ++excelRow, 2, 3,
                        "Player doesn't display the Next level Videos and the Endslate functionality is not working" );
                    }
                  } );
                }
                else {
                  //check the videoplayer reach the end of the video which matches with the player duration time
                  this.verify.fail ( playerCurrentTime.value, playerDurationTime.value,
                    "Timeout issue as the player doesn't reach the end of the video to check the endslate functionality" );
                  endslate.writeToExcelFail ( 'videoplayer.xlsx', 'Endslate', ++excelRow, 2, 3, "ActualResult: '" + playerCurrentTime.value +
                    "'.ExpectedResult: '" + playerDurationTime.value +
                    "'   ( Timeout issue as the player doesn't reach the end of the video to check the endslate functionality ) " );
                }
              } );
            } );
          }
          else {
            //check the videoplayer support the endslate option
            this.verify.fail ( urlData, "endslate=true", "Player doesn't support endslate option" );
            endslate.writeToExcelFail ( 'videoplayer.xlsx', 'Endslate', ++excelRow, 2, 3, "ActualResult: '" + urlData +
              "'.ExpectedResult: 'endslate=true' ( Player doesn't support endslate option )" );
          }
        } );
      }
    }
    endslate.end ( );
  },
};