//this function is for sharing the video in Tumblr
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets[ 'ShareTumblr' ];
var url = [ ];
var username = [ ];
var password = [ ];
module.exports = {
  tags: [ 'shareTumblr' ],
  'ShareTumblr': function ( tumblr ) {
    //Read values from Excel sheet
    for ( z in worksheet ) {
      if ( z[ 0 ] === '!' ) continue;
      //Read URL from Excel sheet
      if ( z.includes ( 'A' ) ) {
        url.push ( worksheet[ z ].v );
      }
      //Read Username from Excel sheet
      if ( z.includes ( 'B' ) ) {
        username.push ( worksheet[ z ].v );
      }
      //Read Password from Excel sheet
      if ( z.includes ( 'C' ) ) {
        password.push ( worksheet[ z ].v );
      }
    }
    if ( url.length > 0 ) {
      console.log ( "Excel row count: " + url.length );
      for ( let excelColumn = 1; excelColumn != url.length; excelColumn++ ) {
        var excelRow = 1;
        //click the video control button to play using custom commands
        tumblr.share ( url[ excelColumn ] ).
        pause ( 5000 );
        //get the video title to compare with the title appear in tumblr
        tumblr.getText ( ".unimatrix-video-sharing-video-title", function ( title ) {
          var playerTitle = title.value;
          tumblr.
          //click the tumblr icon to share the video
          waitForElementVisible ( ".unimatrix-video-sharing-tumblr", 1000, false ).
          click ( ".unimatrix-video-sharing-tumblr" ).
          pause ( 5000 ).
          //switch to the new secondary browser window
          switchToSecondaryWindow ( 'tumblr' ).
          pause ( 15000 ).
          //get the video title appear in tumblr link
          getText ( ".title", function ( tumblrTitle ) {
            var tumblrVideoTitle = tumblrTitle.value;
            //check the relevant video title display in tumblr 
            if ( playerTitle == tumblrVideoTitle ) {
              tumblr.
              pause ( 9000 ).
              waitForElementPresent ( ".thumbnail > img", 10000, false, function ( tumblrThumbnailImage ) {
                if ( tumblrThumbnailImage.status == 0 ) {
                  tumblr.
                  click ( ".tx-button" ).
                  //sign in with the tumblr account
                  waitForElementVisible ( "#signup_determine_email", 1000, false, function ( tumblrLogin ) {
                    if ( tumblrLogin.value == true ) {
                      tumblr.
                      //Set the tumblr user authentication
                      setValue ( "#signup_determine_email", username[ excelColumn ] ).
                      pause ( 5000 ).
                      //check the email id is valid or invalid by clicking the submit button
                      click ( "#signup_forms_submit" ).
                      pause ( 5000 ).
                      waitForElementNotPresent ( "#signup_form_errors > li.error", 5000, false, function ( tumblrLoginError ) {
                        if ( tumblrLoginError.value == false ) {
                          tumblr.
                          waitForElementVisible ( "#signup_password", 2000, false ).
                          setValue ( "#signup_password", password[ excelColumn ] ).
                          pause ( 5000 ).
                          click ( "#signup_forms_submit" ).
                          pause ( 5000 ).
                          waitForElementNotPresent ( "#signup_form_errors > li.error", 5000, false, function ( tumblrPwdError ) {
                            if ( tumblrPwdError.value == false ) {
                              tumblr.
                              //click post button to share the video in tumblr after sign in
                              click ( ".create_post_button" ).
                              pause ( 2000 ).
                              waitForElementVisible ( ".success-message", 8000, false, function ( ) { }, 'Posted to Tumblr!' ).
                              deleteCookies ( ).
                              closeWindow ( );
                              tumblr.switchToPrimaryWindow ( 'boxxspring' ).
                              click ( ".unimatrix-video-sharing-close-overlay" );
                              tumblr.writeToExcelPass ( 'videoplayer.xlsx', 'ShareTumblr', ++excelRow, 4 );
                            }
                            else {
                              tumblr.
                              //get the error message for the invalid password
                              getText ( "#signup_form_errors > li.error", function ( tumblrPwdErrorMsg ) {
                                tumblr.closeWindow ( ).
                                switchToPrimaryWindow ( 'boxxspring' ).
                                click ( ".unimatrix-video-sharing-close-overlay" );
                                this.verify.fail ( "Invalid Password", "Valid Password", tumblrPwdErrorMsg.value );
                                tumblr.writeToExcelFail ( 'videoplayer.xlsx', 'ShareTumblr', ++excelRow, 4, 5, "ActualResult: '" +
                                  tumblrPwdErrorMsg.value + "' . ExpectedResult: 'Valid Password'" );
                              } );
                            }
                          } );
                        }
                        else {
                          tumblr.
                          //get the error message for the invalid email
                          getText ( "#signup_form_errors > .error", function ( tumblrLoginErrorMsg ) {
                            tumblr.closeWindow ( ).
                            //switch to the boxxspring window
                            switchToPrimaryWindow ( 'boxxspring' ).
                            click ( ".unimatrix-video-sharing-close-overlay" );
                            this.verify.fail ( "Error in Email-Id", "Valid Email-Id", tumblrLoginErrorMsg.value );
                            tumblr.writeToExcelFail ( 'videoplayer.xlsx', 'ShareTumblr', ++excelRow, 4, 5, "ActualResult: '" +
                              tumblrLoginErrorMsg.value + "' . ExpectedResult: 'Valid Email-Id'" );
                          } );
                        }
                      } );
                    }
                    else {
                      //return the error message as the login page not visible in Tumblr
                      this.verify.fail ( tumblrLogin.value, true, "Fail to display the Login credentials text box in Tumblr" );
                      tumblr.writeToExcelFail ( 'videoplayer.xlsx', 'ShareTumblr', ++excelRow, 4, 5, "ActualResult: '" + tumblrLogin.value +
                        "' . ExpectedResult: 'True' ( Fail to display the Login credentials text box in Tumblr )" );
                    }
                  } );
                }
                else {
                  //Error in displaying the video thumbnail image
                  this.verify.fail ( tumblrThumbnailImage.value, true, "Fail to display the video thumbnail image via Tumblr" );
                  tumblr.writeToExcelFail ( 'videoplayer.xlsx', 'ShareTumblr', ++excelRow, 4, 5, "ActualResult: '" + tumblrThumbnailImage +
                    "' . ExpectedResult: 'True' ( Fail to display the video thumbnail image via Tumblr )" );
                }
              } );
            }
            else {
              //video title display in tumblr page mismatch with the videoplayer title 
              this.verify.fail ( tumblrVideoTitle, playerTitle, "Tumblr video title mismatch with the Video player title" );
              tumblr.writeToExcelFail ( 'videoplayer.xlsx', 'ShareTumblr', ++excelRow, 4, 5, "ActualResult: '" + tumblrVideoTitle +
                "' . ExpectedResult: '" + playerTitle + "' ( Tumblr video title mismatch with the Video player title )" );
            }
          } );
        } );
      }
    }
    tumblr.end ( );
  },
};