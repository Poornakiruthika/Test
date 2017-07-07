//this function is for checking the playthrough functionality in videoplayer
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
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
      //Read URL from the Excel file
      if ( z.includes ( 'A' ) ) {
        url.push ( worksheet[ z ].v );
      }
    }
    if ( url.length > 0 ) {
      console.log ( "Excel row count: " + url.length );
      for ( var excelColumn = 1, excelRow = 1; excelColumn != url.length; excelColumn++ ) {
        playthrough.url ( url[ excelColumn ] ).
        url ( function ( getUrl ) {
          //Check the string "endslate=true&playthrough=true" present in URL 
          var urlstr = getUrl.value;
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
                        if ( playthroughResponse.status == 0 ) {
                          this.verify.ok ( true, "Playthrough functionality is working" );
                          //write the pass status in excel sheet as the playthrough functionality working as defined
                          playthrough.writeToExcelPass ( 'videoplayer.xlsx', 'Playthrough', ++excelRow, 2 );
                        }
                        else {
                          this.verify.fail ( playthroughResponse.status, '0', "Playthrough functionality is not working" );
                          //write the fail status in excel sheet as the error in playthrough functionality 
                          playthrough.writeToExcelFail ( 'videoplayer.xlsx', 'Playthrough', ++excelRow, 2, 3, "ActualResult: '" +
                            playthroughResponse.value +
                            "'.ExpectedResult: 'True'. 'Error in the Loading of Next level Videos automatically ( Playthrough functionality is not working )'" );
                        }
                      } );
                    }
                    else {
                      this.verify.fail ( endslateResponse.value, true,
                        "Player doesn't display the next relevant item after reach the end of the video" );
                      //write the fail status in excel sheet as the error in displaying the next level videos automatically
                      playthrough.writeToExcelFail ( 'videoplayer.xlsx', 'Playthrough', ++excelRow, 2, 3, "ActualResult: '" +
                        endslateResponse.value +
                        "'.ExpectedResult: 'True' ( Player doesn't display the next relevant item after reach the end of the video ) " );
                    }
                  } );
                }
                else {
                  this.verify.fail ( playerCurrentTime.value, playerDurationTime.value, "Error in the Player duration time" );
                  //write the fail status in excel sheet as the player fail to reach the end of the video 
                  playthrough.writeToExcelFail ( 'videoplayer.xlsx', 'Playthrough', ++excelRow, 2, 3, "ActualResult: '" + playerCurrentTime.value +
                    "'.ExpectedResult: '" + playerDurationTime.value + "' Player doesn't reach the end of the video " );
                }
              } );
            } );
          }
          else {
            this.verify.fail ( urlData, "playthrough=true", "Player doesn't support playthrough option" );
            //write the fail status in excel sheet as the player fail to support playthrough option
            playthrough.writeToExcelFail ( 'videoplayer.xlsx', 'Playthrough', ++excelRow, 2, 3, "ActualResult: '" + urlData +
              "'.ExpectedResult: 'playthrough=true' ( Player doesn't support playthrough option )" );
          }
        } );
      }
    }
    playthrough.end ( );
  },
};