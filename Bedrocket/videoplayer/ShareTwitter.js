//this function is for sharing the video in Twitter
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets[ 'ShareTwitter' ];
//get the excel sheet data in each array
var url = [ ];
var username = [ ];
var password = [ ];
module.exports = {
  tags: [ 'shareTwitter' ],
  'ShareTwitter': function ( twitter ) {
    //Read values from Excel File
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
        twitter.share ( url[ excelColumn ] ).
        pause ( 5000 ).
        url ( function ( geturl ) {
          var urlstr = geturl.value;
          twitter.
          //click the twitter icon to share the video
          waitForElementVisible ( ".unimatrix-video-sharing-twitter", 1000 ).
          click ( ".unimatrix-video-sharing-twitter" ).
          pause ( 5000 ).
          //switch to the new secondary browser window
          switchToSecondaryWindow ( 'twitter' ).
          //compare the video title display in twitter page matches with the videoplayer title 
          getText ( "#status", function ( shareTwitter ) {
            var twitterStatus = shareTwitter.value;
            if ( urlstr == twitterStatus.trim ( ) ) {
              twitter.
              //check whether the user already login or a new user
              getAttribute ( ".selected", "value", function ( twitterSubmit ) {
                if ( twitterSubmit.value == "Tweet" ) {
                  twitter.
                  //To signout the already login twitter account 
                  waitForElementPresent ( ".current-user > a", 5000, false, function ( currentUser ) {
                    if ( currentUser.status == 0 ) {
                      twitter.click ( ".current-user > a" ).
                      pause ( 5000 ).
                      click ( ".textual.link" ).
                      pause ( 9000 ).
                      verify.attributeEquals ( ".selected", "value", "Log in and Tweet" );
                    }
                    else {
                      //write the signout fail status to excel sheet
                      twitter.verify.fail ( currentUser.value, "true", "Signout error in already exists twitter account" );
                      twitter.writeToExcelFail ( 'videoplayer.xlsx', 'ShareTwitter', ++excelRow, 4, 5, "ActualResult: '" + currentUser.value + "' . ExpectedResult: 'true'  ( Fail to signout in already exists twitter account ) " );
                    }
                  } );
                }
                else {
                  //check whether automatically signed into twitter account or to sign in
                  twitter.
                  verify.attributeEquals ( ".selected", "value", "Log in and Tweet" );
                }
                //sign in with the twitter account
                twitter.setValue ( "#username_or_email", username[excelColumn] ).
                pause ( 2000 ).
                setValue ( "#password", password[excelColumn] ).
                pause ( 2000 ).
                click ( ".selected" ).
                windowHandles ( function ( window ) {
                  if ( window.value.length == 2 ) {
                    twitter.
                    //check the login information is valid
                    waitForElementNotPresent ( ".message-text", 9000, false, function ( twitterLogin ) {
                      if ( twitterLogin.value == false ) {
                        twitter.
                        //get the tweet error if the link already posted
                        getText ( "#post-error", function ( twitterPostErrorMsg ) {
                          twitter.verify.fail ( undefined, undefined, twitterPostErrorMsg.value );
                          twitter.closeWindow ( );
                          twitter.switchToPrimaryWindow ( 'boxxspring' ).
                          click ( ".unimatrix-video-sharing-close-overlay" );
                          twitter.writeToExcelFail ( 'videoplayer.xlsx', 'ShareTwitter', ++excelRow, 4, 5, "ActualResult: '" + twitterPostErrorMsg.value + "'" );
                        } );
                      }
                      else {
                        twitter.
                        //return the error message for the invalid credentials
                        waitForElementVisible ( ".message-text", 1000 ).
                        getText ( ".message-text", function ( twitterLoginError ) {
                          twitter.verify.fail ( "Error in Twitter login", "To login in Twitter", twitterLoginError.value );
                          twitter.closeWindow ( );
                          twitter.switchToPrimaryWindow ( 'boxxspring' ).
                          click ( ".unimatrix-video-sharing-close-overlay" );
                          twitter.writeToExcelFail ( 'videoplayer.xlsx', 'ShareTwitter', ++excelRow, 4, 5, "ActualResult: '" + twitterLoginError.value + "' . ExpectedResult: 'Valid Credentials'" );
                        } );
                      }
                    } );
                  }
                  else {
                    //post the link in twitter after sign in
                    twitter.verify.ok ( true, "Your Tweet has been posted!" );
                    twitter.switchToPrimaryWindow ( 'boxxspring' ).
                    click ( ".unimatrix-video-sharing-close-overlay" );
                    twitter.writeToExcelPass ( 'videoplayer.xlsx', 'ShareTwitter', ++excelRow, 4 );
                  }
                } );
              } );
            }
            //video title display in twitter page mismatch with the videoplayer title 
            else {
              twitter.verify.fail ( undefined, undefined, "Twitter status link mismatch with the Video player URL" );
              twitter.closeWindow ( );
              twitter.switchToPrimaryWindow ( 'boxxspring' ).
              click ( ".unimatrix-video-sharing-close-overlay" );
              twitter.writeToExcelFail ( 'videoplayer.xlsx', 'ShareTwitter', ++excelRow, 4, 5, "Twitter status link mismatch with the Video player URL" );
            }
          } );
        } );
      }
    }
    twitter.end ( );
  },
};