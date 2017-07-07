var xlsx = require('xlsx');
var Excel = require('exceljs');
if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('videoplayer.xlsx', { cellStyles: true });
var worksheet = workbook.Sheets['SharePinterest'];
var url = [];
var username = [];
var password = [];
module.exports = {
  tags: ['sharePinterest'],
  'sharePinterest': function (pinterest) {
    //Read values from Excel File
    for(z in worksheet) {
      if(z[0] === '!') continue;
      //Read URL
      if(z.includes('A')) {
        url.push(worksheet[z].v);
      }
      //Read Username
      if(z.includes('B')) {
        username.push(worksheet[z].v);
      }
      //Read Password
      if(z.includes('C')) {
        password.push(worksheet[z].v);
      }
    }
    if(url.length > 0) {
      console.log("Excel row count: " + url.length);
      for(let excelColumn = 1; excelColumn != url.length; excelColumn++) {
        var excelRow = 1;
        //click the video control button to play using custom commands
        pinterest.share(url[excelColumn]).
        pause(5000).
        //click the pinterest icon to share the video
    waitForElementVisible( ".unimatrix-video-sharing-pinterest", 1000, false ).
    click( ".unimatrix-video-sharing-pinterest" ).
    pause( 5000 ).
    //switch to the new secondary browser window
    switchToSecondaryWindow( 'pinterest' );
    pinterest.
    waitForElementNotPresent( '.pinGallery > div[style="visibility: visible;"]', 1000, false, function ( pinterest_login ) {
      if ( pinterest_login.value == false ) {
        pinterest.
        //sign in with the pinterest account
        setValue( "#userEmail", username[ excelColumn] ).
        pause( 5000 ).
        setValue( "#userPassword", password[ excelColumn] ).
        pause( 5000 ).
        //click the submit button to login in pinterest
        click( ".signupButton" ).
        //check whether the pinterest ask for sign up after providing the login information
        waitForElementNotVisible( '#secondStepTooltip', 5000, false, function ( pinterest_signup ) {
          if ( pinterest_signup.value == false ) {
            pinterest.
            waitForElementNotPresent( '#firstStepTooltip', 8000, false, function ( pinterest_login_error ) {
              if ( pinterest_login_error.value == false ) {
                pinterest.
                pause( 10000 ).
                useXpath().
                //click the relevant video in the gallery to post in pinterest
                waitForElementPresent( "//button[contains(.,'Create board')]", 10000, false ).
                click( "//button[contains(.,'Create board')]" ).
                //search for the board in pinterest
                waitForElementVisible( "//input[@name='boardName']", 5000, false ).
                setValue( "//input[@name='boardName']", 'Test' ).
                waitForElementVisible( "//button[contains(.,'Create')]", 5000, false, function ( pinterest_create_board ) {
                  //post the update in already existing board
                  if ( pinterest_create_board.value == true ) {
                    pinterest.
                    //share the video in pinterest
                    click ("//button[@type='submit']") .
                    pause( 5000 ).
                    click ("//button[@class='mcZku']").
                    switchToPrimaryWindow('boxxspring').
                    click(".unimatrix-video-sharing-close-overlay").
                    verify.ok( true, "Post to Pinterest" );
                    pinterest.writeToExcelPass('videoplayer.xlsx', 'SharePinterest', ++excelRow, 4 );
                  }
                  else {
                    //post the update by creating new board in pinterest after sign in
                    pinterest.
                    useCss().
                    keys( [ '\uE006' ] ).
                    pause( 5000 ).                   
                    click( ".saveBoardButton > .buttonText" ).
                    pause( 5000 ).
                    verify.ok( true, "Created a new board and Post to Pinterest" );
                    pinterest.closeWindow().
                    switchToPrimaryWindow('boxxspring').
                    click(".unimatrix-video-sharing-close-overlay");
                    pinterest.writeToExcelPass('videoplayer.xlsx', 'SharePinterest', ++excelRow, 4 );
                  }
                } );
              }
              else {
                //get the error message for the invalid credentials while login
                pinterest.
                getText( "#firstStepTooltip", function ( pinterest_login_error_msg ) {
                  pinterest.closeWindow().
                  switchToPrimaryWindow('boxxspring').
                  click(".unimatrix-video-sharing-close-overlay");
                  verify.fail( "Invalid credentials", "Valid credentials", pinterest_login_error_msg.value );
                  pinterest.writeToExcelFail('videoplayer.xlsx', 'SharePinterest', ++excelRow, 4, 5, "ActualResult: '" + pinterest_login_error_msg.value  + "' . ExpectedResult: 'Valid Credentials'");
                } );
              }
            } );
          }          
          else {
            //throw an error to create a account in pinterest
            pinterest.
            click( ".toggleStep > span" ).
            verify.fail( undefined, undefined, "Sign up for pinterest with the given Username and Password" );
            pinterest.writeToExcelFail('videoplayer.xlsx', 'SharePinterest', ++excelRow, 4, 5, "Sign up for pinterest with the given Username and Password");
          }
        } );
      }
      else {
        pinterest.
        //search and select the board in pinterest to post after autologin
        waitForElementVisible( '.pinGallery > div[style="visibility: visible;"]', 5000, false ).
        click( '.pinGallery > div[style="visibility: visible;"]' ).
        waitForElementVisible( 'input[placeholder="Search"]', 5000, false ).
        setValue( 'input[placeholder="Search"]', 'Test' ).
        waitForElementNotVisible( '.createLabel', 5000, false, function ( pinterest_create_board ) {
          if ( pinterest_create_board.value == false ) {
          	pinterest.
            keys( [ '\uE006' ] ).
            pause( 5000 ).
            //share the video in pinterest
            verify.ok( true, "Post to Pinterest" );
            pinterest.writeToExcelPass('videoplayer.xlsx', 'SharePinterest', ++excelRow, 4 );
          }
          else {
            pinterest.
            keys( [ '\uE006' ] ).
            pause( 5000 ).
            //create a new board in the pinterest to post after auto login
            click( ".saveBoardButton > .buttonText" ).
            pause( 5000 ).
            verify.ok( true, "Created a new board and Post to Pinterest" ).
            pinterest.writeToExcelPass('videoplayer.xlsx', 'SharePinterest', ++excelRow, 4 );
          }
        }, 'Save the post in the relevant Board after autologin' );
      }
    } );
}
}
    pinterest.end();
  },
};