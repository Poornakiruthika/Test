//this function is for checking the fullscreen functionality in videoplayer
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets[ 'Fullscreen' ];
var url = [ ];
module.exports = {
  tags: [ 'fullscreen' ],
  'Fullscreen': function ( fullScreen ) {
    //Read values from Excel File
    for ( z in worksheet ) {
      if ( z[ 0 ] === '!' ) continue;
      //Read URL from the excel file
      if ( z.includes( 'A' ) ) {
        url.push ( worksheet[ z ].v );
      }
    }
    if ( url.length > 0 ) {
      for ( var excelColumn = 1, excelRow = 1; excelColumn != url.length; excelColumn++ ) {
        fullScreen.url ( url[ excelColumn ] ).
        playvideo ( ).
        //Click the full screen button visible in the player
        waitForElementVisible ( ".unimatrix-video-full-screen-button", 9000, false ).
        click ( ".unimatrix-video-full-screen-button" ).
        pause ( 9000 ).
        //Check the video is in fullscreen mode
        getAttribute ( ".gadget-artifact-container > div", "fullscreen", function ( getMode ) {
          if ( getMode.value == 'true' ) {
            fullScreen.writeToExcelPass ( 'videoplayer.xlsx', 'Fullscreen', ++excelRow, 2 );
          }
          else {
          	//write the fail status in the excel sheet as the fullscreen mode not working as defined
            this.verify.fail ( getMode.value, 'true', 'Full screen mode is not working' );
            fullScreen.writeToExcelFail ( 'videoplayer.xlsx', 'Fullscreen', ++excelRow, 2, 3, "ActualResult: '" + getMode.value + "'. ExpectedResult: 'true' ( Full screen mode is not working ) " );
          }
        } );
      }
    }
    fullScreen.end( );
  },
};