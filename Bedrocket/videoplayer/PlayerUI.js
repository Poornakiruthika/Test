//this function is for checking the UI in videoplayer
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx' );
var worksheet = workbook.Sheets[ 'PlayerUI' ];
var url = [ ];
module.exports = {
  tags: [ 'playerUI' ],
  'VideoplayerUI': function ( playerUI ) {
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
        playerUI.url ( url[ excelColumn ] ).
        url ( function ( getUrl ) {
          //Check the branding and the title visible in the videoplayer 
          var urlstr = getUrl.value;
          playerUI.
          waitForElementVisible ( ".branding-logo", 10000, false, function ( branding ) {
            if ( branding.value == true ) {
              playerUI.click ( ".branding-logo" ).
              pause ( 5000 ).
              //switch to the secondary window to check the branding link
              switchToSecondaryWindow ( 'sportsrocket.com' ).
              closeWindow ( ).
              switchToPrimaryWindow ( 'boxxspring' ).
              playvideo ( ).
              moveToElement ( ".unimatrix-video-control-bar", 0, 0 ).
              //Check the visibility of play-pause button
              waitForElementVisible ( ".unimatrix-video-play-pause-button-icon", 1000, false, function ( playpause ) {
                if ( playpause.value == true ) {
                  playerUI.
                  //Check the visibility of curren time
                  waitForElementVisible ( ".unimatrix-video-current-time-display", 1000, false, function ( currentTime ) {
                    if ( currentTime.value == true ) {
                      playerUI.
                      //Check the visibility of time slider container
                      waitForElementVisible ( ".unimatrix-video-time-slider-container", 1000, false, function ( timeSlider ) {
                        if ( timeSlider.value == true ) {
                          playerUI.
                          //Check the visibility of video duration
                          waitForElementVisible ( ".unimatrix-video-duration-display", 1000, false, function ( videoDuration ) {
                            if ( videoDuration.value == true ) {
                              playerUI.
                              //Check the visibility of video sharing
                              waitForElementVisible ( ".unimatrix-video-sharing-button", 1000, false, function ( share ) {
                                if ( share.value == true ) {
                                  playerUI.
                                  //Check the visibility of video volume
                                  waitForElementVisible ( ".unimatrix-video-volume-button", 1000, false, function ( volume ) {
                                    if ( volume.value == true ) {
                                      playerUI.
                                      //Check the visibility of video full screen
                                      waitForElementVisible ( ".unimatrix-video-full-screen-button", 1000, false, function ( 
                                        fullScreen ) {
                                        if ( fullScreen.value == true ) {
                                         var urlData = urlstr.match ( /title=true/g );
                                          // check the title of the video
                                          if ( urlData == "title=true" ) {
                                            playerUI.
                                            click ( ".unimatrix-video-play-pause-button-icon" ).
                                            pause ( 5000 ).
                                            waitForElementVisible ( '.unimatrix-header-title > span', 10000, false, function ( videoTitle ) {
                                                if ( videoTitle.value == true ) {
                                                  playerUI.writeToExcelPass ( 'videoplayer.xlsx', 'PlayerUI', ++
                                                    excelRow, 2 );
                                                }
                                                else {
                                                	this.verify.fail ( videoTitle.value, "true", "Player doesn't display the video title" );
                                                  playerUI.
                                                  writeToExcelFail ( 'videoplayer.xlsx', 'PlayerUI', ++excelRow, 2, 3,
                                                    "ActualResult: '" + videoTitle.value +
                                                    "'.ExpectedResult: 'true'  ( Player doesn't display the video title ) "
                                             );
                                                }
                                              } );
                                          }
                                          else {
                                            // return the pass status of UI
                                          	playerUI.writeToExcelPass ( 'videoplayer.xlsx', 'PlayerUI', ++excelRow, 2 );
                                          }
                                          
                                        }
                                        else {
                                        	// return the fail status of fullscreen to excel sheet
                                        	this.verify.fail ( fullScreen.value, "true", "Player fail to display the fullScreen icon" );
                                          playerUI.writeToExcelFail ( 'videoplayer.xlsx', 'PlayerUI', ++excelRow, 2, 3,
                                            "ActualResult: '" + fullScreen.value +
                                            "'.ExpectedResult: 'true'  ( Player fail to display the fullScreen icon ) " );
                                        }
                                      } );
                                    }
                                    else {
                                    	// return the fail status of volume to excel sheet
                                    	this.verify.fail ( volume.value, "true", "Player fail to display the volume icon" );
                                      playerUI.writeToExcelFail ( 'videoplayer.xlsx', 'PlayerUI', ++excelRow, 2, 3,
                                        "ActualResult: '" + volume.value +
                                        "'.ExpectedResult: 'true'  ( Player fail to display the volume icon ) " );
                                    }
                                  } );
                                }
                                else {
                                	// return the fail status of share icon visibility to excel sheet
                                	this.verify.fail ( share.value, "true", "Player fail to display the share icon" );
                                  playerUI.writeToExcelFail ( 'videoplayer.xlsx', 'PlayerUI', ++excelRow, 2, 3, "ActualResult: '" +
                                    share.value + "'.ExpectedResult: 'true'  ( Player fail to display the share icon ) " );
                                }
                              });
                            }
                            else {
                            	// return the fail status of video duration to excel sheet
                            	this.verify.fail ( videoDuration.value, "true", "Player fail to display the videoDuration icon" );
                              playerUI.writeToExcelFail ( 'videoplayer.xlsx', 'PlayerUI', ++excelRow, 2, 3, "ActualResult: '" +
                                videoDuration.value + "'.ExpectedResult: 'true'  ( Player fail to display the videoDuration icon ) "
                        );
                            }
                          });
                        }
                        else {
                        	// return the fail status of time slider to excel sheet
                        	this.verify.fail ( timeSlider.value, "true", "Player fail to display the timeSlider icon" );
                          playerUI.writeToExcelFail ( 'videoplayer.xlsx', 'PlayerUI', ++excelRow, 2, 3, "ActualResult: '" + timeSlider.value +
                            "'.ExpectedResult: 'true' ( Player fail to display the timeSlider icon) " );
                        }
                      });
                    }
                    else {
                    	// return the fail status of current time to excel sheet
                    	this.verify.fail ( currentTime.value, "true", "Player fail to display the currentTime icon" );
                      playerUI.writeToExcelFail ( 'videoplayer.xlsx', 'PlayerUI', ++excelRow, 2, 3, "ActualResult: '" + currentTime.value +
                        "'.ExpectedResult: 'true'  ( Player fail to display the currentTime icon) " );
                    }
                  });
                }
                else {
                	// return the fail status of playpause to excel sheet
                	this.verify.fail ( playpause.value, "true", "Player fail to display the playpause icon" );
                  playerUI.writeToExcelFail ( 'videoplayer.xlsx', 'PlayerUI', ++excelRow, 2, 3, "ActualResult: '" + playpause.value +
                    "'.ExpectedResult: 'true'  ( Player fail to display the playpause icon) " );
                }
              });
            }
            else {
            	// return the fail status of branding to excel sheet
            	this.verify.fail ( branding.value, "true", "Player fail to display the branding icon" );
              playerUI.writeToExcelFail ( 'videoplayer.xlsx', 'PlayerUI', ++excelRow, 2, 3, "ActualResult: '" + branding.value +
                "'.ExpectedResult: 'true' ( Player fail to display the branding) " );
            }
          });
        });
      }
    }
    playerUI.end ( );
  }
}