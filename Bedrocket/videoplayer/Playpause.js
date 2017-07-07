//this function is for checking the playpause button functionality in videoplayer
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets [ 'Playpause' ];
var url =  [ ];
module.exports = {
  tags: [ 'playpause' ],
  'Player-Playpause': function ( playpause ) {
    //Read values from Excel File
    for ( z in worksheet ) {
      if ( z [ 0 ] === '!' ) continue;
      //Read URL from Excel file
      if ( z.includes ( 'A' ) ) {
        url.push ( worksheet [ z ].v );
      }
    }
    if ( url.length > 0 ) {
      console.log ( "Excel row count: " + url.length );
      for ( var excelColumn = 1, excelRow = 1; excelColumn != url.length; excelColumn++ ) {
        playpause.url ( url[ excelColumn ] ).
        playvideo ( ).
        moveToElement ( ".unimatrix-video-control-bar", 0, 0 ).
        //Check the video gets pause by clicking pause button
        waitForElementVisible ( ".unimatrix-video-play-pause-button-icon", 9000 ).
        pause ( 7000 ).
        click ( ".unimatrix-video-play-pause-button-icon" ).
        pause ( 7000 ).
        waitForElementVisible ( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon", 6000, false, function ( clickToPauseButton ) {
          if ( clickToPauseButton.value == true ) {
            this.verify.ok ( "Pause option is working while clicking pause button" );
            //Get the video player current time while pause
            playpause.getText ( ".unimatrix-video-current-time-display > span", function ( getPauseTime ) {
              var videoPauseTime = getPauseTime.value;
              playpause.waitForElementVisible ( ".unimatrix-video-play-pause-button-icon", 9000 ).
              pause ( 3000 ).
              click ( ".unimatrix-video-play-pause-button-icon" ).
              pause ( 3000 )
              //Get the video player current time after clicking play button
              playpause.getText ( ".unimatrix-video-current-time-display > span", function ( clickToPlayButton ) {
                var videoPlayTime = clickToPlayButton.value;
                //Check the video gets play by clicking play button
                if ( videoPauseTime < videoPlayTime ) {
                  this.verify.ok ( true, 'Play option is working while clicking play button' );
                  playpause.
                  pause ( 3000 ).
                  click ( ".unimatrix-video-controls" ).
                  //Check the video gets pause by clicking the video
                  waitForElementVisible ( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon", 6000, false, function ( 
                    clickToPauseInVideo ) {
                    if ( clickToPauseInVideo.value == true ) {
                      this.verify.ok ( "Pause option is working while clicking video" );
                      playpause.getText ( ".unimatrix-video-current-time-display > span", function ( getPauseTimeInVideo ) {
                        var videoPauseTime = getPauseTimeInVideo.value;
                        playpause.waitForElementVisible ( ".unimatrix-video-controls", 9000 ).
                        pause ( 3000 ).
                        click ( ".unimatrix-video-controls" ).
                        pause ( 3000 )
                        playpause.getText ( ".unimatrix-video-current-time-display > span", function ( clickToPlayInVideo ) {
                          var videoPlayTime = clickToPlayInVideo.value;
                          //Check the video gets play by clicking the video
                          if ( videoPauseTime < videoPlayTime ) {
                            this.verify.ok ( true, 'Play option is working while clicking video' );
                            playpause.click ( ".unimatrix-video-play-pause-button-icon" ).
                            pause ( 7000 ).
                            slider ( ".unimatrix-video-time-slider-progress-bar-handle", 70, 0 ).
                            waitForElementVisible ( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon",
                              6000, false,
                              function ( moveForwardInPause ) {
                                if ( moveForwardInPause.value == true ) {
                                  this.verify.ok ( "Pause option is working while clicking progressbar forward" );
                                  playpause.
                                  slider ( ".unimatrix-video-time-slider-progress-bar-handle", 4, 0 ).
                                  waitForElementVisible ( 
                                    ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon", 6000,
                                    false,
                                    function ( moveBackwardInPause ) {
                                      if ( moveBackwardInPause.value == true ) {
                                        this.verify.ok ( "Pause option is working while clicking progressbar backward" );
                                        playpause.click ( ".unimatrix-video-time-slider-progress-bar-handle" ).
                                        pause ( 7000 ).
                                        getText ( ".unimatrix-video-current-time-display > span", function ( getTimeBeforeForward ) {
                                          playpause.
                                          slider ( ".unimatrix-video-time-slider-progress-bar-handle", 70, 0 ).
                                          pause ( 8000 ).
                                          //Get the video player current time after drag and drop
                                          getText ( ".unimatrix-video-current-time-display > span", function ( 
                                            getTimeAfterForward ) {
                                            //Check the video moves forward functionality
                                            if ( getTimeBeforeForward.value < getTimeAfterForward.value ) {
                                              this.verify.ok ( true,
                                                'Play option is working while clicking progressbar forward' );
                                              playpause.
                                              click ( ".unimatrix-video-time-slider-progress-bar-handle" ).
                                              pause ( 7000 ).
                                              getText ( ".unimatrix-video-current-time-display > span", function ( 
                                                getTimeBeforeBackward ) {
                                                playpause.
                                                slider ( ".unimatrix-video-time-slider-progress-bar-handle", 4, 0 ).
                                                pause ( 4000 ).
                                                //Get the video player current time after drag and drop
                                                getText ( ".unimatrix-video-current-time-display > span", function ( 
                                                  getTimeAfterBackward ) {
                                                  if ( getTimeBeforeBackward.value > getTimeAfterBackward.value ) {
                                                    this.verify.ok ( true,
                                                      'Play option is working while clicking progressbar backward'
                                                     );
                                                    ////write the pass status to excel sheet as the playpause button working as defined
                                                    playpause.writeToExcelPass ( 'videoplayer.xlsx', 'Playpause', ++
                                                      excelRow, 2 );
                                                  }
                                                  else {
                                                    //write the fail status to excel sheet as the error in play button
                                                    playpause.writeToExcelFail ( 'videoplayer.xlsx', 'Playpause', ++
                                                      excelRow, 2, 3, "ActualResult: '" + getTimeAfterBackward.value +
                                                      ". ExpectedResult: '" + getTimeBeforeBackward.value +
                                                      "' should be greater than " + getTimeAfterBackward.value +
                                                      "' ( Play option is not working while clicking progressbar backward"
                                                     );
                                                  }
                                                } );
                                              } );
                                            }
                                            else {
                                              //write the fail status to excel sheet as the error in play button
                                              playpause.writeToExcelFail ( 'videoplayer.xlsx', 'Playpause', ++excelRow, 2, 3,
                                                "ActualResult: '" + getTimeAfterForward.value + ". ExpectedResult: '" +
                                                getTimeBeforeForward.value + "' should be lesser than " +
                                                getTimeAfterForward.value +
                                                "' ( Play option is not working while clicking progressbar forward" );
                                            }
                                          } );
                                        } );
                                      }
                                      else {
                                        //write the fail status to excel sheet as the error in pause button
                                        playpause.writeToExcelFail ( 'videoplayer.xlsx', 'Playpause', ++excelRow, 2, 3,
                                          "ActualResult: '" + moveBackwardInPause.value +
                                          ". ExpectedResult: 'True'  ( Pause option is not working while clicking progressbar backward"
                                         );
                                      }
                                    } );
                                }
                                else {
                                  //write the fail status to excel sheet as the error in pause button
                                  playpause.writeToExcelFail ( 'videoplayer.xlsx', 'Playpause', ++excelRow, 2, 3, "ActualResult: '" +
                                    moveForwardInPause.value +
                                    ". ExpectedResult: 'True'  ( Pause option is not working while clicking progressbar forward" );
                                }
                              } );
                          }
                          else {
                            //write the fail status to excel sheet as the error in play button
                            playpause.writeToExcelFail ( 'videoplayer.xlsx', 'Playpause', ++excelRow, 2, 3, "ActualResult: '" +
                              videoPauseTime + ". ExpectedResult: '" + videoPlayTime + "greater than '" + videoPauseTime +
                              "'  ( Play option is not working while clicking video" );
                          }
                        } );
                      } );
                    }
                    else {
                      //write the fail status to excel sheet as the error in pause button
                      playpause.writeToExcelFail ( 'videoplayer.xlsx', 'Playpause', ++excelRow, 2, 3, "ActualResult: '" + clickToPauseInVideo.value +
                        "'.ExpectedResult: 'True'  ( Pause option is not working while clicking video ) " );
                    }
                  } );
                }
                else {
                  //write the fail status to excel sheet as the error in play button
                  playpause.writeToExcelFail ( 'videoplayer.xlsx', 'Playpause', ++excelRow, 2, 3, "ActualResult: '" + videoPauseTime +
                    ". ExpectedResult: '" + videoPlayTime + "greater than '" + videoPauseTime +
                    "'  ( Play option is not working while clicking play button )" );
                }
              } );
            } );
          }
          else {
            //write the fail status to excel sheet as the error in pause button
            playpause.writeToExcelFail ( 'videoplayer.xlsx', 'Playpause', ++excelRow, 2, 3, "ActualResult: '" + clickToPauseButton.value +
              "'.ExpectedResult: 'True'  ( Pause option is not working while clicking pause button ) " );
          }
        } );
      }
    }
    playpause.end ( );
  },
};