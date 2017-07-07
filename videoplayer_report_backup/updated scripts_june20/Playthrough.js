var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets[ 'Playthrough' ];
var url = [ ];
module.exports = {
  tags: [ 'playthrough' ],
  'Playthrough': function ( playthrough ) {
    //Read values from Excel File
    for ( z in worksheet ) {
      if ( z[ 0 ] === '!' ) continue;
      //Read URL  
      if ( z.includes ( 'A' ) ) {
        url.push ( worksheet[ z ].v );
      }
    }
    if ( url.length > 0 ) {
      console.log ( "Excel row count: " + url.length );
      console.log ( "Excel row count:data: " + excelColumn);
      for ( var excelColumn = 1, excelRow = 1; excelColumn != url.length; excelColumn++ ) {
        playthrough.url ( url[ excelColumn ] ).
        url ( function ( getUrl ) {
          //Check the string "autoplay=true" present in URL 
          var urlstr = getUrl.value;
          console.log ( urlstr );
          var urlData = urlstr.match ( /endslate=true&playthrough=true/g );
          if ( urlData == "endslate=true&playthrough=true" ) {
            playthrough.playvideo ( ).
            //Get the duration of the videoplayer
            getText ( ".unimatrix-video-duration-display > span", function ( playerDurationTime ) {
              playthrough.
              slider ( ".unimatrix-video-time-slider-container", 700, 0 ).
              getText ( ".unimatrix-video-current-time-display > span", function ( playerCurrentTime ) {
                //Check the video reach to the end of the slider
                if ( playerCurrentTime.value == playerDurationTime.value ) {
                  playthrough.
                  pause ( 2000 ).
                  waitForElementVisible ( ".endslate-up-next-play > #endslate-spinner", 5000, false, function ( endslateResponse ) {
                    if ( endslateResponse.value == true ) {
                      playthrough.
                      pause ( 10000 ).
                      //Check the next level of video playing automatically
                      waitForElementNotPresent ( ".endslate-up-next-play > #endslate-spinner", 1000, false, function ( playthroughResponse ) {
                        if ( playthroughResponse.value == true ) {
                          this.verify.ok ( true, "Playthrough functionality is working" );
                          playthrough.writeToExcelPass ( 'videoplayer.xlsx', 'Playthrough', ++excelRow, 2 );
                        }
                        else {
                          this.verify.fail ( playthroughResponse.value, true, "Playthrough functionality is not working" );
                          playthrough.writeToExcelFail ( 'videoplayer.xlsx', 'Playthrough', ++excelRow, 2, 3, "ActualResult: '" +
                            playthroughResponse.value +
                            "'.ExpectedResult: 'True'. 'Error in the Loading of Next level Videos automatically ( Playthrough functionality is not working )'" );
                        }
                      } );
                    }
                    else {
                      this.verify.fail ( endslateResponse.value, true,
                        "Player doesn't display the next relevant item after reach the end of the video" );
                      playthrough.writeToExcelFail ( 'videoplayer.xlsx', 'Playthrough', ++excelRow, 2, 3, "ActualResult: '" +
                        endslateResponse.value +
                        "'.ExpectedResult: 'True' ( Player doesn't display the next relevant item after reach the end of the video ) " );
                    }
                  } );
                }
                else {
                  this.verify.fail ( playerCurrentTime.value, playerDurationTime.value, "Error in the Player duration time" );
                  playthrough.writeToExcelFail ( 'videoplayer.xlsx', 'Playthrough', ++excelRow, 2, 3, "ActualResult: '" + playerCurrentTime.value +
                    "'.ExpectedResult: '" + playerDurationTime.value + "' Player doesn't reach the end of the video " );
                }
              } );
            } );
          }
          else {
            this.verify.fail ( urlData, "playthrough=true", "Player doesn't support playthrough option" );
            playthrough.writeToExcelFail ( 'videoplayer.xlsx', 'Playthrough', ++excelRow, 2, 3, "ActualResult: '" + urlData +
              "'.ExpectedResult: 'playthrough=true' ( Player doesn't support playthrough option )" );
          }
        } );
      }
    }
    playthrough.end ( );
  },
};