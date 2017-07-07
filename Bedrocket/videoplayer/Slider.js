//this function is for checking the slider in the videoplayer
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets[ 'Slider' ];
var url = [ ];
module.exports = {
  tags: [ 'slider' ],
  'PlayerProgressbar': function ( timeslider ) {
    //Read values from Excel File
    for ( z in worksheet ) {
      if ( z[ 0 ] === '!' ) continue;
      //Read URL from excel file
      if ( z.includes ( 'A' ) ) {
        url.push ( worksheet[ z ].v );
      }
    }
    if ( url.length > 0 ) {
      console.log ( "Excel row count: " + url.length );
      for ( var excelColumn = 1, excelRow = 1; excelColumn != url.length; excelColumn++ ) {
        timeslider.url ( url[ excelColumn ] ).
        playvideo ( ).
        pause ( 5000 ).
        moveToElement (".unimatrix-video-control-bar", 0, 0).
        pause( 9000 ).
        waitForElementVisible ( ".unimatrix-video-time-slider-container", 9000, false ).
        pause ( 9000 ).
        //Get the video player current time 
        getText ( ".unimatrix-video-current-time-display > span", function ( getCurrentTime ) {
          var videoPlaytime = getCurrentTime.value;
          timeslider.
          slider ( ".unimatrix-video-time-slider-progress-bar-handle", 70, 0 ).
          //Get the video player current time after drag and drop
          getText ( ".unimatrix-video-current-time-display > span", function ( getForwardTime ) {
            var videoForwardPlaytime = getForwardTime.value;
            //Check the video moves forward functionality
            if ( videoPlaytime < videoForwardPlaytime ) {
              this.verify.ok ( true, 'Video moves forward successfully' );
              timeslider.
              slider ( ".unimatrix-video-time-slider-progress-bar-handle", 4, 0 ).
              //Check the video moves backward functionality
              getText ( ".unimatrix-video-current-time-display > span", function ( getBackwardTime ) {
                var videoBackwardPlaytime = getBackwardTime.value;
                if ( videoForwardPlaytime > videoBackwardPlaytime ) {
                  timeslider.writeToExcelPass ( 'videoplayer.xlsx', 'Slider', ++excelRow, 2 );
                }
                else {
                  this.verify.fail ( undefined, undefined, 'Videoplayer fail to move backward' );
                  timeslider.writeToExcelFail ( 'videoplayer.xlsx', 'Slider', ++excelRow, 2, 3, "ActualResult: '" + videoForwardPlaytime +
                    "' <= '" + videoBackwardPlaytime + "'. ExpectedResult: '" + videoForwardPlaytime + "' > '" + videoBackwardPlaytime +
                    "'  ( Player fail to move backward in progress bar )" );
                }
              } );
            }
            else {
              this.verify.fail ( undefined, undefined, "Videoplayer fail to move forward" );
              timeslider.writeToExcelFail ( 'videoplayer.xlsx', 'Slider', ++excelRow, 2, 3, "ActualResult: '" + videoPlaytime + "' >= '" +
                videoPlaytime + "'. ExpectedResult: '" + videoPlaytime + "' < '" + videoForwardPlaytime +
                "'  (  Player fail to move forward in progress bar )" );
            }
          } );
        } );
      }
    }
    timeslider.end (  );
  }
};