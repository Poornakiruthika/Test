//this function is for sharing the video in Linkedin
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets[ 'ShareLinkedin' ];
var url = [ ];
var username = [ ];
var password = [ ];
module.exports = {
  tags: ['shareLinkedin'],
  'ShareLinkedin': function ( linkedin ) {
    //Read values from Excel File
    for ( z in worksheet ) {
      if ( z[ 0 ] === '!' ) continue;
      //Read URL
      if ( z.includes ( 'A' ) ) {
        url.push ( worksheet[ z ].v );
      }
      //Read Username
      if ( z.includes ( 'B' ) ) {
        username.push ( worksheet[ z ].v );
      }
      //Read Password
      if ( z.includes ( 'C' ) ) {
        password.push ( worksheet[ z ].v );
      }
    }
    if ( url.length > 0 ) {
      console.log ( "Excel row count: " + url.length );
      for ( let excelColumn = 1; excelColumn != url.length; excelColumn++ ) {
        var excelRow = 1;
        //click the video control button to play using custom commands
        linkedin.share ( url[ excelColumn ] ).
        pause ( 5000 ).
        //get the video title to compare with the title appear in linkedin
        getText ( ".unimatrix-video-sharing-video-title", function ( title ) {
          var playerTitle = title.value;
          linkedin.
          //click the linkedin icon to share the video
          waitForElementVisible ( ".unimatrix-video-sharing-linkedin", 1000 ).
          click ( ".unimatrix-video-sharing-linkedin" ).
          pause ( 5000 ).
          //switch to the new secondary browser window
          switchToSecondaryWindow ( 'linkedin' );
          linkedin.
          useXpath ( ).
          waitForElementPresent("//a[contains(.,'Sign in' )]", 5000, false, function (linkedinSignin ) {
            console.log (linkedinSignin );
            if (linkedinSignin.status == 0 ) {
              linkedin.pause (3000 ).
              click ("//a[contains(.,'Sign in')]" );
            }
          } );
          //sign in with the linkedin account using valid credentials
          linkedin.useCss ( ).
          waitForElementNotPresent ("#share-view-title", 2000, false, function (linkedinLogin ) {
            if (linkedinLogin.value == false ) {
              linkedin.
              setValue ("#session_key-login", username[ excelColumn ] ).
              pause (5000 ).
              setValue ("#session_password-login", password[ excelColumn ] ).
              pause (5000 ).
              //click submit button to login in linkedin
              click ("#btn-primary" ).
              waitForElementNotPresent ("#session_key-login-error", 1000, false, function (linkedinLoginError ) {
                if (linkedinLoginError.value == false ) {
                  linkedin.
                  pause (5000 ).
                  useCss ( ).
                  //check the relevant video title display in linkedin
                  getText ("#share-view-title", function (linkedinTitle ) {
                    var linkedinVideoTitle = linkedinTitle.value;
                    if (playerTitle == linkedinVideoTitle ) {
                      linkedin.
                      //click post button to share the update
                      click (".submit-container > .btn-primary" ).
                      pause (5000 ).
                      verify.containsText ("#share-alert-message", "Great! You have successfully shared this update." );
                      linkedin.writeToExcelPass ('videoplayer.xlsx', 'ShareLinkedin', ++excelRow, 4  );
                    }
                    else {
                      //video title display in linkedin page mismatch with the videoplayer title after signup
                      linkedin.verify.fail (linkedinVideoTitle, playerTitle, "linkedin video title mismatch with the Video player title" );
                      linkedin.closeWindow ( ).
                      switchToPrimaryWindow ('boxxspring' ).
                      click (".unimatrix-video-sharing-close-overlay" );
                      linkedin.writeToExcelFail ('videoplayer.xlsx', 'ShareLinkedin', ++excelRow, 4, 5,"ActualResult: '" + linkedinVideoTitle +
                        "' . ExpectedResult: '" + playerTitle + "' (linkedin video title mismatch with the Video player title )" );
                    }
                  } );
                }
                else {
                  linkedin.
                  //get the error message for the invalid credentials after sign in
                  getText ("#session_key-login-error", function (linkedinErrorMsg ) {
                    linkedin.
                    closeWindow ( ).
                    switchToPrimaryWindow ('boxxspring' ).
                    click (".unimatrix-video-sharing-close-overlay" ).
                    verify.fail ("Invalid Credentials", "Valid Credentials", linkedinErrorMsg.value );
                    linkedin.writeToExcelFail ('videoplayer.xlsx', 'ShareLinkedin', ++excelRow, 4, 5, "ActualResult: '" + linkedinErrorMsg.value +
                      "' . ExpectedResult: 'Valid Credentials'" );
                  } );
                }
              } );
            }
            else {
              linkedin.
              useCss ( ).
              //check the relevant video title display in linkedin after auto login
              getText ("#share-view-title", function (linkedinTitle ) {
                var linkedinVideoTitle = linkedinTitle.value;
                if (playerTitle == linkedinVideoTitle ) {
                  linkedin.
                  //click post button to share the update after auto login
                  click (".submit-container > .btn-primary" ).
                  pause (5000 ).
                  verify.containsText ("#share-alert-message", "Great! You have successfully shared this update." );
                  switchToPrimaryWindow ('boxxspring' ).
                  click (".unimatrix-video-sharing-close-overlay" );
                  linkedin.writeToExcelPass ('videoplayer.xlsx', 'ShareLinkedin', ++excelRow, 4 );
                }
                else {
                  linkedin.closeWindow ( ).
                  switchToPrimaryWindow ('boxxspring' ).
                  click (".unimatrix-video-sharing-close-overlay" ).
                  //video title display in linkedin page mismatch with the videoplayer title after autologin
                  verify.fail (linkedinVideoTitle, playerTitle, "linkedin video title mismatch with the Video player title" );
                  linkedin.writeToExcelFail ('videoplayer.xlsx', 'ShareLinkedin', ++excelRow, 4, 5, "ActualResult: '" + linkedinVideoTitle +
                    "' . ExpectedResult: '" + playerTitle + "' (linkedin video title mismatch with the Video player title )" );
                }
              } );
            }
          } );
        } );
      }
    }
    linkedin.end ( );
  },
};