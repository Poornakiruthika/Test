//This Function is using for Add Facebook Destination in the DISTRIBUTION
var xlsx = require( 'xlsx' );
var fs = require( 'fs' );
var Excel = require( 'exceljs' );
var workbook1 = new Excel.Workbook(  );
if ( typeof require !== 'undefined' ) XLSX = require( 'xlsx' );
var workbook = XLSX.readFile( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'DestinationFacebookAdd' ];
var playlistTitle = [ ];
var socialBtn = [ ];
var destinationTitle = [ ];
var options = [ ];
var username = [ ];
var password = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
var getData,rowCount, convertData = 1;
module.exports = {
  tags: [ 'destinationFacebookAdd' ],
  before: function( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login( profile.portalUri, profile.username, profile.password );
  },
  'Destination Facebook Add': function( facebookDestinationAdd ) {
    for ( z in worksheet ) {
      if ( z[ 0 ] === '!' ) continue;
      //Read Provider Name as Facebook
      if ( z.includes( 'A' ) ) {
        socialBtn.push( worksheet[ z ].v );
      }
      //Read Playlist title
      if ( z.includes( 'B' ) ) {
        playlistTitle.push( worksheet[ z ].v );
      }
      //Read Destination Title
      if ( z.includes( 'C' ) ) {
        destinationTitle.push( worksheet[ z ].v );
      }
      //Read Options Name
      if ( z.includes( 'D' ) ) {
        options.push( worksheet[ z ].v );
      }
      //Read Facebook Username
      if ( z.includes( 'E' ) ) {
        username.push( worksheet[ z ].v );
      }
      //Read Facebook Password
      if ( z.includes( 'F' ) ) {
        password.push( worksheet[ z ].v );
      }
    }
    if ( socialBtn.length > 0 ) {
      facebookDestinationAdd.pause( 3000 ).
      //Verify the Distribution menu in Side bar is visible
      verify.visible( "div.content-header:nth-child( 7 )" ).
      pause( 3000 ).
      //Click on the Distribution menu in Side bar
      click( "div.content-header:nth-child( 7 )" ).
      pause( 3000 ).useXpath( ).
      //Verify the Destination menu in DISTRIBUTION is visible
      verify.containsText( "//a[text( ) = 'Destinations' ]", "Destinations" ).
      pause( 3000 ).
      //Click on the Destination menu in DISTRIBUTION
      click( "//a[ text( ) = 'Destinations' ]" ).
      useCss( ).pause( 3000 ).
      //Get the Saerched Total count in Destination listing page
      getText( '.content-count > strong', function( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
        }
        for ( var getData = 1, rowCount = 1; getData < socialBtn.length; getData++ ) {
          facebookDestinationAdd.pause( 3000 ).useCss( ).
          //Wait for the Add Destination button is visible
          waitForElementVisible( "a.btn-primary", 3000, false ).
          pause( 3000 ).
          //Verify the Add Destination button is visible
          verify.visible( "a.btn-primary" ).
          pause( 3000 ).
          //Click on the Add Destination button
          click( "a.btn-primary" ).
          pause( 3000 ).useXpath( ).
          //Wait for the Add Destination label field is visible
          waitForElementVisible( "//h1[@class='ng-scope'][text( ) ='Add Destination' ]", 3000, false ).
          pause( 3000 ).
          //Verify th econtains Text in the Add Destination field is visible
          verify.containsText( "//h1[@class='ng-scope'][text( ) ='Add Destination' ]", "Add Destination" )
          if ( "facebook" === socialBtn[ getData ] ) {
            facebookDestinationAdd.useXpath( ).
            //Wait for the Facebook button Field is visible
            waitForElementVisible( "//li/a/div/span[contains ( .,'"+ socialBtn[ getData ] +"' )]", 3000, false ).
            pause( 3000 ).
            //Verify the  Facebook button is visible in the field
            verify.visible( "//li/a/div/span[contains ( .,'"+ socialBtn[ getData ] +"' )]" ).
            pause( 3000 ).
            //Click on the Facebook button in the Add Destination page
            click( "//li/a/div/span[contains ( .,'"+ socialBtn[ getData ] +"' )]" ).
            useCss( )
            if ( "facebook" === socialBtn[ getData ] ) {
              facebookDestinationAdd.pause( 3000 ).
              //Switch to Facebook login window
              switchToSecondaryWindow( 'facebook' );
              //Check the Currrent url is match up with expected
              facebookDestinationAdd.url( function( urlResponse ) {
                var resturl = urlResponse.value;
                var rest = "login.php";
                if ( new RegExp( rest ).test( resturl ) == true ) {
                  if ( getData >= socialBtn.length ) {
                    convertData = getData - ( socialBtn.length - 1 );
                    getData++;
                  }
                  //Wait for the Facebook Login Eamil field is visible
                  facebookDestinationAdd.waitForElementVisible( "#email", 2000, false, function( facebook_login ) {
                    if ( facebook_login.value == true ) {
                      facebookDestinationAdd.
                      //Enter the Username in the Email field
                      setValue( "#email", username[ convertData ] ).
                      pause( 3000 ).
                      //Wait for the password field is visible
                      waitForElementVisible( "#pass", 2000, false ).
                      pause( 4000 ).
                      //Enter the Password in the Password field     
                      setValue( "#pass", password[ convertData ] ).
                      pause( 3000 ).
                      //click submit button to sign in
                      click( "#u_0_2" ).
                      pause( 3000 ).
                      //Check and Wait for the Password error message should not displayed in the page
                      waitForElementNotPresent( ".pam.login_error_box.uiBoxRed", 2000, false, function( facebook_pwd_error ) {
                        if ( facebook_pwd_error.value == false ) {
                          facebookDestinationAdd.pause( 3000 ).
                          //Check the Currrent url is match up with expected
                          url( function( urlResponse ) {
                            var permissionPanel = urlResponse.value;
                            var requirePathe = "services";
                            if ( new RegExp( requirePathe ).test( permissionPanel ) == true ) {
                              facebookDestinationAdd.
                              //Verify the post button to share the video after signin
                              verify.visible( ".facebook-page-select" ).
                              pause( 3000 ).
                              //Click on the post button to share the video after signin
                              click( ".facebook-page-select" ).
                              pause( 3000 ).useXpath( ).
                              //Click on the Facebook Select apge
                              click( "//select[@class='facebook-page-select']" ).
                              pause( 3000 ).
                              //Click on the Facebook Options in the page
                              click( "//select[@class='facebook-page-select']/option[contains ( .,'"+ options[ convertData ] +"' )]" ).
                              useCss( ).pause( 3000 ).
                              //Verify the Facebook button is visible
                              verify.visible( ".facebook-button > input:nth-child( 1 )" ).
                              pause( 3000 ).
                              //Click on the Facebook button
                              click( ".facebook-button > input:nth-child( 1 )" ).
                              pause( 3000 ).
                              //Change the window to Portal
                              window_handles( function( facebookWindowResult ) {
                                var facebookWindow = facebookWindowResult.value[ 0 ];
                                //Switch the window to Portal
                                facebookDestinationAdd.switchWindow( facebookWindow );
                              } );
                              facebookDestinationAdd.pause( 3000 ).
                              //Wait for the Destination caption is visible
                              waitForElementVisible( ".typeName-label", 3000, false ).
                              pause( 3000 ).
                              //Verify the Contains Text as DESTINATION is visible
                              verify.containsText( ".typeName-label", "DESTINATION" ).
                              pause( 3000 ).useXpath( ).
                              //Verify the Contains Text for Playlist Title is visible
                              verify.containsText( "//label[ contains ( .,'"+ playlistTitle[ convertData ] +"' )]", playlistTitle[ convertData ] ).
                              pause( 3000 ).
                              //Click on the Contains Text for Playlist Title
                              click( "//label[ contains ( .,'"+ playlistTitle[ convertData ] +"' )]" ).
                              useCss( ).pause( 3000 ).
                              //Clear the Data in the destinatio title field
                              clearValue( ".text-input-headline" ).
                              pause( 3000 ).
                              //Enter the Data in the destinatio title field
                              setValue( ".text-input-headline", destinationTitle[ convertData ] ).
                              pause( 3000 ).useXpath( ).
                              //Verify the Provider Name is visible
                              verify.visible( "//div[@class='input-like'][contains ( .,'Facebook' )]" ).
                              pause( 3000 ).
                              //Verify the Contains Text as FAcebook is visible in the field
                              verify.containsText( "//div[@class='input-like'][contains ( .,'Facebook' )]", "Facebook" ).
                              pause( 3000 ).
                              //Verify the Page field is visible
                              verify.visible( "//div[@class='input-like ng-binding']" ).
                              pause( 3000 ).useCss( ).
                              //Wait for the Save button is visible
                              waitForElementVisible( "a.btn.btn-primary.btn-180.pull-right", 3000, false ).
                              pause( 3000 ).
                              //Click on the Save button
                              click( "a.btn.btn-primary.btn-180.pull-right" )
                              facebookDestinationAdd.useXpath( ).pause( 3000 ).
                              //Verify the Destination menu in DISTRIBUTION is visible
                              verify.containsText( "//a[text( ) = 'Destinations' ]", "Destinations" ).
                              pause( 3000 ).
                              //Click on the Destination menu in DISTRIBUTION
                              click( "//a[ text( ) = 'Destinations' ]" ).
                              useCss( ).pause( 3000 ).
                              //Get the Actual Total count in Destination listing page
                              getText( '.content-count > strong', function( actualCountResult ) {
                                if ( actualCountResult.status !== -1 ) {
                                  actualCount = actualCountResult.value;
                                  expectedCount = ( ( +currentCount ) + ( +1 ) );
                                  if ( actualCount == expectedCount ) {
                                    //Write in the Excel: Pass Result and Reason
                                    facebookDestinationAdd.writeToExcelPass( 'boxxspring.xlsx', 'DestinationFacebookAdd', ++rowCount, 8, 9 );
                                  }
                                  else {
                                    //Write in the Excel: Fail Result and Reason
                                    facebookDestinationAdd.writeToExcelFail( 'boxxspring.xlsx', 'DestinationFacebookAdd', ++rowCount, 8, 9, "ActualResult: '"+ actualCount +"' in the Total Count After Added Facebook Destination. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
                                  }
                                  //Check the input after each destination added
                                  if ( convertData < socialBtn.length - 1 ) {
                                    facebookDestinationAdd.getText( '.content-count > strong', function( currentCountResult ) {
                                      if ( currentCountResult.status !== -1 ) {
                                        currentCount = currentCountResult.value;
                                      }
                                    } );
                                  }
                                }
                              } );
                            }
                            else {
                              facebookDestinationAdd.closeWindow( ).
                              //Change the window to Portal
                              window_handles( function( facebookWindowResult ) {
                                var temp = facebookWindowResult.value[ 0 ];
                                //Switch the Window to Portal
                                facebookDestinationAdd.switchWindow( temp );
                              } );
                              facebookDestinationAdd.useXpath( ).pause( 3000 ).
                              //Verify the Destination menu in DISTRIBUTION is visible
                              verify.containsText( "//a[text( ) = 'Destinations' ]", "Destinations" ).
                              pause( 3000 ).
                              //Click on the Destination menu in DISTRIBUTION
                              click( "//a[ text( ) = 'Destinations' ]" ).
                              useCss( ).pause( 3000 ).
                              //Write in the Excel: Fail Result and Reason
                              writeToExcelFail( 'boxxspring.xlsx', 'DestinationFacebookAdd', ++rowCount, 8, 9, "ActualResult: '"+ actualCount +"' in the Total Count After Added Destination. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
                            }
                          } );
                        }
                        else {
                          facebookDestinationAdd.closeWindow( ).
                          //Change the window to Portal
                          window_handles( function( facebookWindowResult ) {
                            var facebookWindow = facebookWindowResult.value[ 0 ];
                            //Switch the Window to Portal
                            facebookDestinationAdd.switchWindow( facebookWindow );
                          } );
                          facebookDestinationAdd.useXpath( ).pause( 3000 ).
                          //Verify the Destination menu in DISTRIBUTION is visible
                          verify.containsText( "//a[text( ) = 'Destinations' ]", "Destinations" ).
                          pause( 3000 ).
                          //Click on the Destination menu in DISTRIBUTION
                          click( "//a[ text( ) = 'Destinations' ]" ).
                          useCss( ).pause( 3000 ).
                          //Write in the Excel: Fail Result and Reason
                          writeToExcelFail( 'boxxspring.xlsx', 'DestinationFacebookAdd', ++rowCount, 8, 9, "ActualResult: '"+ actualCount +"' in the Total Count After Added Destination. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
                        }
                      } );
                    }
                  } );
                }
                else {
                  facebookDestinationAdd.pause( 3000 ).
                  //Check the Currrent url is match up with expected
                  url( function( urlResponse ) {
                    var permissionPanel = urlResponse.value;
                    var requirePathe = "services";
                    if ( new RegExp( requirePathe ).test( permissionPanel ) == true ) {
                      facebookDestinationAdd.
                      //Verify the post button to share the video after auto login
                      verify.visible( ".facebook-page-select" ).
                      pause( 3000 ).
                      //Click on the Select pages to share the video after auto login
                      click( ".facebook-page-select" ).
                      pause( 3000 ).useXpath( ).
                      //Verify the Page to share in the FB is visible
                      verify.visible( "//select[@class='facebook-page-select']/option[contains ( .,'"+ options[ convertData ] +"' )]" ).
                      pause( 3000 ).
                      //Click on the Options field in the page
                      click( "//select[@class='facebook-page-select']/option[contains ( .,'"+ options[ convertData ] +"' )]" ).
                      useCss( ).pause( 3000 ).
                      //Verify the Facebook button is visible
                      verify.visible( ".facebook-button > input:nth-child( 1 )" ).
                      pause( 3000 ).
                      //Click on the Facebook button
                      click( ".facebook-button > input:nth-child( 1 )" ).
                      pause( 3000 ).
                      //Change the window to Portal
                      window_handles( function( facebookWindowResult ) {
                        var facebookWindow = facebookWindowResult.value[ 0 ];
                        //Switch the Window to Portal
                        facebookDestinationAdd.switchWindow( facebookWindow );
                      } );
                      facebookDestinationAdd.pause( 3000 ).
                      //Wait for the Destination caption field is visible
                      waitForElementVisible( ".typeName-label", 3000, false ).
                      pause( 3000 ).
                      //Verify the Contains Text as DESTINATION in the caption is visible
                      verify.containsText( ".typeName-label", "DESTINATION" ).
                      pause( 3000 ).useXpath( ).
                      //Verify the Contains Text for Playlist field is visible
                      verify.containsText( "//label[ contains ( .,'"+ playlistTitle[ convertData ] +"' )]", playlistTitle[ convertData ] ).
                      pause( 3000 ).
                      //Click on the Playlist Name in the field 
                      click( "//label[ contains ( .,'"+ playlistTitle[ convertData ] +"' )]" ).
                      useCss( ).pause( 3000 ).
                      //Clear the Data in the Destinatio Title field 
                      clearValue( ".text-input-headline" ).
                      pause( 3000 ).
                      //Enter the Data in the Destination Title field
                      setValue( ".text-input-headline", destinationTitle[ convertData ] ).
                      pause( 3000 ).useXpath( ).
                      //Verify the Provider Name field is visible
                      verify.visible( "//div[@class='input-like'][contains ( .,'Facebook' )]" ).
                      pause( 3000 ).
                      //Verify the Contains Text in Provider NAme as Facebook is visible
                      verify.containsText( "//div[@class='input-like'][contains ( .,'Facebook' )]", "Facebook" ).
                      pause( 3000 ).
                      //Verify the pages field is visible
                      verify.visible( "//div[@class='input-like ng-binding']" ).
                      pause( 3000 ).useCss( ).
                      //Wait for the Save button is visible
                      waitForElementVisible( "a.btn.btn-primary.btn-180.pull-right", 3000, false ).
                      pause( 3000 ).
                      //Click on the Save button
                      click( "a.btn.btn-primary.btn-180.pull-right" )
                      facebookDestinationAdd.useXpath( ).pause( 3000 ).
                      //Verify the Destination menu in DISTRIBUTION is visible
                      verify.containsText( "//a[text( ) = 'Destinations' ]", "Destinations" ).
                      pause( 3000 ).
                      //Click on the Destination menu in DISTRIBUTION
                      click( "//a[ text( ) = 'Destinations']" ).
                      useCss( ).pause( 3000 ).
                      //Get the Actual Total count in Destination listing page
                      getText( '.content-count > strong', function( actualCountResult ) {
                        if ( actualCountResult.status !== -1 ) {
                          actualCount = actualCountResult.value;
                          expectedCount = ( ( +currentCount ) + ( +1 ) );
                          if ( actualCount == expectedCount ) {
                            //Write in the Excel: Pass Result and Reason
                            facebookDestinationAdd.writeToExcelPass( 'boxxspring.xlsx', 'DestinationFacebookAdd', ++rowCount, 8 );
                          }
                          else {
                            //Write in the Excel: Fail Result and Reason
                            facebookDestinationAdd.writeToExcelFail( 'boxxspring.xlsx', 'DestinationFacebookAdd', ++rowCount, 8, 9, "ActualResult: '"+ actualCount +"' in the Total Count After Added Destination. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
                          }
                        }
                      } );
                      //Check the input after each destination added
                      if ( convertData < socialBtn.length - 1 ) {
                        facebookDestinationAdd.getText( '.content-count > strong', function( currentCountResult ) {
                          if ( currentCountResult.status !== -1 ) {
                            currentCount = currentCountResult.value;
                          }
                        } );
                      }
                    }
                    else {
                      facebookDestinationAdd.closeWindow( ).
                      //Change the window to Portal
                      window_handles( function( facebookWindowResult ) {
                        var facebookWindow = facebookWindowResult.value[ 0 ];
                        //Switch the Window to Portal
                        facebookDestinationAdd.switchWindow( facebookWindow );
                      } );
                      facebookDestinationAdd.useXpath( ).pause( 3000 ).
                      //Verify the Destination menu in DISTRIBUTION is visible
                      verify.containsText( "//a[text( ) = 'Destinations']", "Destinations" ).
                      pause( 3000 ).
                      //Click on the Destination menu in DISTRIBUTION
                      click( "//a[ text( ) = 'Destinations' ]" ).
                      useCss( ).pause( 3000 ).
                      //Write in the Excel: Fail Result and Reason
                      writeToExcelFail( 'boxxspring.xlsx', 'DestinationFacebookAdd', ++rowCount, 8, 9, "ActualResult: '"+ actualCount +"' in the Total Count After Added New Destination. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
                    }
                  } );
                }
              } );
            }
          }
        }
      } );
    }
    //End the Browser
    facebookDestinationAdd.end( );
  }
};