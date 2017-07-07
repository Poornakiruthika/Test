//this function is for check and Add the Youtube Destinations 
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'DestinationYoutubeAdd' ];
var playlistTitle = [ ];
var socialBtn = [ ];
var destinationTitle = [ ];
var username = [ ];
var password = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
var youtube;
var getData,rowCount,convertData = 1;
module.exports = {
  tags: [ 'destinationYoutubeAdd' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Destination Youtube Add': function ( DestinationYoutubeAdd ) {
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Category Title
      if ( z.includes ( 'A' ) ) {
        socialBtn.push ( worksheet[ z ].v );
      }
      //Read Category Description
      if ( z.includes ( 'B' ) ) {
        playlistTitle.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if ( z.includes ( 'C' ) ) {
        destinationTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if ( z.includes ( 'E' ) ) {
        username.push ( worksheet[ z ].v );
      }
      if ( z.includes ( 'F' ) ) {
        password.push ( worksheet[ z ].v );
      }
    }
    if ( socialBtn.length > 0 ) {
      DestinationYoutubeAdd.pause ( 3000 ).
      //Verify the Distribution Menu in side bar is visible
      verify.visible ( "div.content-header:nth-child( 7 )" ).
      pause ( 3000 ).
      //Click on the Distribution menu in the side bar
      click ( "div.content-header:nth-child( 7 )" ).
      pause ( 3000 ).useXpath ( ).
      //Verify the Destination menu in DISTRIBUTION is visible
      verify.containsText ( "//a[text( ) = 'Destinations']", "Destinations" ).
      pause ( 3000 ).
      //Click on the Destination menu in DISTRIBUTION
      click ( "//a[ text( ) = 'Destinations']" ).
      useCss ( ).pause ( 3000 ).
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
        }
        for ( var getData = 1, rowCount = 1; getData < socialBtn.length; getData++ ) {
          DestinationYoutubeAdd.pause ( 3000 ).useCss ( ).
          //Wait for the Add destination button is visible
          waitForElementVisible ( "a.btn-primary", 3000, false ).
          pause ( 3000 ).
          //Verify the Add destination button is visible
          verify.visible ( "a.btn-primary" ).
          pause ( 3000 ).
          //Click on Add destination button in destination page
          click ( "a.btn-primary" ).
          pause ( 3000 ).useXpath ( ).
          //Wait for the Add Destination caption is visible in the Add Destination page
          waitForElementVisible ( "//h1[@class='ng-scope'][text( )='Add Destination']", 3000, false ).
          pause ( 3000 ).
          //Verify the Add Destination caption is visible in the Add Destination page
          verify.containsText ( "//h1[@class='ng-scope'][text( )='Add Destination']", "Add Destination" )
          if ( ( "youtube" ) === socialBtn[ getData ] ) {
            DestinationYoutubeAdd.useXpath ( ).
            //Wait for the youtube Social button is visible in add destination page
            waitForElementVisible ( "//li/a/div/span[contains ( .,'"+ socialBtn[ getData ] +"')]", 3000, false ).
            pause ( 3000 ).
            //Verify the youtube Social button is visible in add destination page
            verify.visible ( "//li/a/div/span[contains ( .,'"+ socialBtn[ getData ] +"')]" ).
            pause ( 3000 ).
            //Click on youtube Social button in add destination page
            click ( "//li/a/div/span[contains ( .,'"+ socialBtn[ getData ] +"')]" ).
            useCss ( )
            if ( "youtube" === socialBtn[ getData ] ) {
              DestinationYoutubeAdd.pause ( 3000 ).
              //Switch the window to Youtube
              switchToSecondaryWindow ( 'youtube' );
              //Get the current URL Response and value
              DestinationYoutubeAdd.url ( function ( responseUrl ) {
                var resturl = responseUrl.value;
                var rest = "ServiceLogin";
                if ( new RegExp ( rest ).test ( resturl ) == true ) {
                  //Converting the values from getData to convertData
                  if ( getData >= socialBtn.length ) {
                    var convertData = getData - ( socialBtn.length - 1 );
                    getData++;
                  }
                  //Wait to check for email field should be visible in the login page
                  DestinationYoutubeAdd.waitForElementVisible ( "#Email", 2000, false, function ( google_login ) {
                    if ( google_login.value == true ) {
                      DestinationYoutubeAdd.setValue ( "#Email", username[ convertData ] ).
                      pause ( 3000 ).
                      click ( "#next" ).
                      pause ( 3000 ).
                      //Wait to check for email error message should not visible in the login page
                      waitForElementNotVisible ( "#errormsg_0_Email", 3000, false, function ( google_login_error ) {
                        if ( google_login_error.value == false ) {
                          //check the password field is visible
                          DestinationYoutubeAdd.waitForElementVisible ( "#Passwd", 3000, false ).
                          //sign in with the google account using password
                          setValue ( "#Passwd", password[ convertData ] ).
                          pause ( 3000 ).
                          //click submit button to sign in
                          click ( "#signIn" ).
                          pause ( 3000 ).
                          //Wait to check for Password error message should not present in the login page
                          waitForElementNotPresent ( "#errormsg_0_Passwd", 3000, false, function ( google_pwd_error ) {
                            if ( google_pwd_error.status == 0 ) {
                              DestinationYoutubeAdd.pause ( 3000 ).
                              //Get the current URL Response and value              
                              url ( function ( responseUrl ) {
                                var permissionPanel = responseUrl.value;
                                var requirePathe = "oauth2";
                                if ( new RegExp ( requirePathe ).test ( permissionPanel ) == true ) {
                                  //Verify the Post page in youtube window is visible
                                  DestinationYoutubeAdd.pause ( 3000 ).verify.visible ( "#grant_heading" ).
                                  pause ( 3000 ).
                                  //Verify the Post Button in youtube window is visible
                                  verify.visible ( "#submit_approve_access" ).
                                  pause ( 3000 ).
                                  //Click on the Post Button in youtube window
                                  click ( "#submit_approve_access" ).
                                  pause ( 3000 ).
                                  //Windows Handling Switch to portal
                                  window_handles ( function ( switchwindowresult ) {
                                    var temp = switchwindowresult.value[ 0 ];
                                    DestinationYoutubeAdd.switchWindow ( temp );
                                  } );
                                  DestinationYoutubeAdd.pause ( 3000 ).
                                  //Wait for the DESTINATION caption is visible in the add destination page
                                  waitForElementVisible ( ".typeName-label", 3000, false ).
                                  pause ( 3000 ).
                                  //Verify the DESTINATION caption is visible in the add destination page
                                  verify.containsText ( ".typeName-label", "DESTINATION" ).
                                  pause ( 3000 ).
                                  //Clear the Headline data in the field
                                  clearValue ( ".text-input-headline" ).
                                  pause ( 3000 ).
                                  //Enter the Headline data in the field
                                  setValue ( ".text-input-headline", destinationTitle[ convertData ] ).
                                  pause ( 3000 ).
                                  //Wait for the Save button in the destiantion page is visible
                                  waitForElementVisible ( "a.btn.btn-primary.btn-180.pull-right", 3000, false ).
                                  pause ( 3000 ).
                                  //Click on the Save button in the destiantion page
                                  click ( "a.btn.btn-primary.btn-180.pull-right" ).
                                  useXpath ( ).pause ( 3000 ).
                                  //Verify the Destination menu in DISTRIBUTION is visible
                                  verify.containsText ( "//a[text( ) = 'Destinations']", "Destinations" ).
                                  pause ( 3000 ).
                                  //Click on the Destination menu in DISTRIBUTION 
                                  click ( "//a[ text( ) = 'Destinations']" ).
                                  useCss ( ).
                                  pause ( 3000 ).
                                  //Get the Actual Total count in the Destination listing page
                                  getText ( '.content-count > strong', function ( actualCountResult ) {
                                    if ( actualCountResult.status !== -1 ) {
                                      actualCount = actualCountResult.value;
                                      expectedCount = ( ( +currentCount ) + ( +1 ) );
                                      if ( actualCount == expectedCount ) {
                                        //Write in the spreadsheet: Pass Result and Reason
                                        DestinationYoutubeAdd.writeToExcelPass ( 'boxxspring.xlsx', 'DestinationYoutubeAdd', ++rowCount, 8 );
                                      }
                                      else {
                                        //Write in the spreadsheet: Fail Result and Reason
                                        DestinationYoutubeAdd.writeToExcelFail ( 'boxxspring.xlsx', 'DestinationYoutubeAdd', ++rowCount, 8, 9,  "ActualResult: '"+ actualCount +"' in the Total Count After Addded Youtube Destination. ExpectedResult: should be'"+ expectedCount +"' in the Total Count" );
                                      }
                                    }
                                  } );
                                  //Check the input after each destination added
                                  if ( getData < socialBtn.length - 1 ) {
                                    //Get the Current Total count in the Destination listing page
                                    DestinationYoutubeAdd.getText ( '.content-count > strong', function ( currentCountResult ) {
                                      if ( currentCountResult.status !== -1 ) {
                                        currentCount = currentCountResult.value;
                                      }
                                    } );
                                  }
                                }
                                else {
                                  DestinationYoutubeAdd.closeWindow ( ).
                                  //Windows Handling Switch to portal
                                  window_handles ( function ( switchwindowresult ) {
                                    var temp = switchwindowresult.value[ 0 ];
                                    DestinationYoutubeAdd.switchWindow ( temp );
                                  } );
                                  DestinationYoutubeAdd.useXpath ( ).pause ( 3000 ).
                                  //Verify the Destination menu in DISTRIBUTION is visible
                                  verify.containsText ( "//a[text( ) = 'Destinations']", "Destinations" ).
                                  pause ( 3000 ).
                                  //Click on the Destination menu in DISTRIBUTION
                                  click ( "//a[ text( ) = 'Destinations']" ).
                                  useCss ( ).pause ( 3000 )
                                  //video title display in google page mismatch with the videoplayer title 
                                  DestinationYoutubeAdd.writeToExcelFail ( 'boxxspring.xlsx', 'DestinationYoutubeAdd', ++rowCount, 8, 9, "Invalid Message" );
                                }
                              } );
                            }
                            else {
                              DestinationYoutubeAdd.closeWindow ( ).
                              //Windows Handling Switch to portal
                              window_handles ( function ( switchwindowresult ) {
                                var temp = switchwindowresult.value[ 0 ];
                                DestinationYoutubeAdd.switchWindow ( temp );
                              } );
                              DestinationYoutubeAdd.useXpath ( ).pause ( 3000 ).
                              verify.containsText ( "//a[text( ) = 'Destinations']", "Destinations" ).
                              pause ( 3000 ).
                              click ( "//a[ text( ) = 'Destinations']" ).
                              useCss ( ).pause ( 3000 )
                              //get the error message for the invalid password                              
                              DestinationYoutubeAdd.writeToExcelFail ( 'boxxspring.xlsx', 'DestinationYoutubeAdd', ++rowCount, 8, 9, "ActualResult: '"+ google_pwd_error.value +"' . ExpectedResult: 'invalid'" );
                            }
                          } );
                        }
                        else {
                          //get the error message for the invalid email
                          DestinationYoutubeAdd.closeWindow ( ).
                          //Windows Handling Switch to portal
                          window_handles ( function ( switchwindowresult ) {
                            var temp = switchwindowresult.value[ 0 ];
                            DestinationYoutubeAdd.switchWindow ( temp );
                          } );
                          DestinationYoutubeAdd.useXpath ( ).pause ( 3000 ).
                          //Verify the Destination menu in Distribution is visible
                          verify.containsText ( "//a[text( ) = 'Destinations']", "Destinations" ).
                          pause ( 3000 ).
                          //Click on the Destination menu in Distribution
                          click ( "//a[ text( ) = 'Destinations']" ).
                          useCss ( ).pause ( 3000 )
                          DestinationYoutubeAdd.writeToExcelFail ( 'boxxspring.xlsx', 'DestinationYoutubeAdd', ++rowCount, 8, 9, "Invalid Email Id" );
                          if ( getData < socialBtn.length - 1 ) {
                            //Get the Current Total count in the Destination listing page
                            DestinationYoutubeAdd.getText ( '.content-count > strong', function ( currentCountResult ) {
                              if ( currentCountResult.status !== -1 ) {
                                currentCount = currentCountResult.value;
                              }
                            } );
                          }
                        }
                      } );
                    }
                    else {
                    }
                  } );
                }
                else {
                  //check the relevant details displayed in google after auto login in youtube
                  DestinationYoutubeAdd.pause ( 3000 ).                  
                  //Get the current URL Response and value
                  url ( function ( responseUrl ) {
                    var permissionPanel = responseUrl.value;
                    var requirePathe = "oauth2";
                    if ( new RegExp ( requirePathe ).test ( permissionPanel ) == true ) {
                      DestinationYoutubeAdd.pause ( 3000 ).
                      //Verify the Post page in youtube window is visible
                      verify.visible ( "#grant_heading" ).
                      pause ( 3000 ).
                      //Verify the Post Button in youtube window is visible
                      verify.visible ( "#submit_approve_access" ).
                      pause ( 3000 ).
                      //Click on the Post Button in youtube window
                      click ( "#submit_approve_access" ).
                      pause ( 3000 ).
                      //Windows Handling Switch to portal
                      window_handles ( function ( switchwindowresult ) {
                        var temp = switchwindowresult.value[ 0 ];
                        DestinationYoutubeAdd.switchWindow ( temp );
                      } );
                      DestinationYoutubeAdd.pause ( 3000 ).
                      //Wait for the DESTINATION caption is visible in the add destination page
                      waitForElementVisible ( ".typeName-label", 3000, false ).
                      pause ( 3000 ).
                      //Verify the DESTINATION caption is visible in the add destination page
                      verify.containsText ( ".typeName-label", "DESTINATION" ).
                      pause ( 3000 ).useXpath ( ).
                      //Verify the playlist title is visible in the destination page
                      verify.containsText ( "//label[ contains ( .,'"+ playlistTitle[ getData ] +"')]", playlistTitle[ getData ] ).
                      pause ( 3000 ).
                      //Click on the playlist title in the destination page
                      click ( "//label[ contains ( .,'"+ playlistTitle[ getData ] +"')]" ).
                      useCss ( ).pause ( 3000 ).
                      //Clear the data in the Desination title field
                      clearValue ( ".text-input-headline" ).
                      pause ( 3000 ).
                      //Enter the Desination title in the field
                      setValue ( ".text-input-headline", destinationTitle[ getData ] ).
                      pause ( 3000 ).
                      //Wait for the Save button in the destination is visible
                      waitForElementVisible ( "a.btn.btn-primary.btn-180.pull-right", 3000, false ).
                      pause ( 3000 ).
                      //Click on Save button in the destination page
                      click ( "a.btn.btn-primary.btn-180.pull-right" ).
                      useXpath ( ).pause ( 3000 ).
                      //Verify the Destination menu in Distribution is visible
                      verify.containsText ( "//a[text( ) = 'Destinations']", "Destinations" ).
                      pause ( 3000 ).
                      //Click on the Destination menu in Distribution
                      click ( "//a[ text( ) = 'Destinations']" ).
                      useCss ( ).pause ( 3000 ).
                      //Windows Handling Switch to portal
                      getText ( '.content-count > strong', function ( actualCountResult ) {
                        if ( actualCountResult.status !== -1 ) {
                          actualCount = actualCountResult.value;
                          //actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                          expectedCount = ( ( +currentCount ) + ( + 1 ) );
                          if ( actualCount == expectedCount ) {
                            //Write in the spreadsheet: Pass Result and Reason
                            DestinationYoutubeAdd.writeToExcelPass ( 'boxxspring.xlsx', 'DestinationYoutubeAdd', ++rowCount, 8 );
                          }
                          else {
                            //Write in the spreadsheet: Fail Result and Reason
                            DestinationYoutubeAdd.writeToExcelFail ( 'boxxspring.xlsx', 'DestinationYoutubeAdd', ++rowCount, 8, 9, "ActualResult: '"+ actualCount +"' in the Total Count After Deleted. ExpectedResult: should be'"+ expectedCount +"' in the Total Count" );
                          }
                        }
                      } );
                      //Check the input after each destination added
                      if ( getData < socialBtn.length - 1 ) {
                        //Get the Current Total count in the Destination listing page
                        DestinationYoutubeAdd.getText ( '.content-count > strong', function ( currentCountResult ) {
                          if ( currentCountResult.status !== -1 ) {
                            currentCount = currentCountResult.value;
                          }
                        } );
                      }
                    }
                    else {
                      //video title display in google page mismatch with the videoplayer title while autologin
                     DestinationYoutubeAdd.writeToExcelFail ( 'boxxspring.xlsx', 'DestinationYoutubeAdd', ++rowCount, 8, 9, "Google video title mismatch with the Video player title )" );
                    }
                  } );
                }
              } );
            }
            else {
            }
          }
          else {
          }
        }
      } );
    }
    //End the Browser
    DestinationYoutubeAdd.end ( );
  }
};