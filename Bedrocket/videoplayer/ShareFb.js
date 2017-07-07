//this function is for sharing the video in Facebook
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets[ 'ShareFb' ];
//get the excel sheet data in each array
var url = [ ];
var username = [ ];
var password = [ ];
module.exports = {
  tags: [ 'shareFb' ],
  'ShareFacebook': function ( fb ) {
    //Read values from Excel sheet
    for ( z in worksheet ) {
      if ( z[ 0 ] === '!' ) continue;
      //Read URL
      if ( z.includes ( 'A' ) ) {
        url.push ( worksheet[ z ].v );
      }
      //Read Username from Excel sheet
      if ( z.includes ( 'B' ) ) {
        username.push ( worksheet[ z ].v );
      }
      //Read Password from Excel sheet
      if ( z.includes ( 'C' ) ) {
        password.push  (  worksheet[ z ].v );
      }
    }
    if ( url.length > 0 ) {
      console.log ( "Excel row count: " + url.length );
      for ( let excelColumn = 1; excelColumn != url.length; excelColumn++ ) {
        var excelRow = 1;
        //click the video control button to play using custom commands
        fb.share ( url[ excelColumn ] ).
        pause ( 5000 ).
        //click the facebook icon to share the video    
        waitForElementVisible ( ".unimatrix-video-sharing-fb", 5000, false, function ( fbIcon ) {
          if ( fbIcon.value == true ) {
            fb.
            click ( ".unimatrix-video-sharing-fb" ).
            pause ( 5000 ).
            //switch to the new secondary browser window
            switchToSecondaryWindow ( 'facebook' ).
            url ( function ( getUrl ) {
              //Check the login URL present in the facebook page 
              var urlstr = getUrl.value;
              var urlData = urlstr.match ( /facebook[.]com[/]sharer/i );
              //check whether automatically signed into facebook account or to sign in
              if ( urlData == "facebook.com/sharer" ) {
                fb.useXpath ( ).
                waitForElementVisible ( "//i[contains ( .,'Settings' )]", 5000, false, function ( fbAutoLogin ) {
                  if ( fbAutoLogin.value == true ) {
                    //signout the already login user
                    fb.click ( "//i[contains(.,'Settings')]" ).
                    click ( "//span[contains(.,'Switch User')]" ).
                    pause ( 5000 ).
                    click ( "//button[@action='confirm']" )
                  }
                  else {
                    this.assert.fail ( fbAutoLogin.value, true, "Fail to switch from current account to new facebook account" )
                    fb.writeToExcelFail ( 'videoplayer.xlsx', 'ShareFb', ++excelRow, 4, 5, "ActualResult: '" + fbAutoLogin.value +
                      "'. Expected Result: 'true' ( Fail to switch from current account to new facebook account )" );
                  }
                } );
              }
            } );
            fb.
            //sign in with the facebook account using email and password
            useCss (  ).
            clearValue ( "#email" ).
            setValue ( "#email", username[excelColumn] ).
            pause ( 5000 ).
            clearValue ( "#pass" ).
            setValue ( "#pass", password[excelColumn] ).
            pause ( 5000 ).
            click ( "#loginbutton" ).
            pause ( 5000 ).
            //check the login information is valid 
            waitForElementNotPresent ( ".login_error_box > .fwb", 5000, false, function ( shareToFb ) {
              if ( shareToFb.value == false ) {
                fb.
                //click post button to share the video in facebook after sign in
                click ( "#u_0_k" ).
                pause ( 5000 ).
                verify.ok ( true, "Posted to Facebook!" );
                fb.switchToPrimaryWindow ( 'boxxspring' ).
                click ( ".unimatrix-video-sharing-close-overlay" ).
                writeToExcelPass ( 'videoplayer.xlsx', 'ShareFb', ++excelRow, 4 );
              }
              else {
                fb.
                //return the error message for the invalid credentials
                getText ( ".login_error_box > .fwb", function ( fbLoginError ) {
                  var login_error = fbLoginError.value;
                  fb.closeWindow (  ).
                  switchToPrimaryWindow ( 'boxxspring' ).
                  click ( ".unimatrix-video-sharing-close-overlay" ).
                  writeToExcelFail ( 'videoplayer.xlsx', 'ShareFb', ++excelRow, 4, 5, "ActualResult: '" + login_error +
                    "'. Expected Result: 'Valid Credentials'" );
                } );
              }
            } );
          }
          else {
            //return the failure status as the facebook icon is not present in the video share option
            fb.writeToExcelFail ( 'videoplayer.xlsx', 'ShareFb', ++excelRow, 4, 5, "ActualResult: '" + fbIcon.value +
              "'. Expected Result: 'true'  ( Facebook icon is not visible while share the video ) " );
          }
        } );
      }
    }
    fb.end ( );
  },
};