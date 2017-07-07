//this function is for sharing the video in Google
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets[ 'ShareGoogle' ];
var url = [ ];
var username = [ ];
var password = [ ];
module.exports = {
  tags: [ 'shareGoogle' ],
  'ShareGoogle': function ( google ) {
    //Read values from Excel File
    for ( z in worksheet ) {
      if ( z[ 0 ] === '!' ) continue;
      //Read URL from Excel File
      if ( z.includes ( 'A' ) ) {
        url.push ( worksheet[ z ].v );
      }
      //Read Username from Excel File
      if ( z.includes ( 'B' ) ) {
        username.push ( worksheet[ z ].v );
      }
      //Read Password from Excel File
      if ( z.includes ( 'C' ) ) {
        password.push ( worksheet[ z ].v );
      }
    }
    if ( url.length > 0 ) {
      console.log ( "Excel row count: " + url.length );
      for ( let excelColumn = 1; excelColumn != url.length; excelColumn++ ) {
        var excelRow = 1;
        //click the video control button to play using custom commands      
        google.share ( url[ excelColumn ] ).
        pause ( 5000 ).
        //get the video title to compare with the title appear in google+
        getText ( ".unimatrix-video-sharing-video-title", function ( title ) {
          var playerTitle = title.value;
          google.
          //click the google icon to share the video
          waitForElementVisible ( ".unimatrix-video-sharing-google", 1000, false ).
          click ( ".unimatrix-video-sharing-google" ).
          pause ( 5000 ).
          //switch to the new secondary browser window
          switchToSecondaryWindow ( 'google' ).
          pause ( 6000 ).
          //sign in with the google account using email
          waitForElementPresent ( "#identifierId", 6000, false, function ( googleLogin ) {
            if ( googleLogin.status == 0 ) {
              google.
              setValue ( "#identifierId", username[ excelColumn ] ).
              pause ( 5000 ).
              useXpath (  ).
              click ( "//span[contains(.,'Next')]" ).
              pause ( 5000  ).
              waitForElementNotPresent ( "//div[contains(.,'Enter a valid email or phone number')]", 5000, false, function (googleLoginError ) {
                if (googleLoginError.value == false ) {
                  google.
                  //check the password field is visible
                  waitForElementVisible ( "//input[@type='password']", 2000, false ).
                  //sign in with the google account using password
                  setValue ( "//input[@type='password']", password[ excelColumn ] ).
                  pause (2000 ).
                  //click submit button to sign in
                  click ( "//span[contains(.,'Next')]" ).
                  pause ( 2000 ).
                  waitForElementNotPresent ( "//div[contains(.,'Wrong password. Try again.')]", 1000, false, function ( googlePwdError ) {
                    if ( googlePwdError.value == false ) {
                      google.
                      pause ( 5000 ).
                      //check the relevant video title display in google
                      getText ( "//span[contains(@class,'aaTEdf')]", function ( googleTitle ) {
                        var googleVideoTitle = googleTitle.value;
                        if ( playerTitle == googleVideoTitle ) {
                          google.
                          pause ( 5000 ).
                          deleteCookies ( ).
                          //click post button to share the video after signin
                          click ( "//span[contains(.,'Post' )]" ).
                          verify.ok ( true, "Post to Google+" );
                          google.windowHandles ( function ( window ) {
                            if ( window.value.length == 2 ) {
                              google.useCss ( ).
                              deleteCookies ( ).
                              closeWindow ( ).
                              switchToPrimaryWindow ( 'boxxspring' ).
                              click ( ".unimatrix-video-sharing-close-overlay" ).
                              writeToExcelFail ( 'videoplayer.xlsx', 'ShareGoogle', ++excelRow, 4, 5, "ActualResult: 'Error in the Post button in Google'. Expected Result: 'Video should get shared by clicking google Post button'" );
                            }
                            else {
                              google.useCss ( ).
                              deleteCookies ( ).
                              closeWindow ( ).
                              switchToPrimaryWindow ( 'boxxspring' ).
                              click ( ".unimatrix-video-sharing-close-overlay" ).
                              writeToExcelPass ( 'videoplayer.xlsx', 'ShareGoogle', ++excelRow, 4 );
                            }
                          } );                          
                        }
                        else {
                          google.deleteCookies ( ).
                          closeWindow ( ).
                          switchToPrimaryWindow ( 'boxxspring' ).
                          useCss ( ).
                          click ( ".unimatrix-video-sharing-close-overlay" );
                          //video title display in google page mismatch with the videoplayer title 
                          this.verify.fail ( googleVideoTitle, playerTitle, "Google video title mismatch with the Video player title" );
                          writeToExcelFail ( 'videoplayer.xlsx', 'ShareGoogle', ++excelRow, 4, 5, "ActualResult: '" + googleVideoTitle.value +
                            "'. Expected Result: 'Google video title mismatch with the Video player title'" );
                        }
                      } );
                    }
                    else {
                      google.
                      useXpath ( ).
                      //get the error message for the invalid password
                      getText ( "//div[contains(.,'Wrong password. Try again.')]", function ( googlePwdErrorMsg ) {
                        this.verify.fail ( "Invalid Password", "Valid Password", googlePwdErrorMsg.value );
                        google.closeWindow ( ).
                        useCss ( ).
                        switchToPrimaryWindow ( 'boxxspring' ).                        
                        click ( ".unimatrix-video-sharing-close-overlay" ).
                        writeToExcelFail ( 'videoplayer.xlsx', 'ShareGoogle', ++excelRow, 4, 5, "ActualResult: '" + googlePwdErrorMsg.value +
                          "'. Expected Result: 'Valid Password'" );
                      } );
                    }
                  } );
                }
                else {
                  google.
                  //get the error message for the invalid email
                  getText ( "//div[contains(.,'Enter a valid email or phone number')]", function ( googleLoginErrorMsg ) {
                    google.closeWindow ( ).
                    switchToPrimaryWindow ( 'boxxspring' ).
                    click ( ".unimatrix-video-sharing-close-overlay" );
                    this.verify.fail ( "Error in Email-Id", "Valid Email-Id", googleLoginErrorMsg.value );
                    writeToExcelFail ( 'videoplayer.xlsx', 'ShareGoogle', ++excelRow, 4, 5, "ActualResult: '" + googleLoginErrorMsg.value +
                      "'. Expected Result: 'Valid Email-Id'" );
                  } );
                }
              } );
            }
            else {
              google.closeWindow ( ).
              switchToPrimaryWindow ( 'boxxspring' ).
              click ( ".unimatrix-video-sharing-close-overlay" ).
              this.verify.fail ( "Error in the Google Email Id element to be visible", "Google Email ID to be visible", googleLogin.status ).
              writeToExcelFail ( 'videoplayer.xlsx', 'ShareGoogle', ++excelRow, 4, 5, "ActualResult: '" + googleLogin.status +
                "'. Expected Result: 'Google Email ID to be visible'" );
            }
          } );
        } );
      }
    }
    google.end ( );
  },
};