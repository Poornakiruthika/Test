var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var currentCount;
var worksheet = workbook.Sheets['DestinationsDelete'];
var socialSearch = [ ];
var playlistTitle = [ ];
var result = [ ];
var expectedCount;
var actualCount;
var rowCount, getData, convertData = 1;
module.exports = {
  tags: [ 'destinationsDelete' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Destinations Delete': function ( destinationDelete ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z[ 0 ] === '!' ) continue;
      //Read Category Title
      if ( z.includes ( 'A' ) ) {
        socialSearch.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if ( z.includes ( 'B' ) ) {
        playlistTitle.push ( worksheet[ z ].v );
      }
    }
    if ( socialSearch.length > 0 ) {
      destinationDelete.pause ( 3000 ).
      //Verify the Distribution menu in Side bar is visible
      verify.visible ( "div.content-header:nth-child( 7 )" ).
      pause ( 3000 ).
      //click on the Distribution menu in Side bar
      click ( "div.content-header:nth-child( 7 )" ).
      pause ( 3000 ).useXpath ( ).
      //Verify the Destination menu in DISTRIBUTION is visible
      verify.containsText ( "//a[text ( ) = 'Destinations']", "Destinations" ).
      pause ( 3000 ).
      //Click on the Destination menu in DISTRIBUTION
      click ( "//a[ text ( ) = 'Destinations']" ).
      useCss ( ).pause ( 3000 ).
      //Get the Current Total count in Destination listing page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
        }
        for ( var getData = 1, rowCount = 1; getData < socialSearch.length; getData++ ) {
          destinationDelete.pause ( 3000 ).useXpath ( ).
          //Wait for the Search input Field is visible
          waitForElementVisible ( "//div[@class='suggestion-dropdown-wrap']/input", 3000, false ).
          pause ( 3000 ).
          //Verify the Search input Field is visible
          verify.visible ( "//div[@class='suggestion-dropdown-wrap']/input" ).
          pause ( 3000 ).
          //Clear the data in the search input field
          clearValue ( "//div[@class='suggestion-dropdown-wrap']/input" ).
          pause ( 3000 ).
          //Enter the data in the search input field
          setValue ( "//div[@class='suggestion-dropdown-wrap']/input", socialSearch[ getData ] ).useCss ( )
          destinationDelete.pause ( 3000 ).         
          waitForElementVisible ( ".content-count>strong", 3000, false ).
          verify.visible ( ".content-count>strong" )
          //Get the Saerched Total count in Destination listing page
          destinationDelete.getText ( '.content-count > strong', function ( searchCountResult ) {
            if ( getData >= socialSearch.length ) {
              convertData = getData - ( socialSearch.length - 1 );
              getData++;
            }
            if ( searchCountResult.status !== -1 ) {
              searchCount = searchCountResult.value;
              searchCount = searchCount.substring ( 1, searchCount.length - 1 );
            }
            //Check IF Searched Video Count is greater than zero,it will continue in the statement or it will be move else part
            if ( searchCount > 0 ) {
              destinationDelete.pause ( 3000 ).useXpath ( ).
              //Wait for the Searched listed in the page is visible
              waitForElementVisible ( " ( //DIV[@class='content-title'] )[1]", 3000, false ).
              pause ( 3000 ).
              //Verify the Searched listed in the page is visible
              verify.visible ( " ( //DIV[@class='content-title'] )[1]" ).
              pause ( 3000 ).
              //Click on the Searched listed title
              click ( " ( //DIV[@class='content-title'] )[1]" ).
              pause ( 3000 ).
              //Verify the Contains Text in the Destination page is visible
              verify.containsText ( "//div[@class='input-like'][ contains (.,'"+ playlistTitle[ convertData ] +"')]", playlistTitle[ convertData ] ).
              pause ( 3000 ).
              //Verify the the Contains Text in the Destination page is visible
              verify.visible ( "//div[@class='input-like'][ contains (.,'"+ playlistTitle[ convertData ] +"'  )]").
              pause ( 3000 ).useCss ( ).
              //Wait for the Delete button is visible in the page              
              waitForElementVisible ( "a.btn-delete [ng-click='showDeleteVerification( );']", 3000, false ).
              pause ( 3000 ).
              //Verify the Delete button is visible in the page  
              verify.visible ( ".btn-delete > span[ng-click='showDeleteVerification( );']" ).
              pause ( 3000 ).
              //Click on the Delete button is visible in the page  
              click ( ".btn-delete > span[ng-click='showDeleteVerification( );']" ).
              pause ( 3000 ).
              //Check the existance of delete confirmation dialog
              verify.visible ( "dialog[name=deleteVerification ]" ).
              pause ( 3000 ).
              //Verify the Cancel Button is visible in Delete Dialog
              verify.visible ( ".link-secondary" ).
              //Click on the Cancel Button in Delete Dialog
              click ( ".link-secondary" ).
              pause ( 3000 ).
              //Verify the Delete button is visible in the page      
              verify.visible ( ".btn-delete > span[ng-click='showDeleteVerification( );']" ).
              pause ( 3000 ).
              //Click on the Delete button is visible in the page  
              click ( ".btn-delete > span[ng-click='showDeleteVerification( );' ]" ).
              pause ( 3000 ).
              //Verify the Delete Dialog box is visible
              verify.visible ( "dialog[ name=deleteVerification ]" ).
              //Verify the Delete Button is visible in Delete Dialog
              verify.visible ( "button.btn:nth-child( 2 ) " ).
              pause ( 3000 ).
              //Click on the Cancel Button in Delete Dialog
              click ( "button.btn:nth-child( 2 )" ).
              pause ( 3000 ).useXpath ( ).
              //Verify the Contains Text as Destinations is visible
              verify.containsText ( "//a[text ( ) = 'Destinations']", "Destinations" ).
              pause ( 3000 ).
              //Click on the Contains Text as Destinations
              click ( "//a[ text ( ) = 'Destinations']" ).
              useCss ( ).pause ( 3000 ).
              //Wait for the Search input Field is visible
              waitForElementVisible ( ".ng-pristine", 3000, false ).
              pause ( 3000 ).
              //Verify the Search input Field is visible
              verify.visible ( ".ng-pristine" ).
              pause ( 3000 ).
              //Clear the data in Search input Field
              clearValue ( ".ng-pristine" ).
              pause ( 3000 ).
              //Enter the data in Search input Field
              setValue ( ".ng-pristine", socialSearch[ convertData ] )
              destinationDelete.pause ( 3000 ).
              //Get the Actual Total count in Destination listing page
              getText ( '.content-count > strong', function ( actualCountResult ) {
                if ( actualCountResult.status !== -1 ) {
                  actualCount = actualCountResult.value;
                  expectedCount = ( ( +searchCount ) - 1 );
                  var expectedCount1 = ( searchCount - 1 );
                  if ( actualCount == expectedCount ) {
                    //Write in the spreadsheet: PASS Result
                    destinationDelete.writeToExcelPass ( 'boxxspring.xlsx', 'DestinationsDelete', ++rowCount, 4 );
                  }
                  else {
                    //Write in the spreadsheet: Fail Result and Reason
                    destinationDelete.writeToExcelFail ( 'boxxspring.xlsx', 'DestinationsDelete', ++rowCount, 4, 5, "ActualResult: '"+ actualCount +"' in the Total Count After Deleted Destination. ExpectedResult: should be 0 in the Total Count " );
                  }
                }
              } );                       
              destinationDelete.pause ( 3000 ).useXpath ( ).
              //Verify the Contains Text as Destinations is visible
              verify.containsText ( "//a[text ( ) = 'Destinations']", "Destinations" ).
              pause ( 3000 ).
              //Click on the Contains Text as Destinations
              click ( "//a[ text ( ) = 'Destinations']" ).
              useCss ( )
              //Check the input after each destination added     
              if ( getData < socialSearch.length - 1 ) {
                destinationDelete.getText ( '.content-count > strong', function ( currentCountResult ) {
                  if ( currentCountResult.status !== -1 ) {
                    currentCount = currentCountResult.value;
                  }
                } );
              }
            }
            else {
              //Write in the spreadsheet: Fail Result and Reason
              destinationDelete.writeToExcelFail ( 'boxxspring.xlsx', 'DestinationsDelete', ++rowCount, 4, 5, "0 No Results" ).
              useXpath ( ).pause ( 3000 ).
              //Verify the Contains Text as Destinations is visible
              verify.containsText ( "//a[text ( ) = 'Destinations']", "Destinations" ).
              pause ( 3000 ).
              //Click on the Contains Text as Destinations
              click ( "//a[ text ( ) = 'Destinations']" ).
              useCss ( )
              //Check the input after each destination added  
              if ( getData < socialSearch.length - 1 ) {
                destinationDelete.getText ( '.content-count > strong', function ( currentCountResult ) {
                  if ( currentCountResult.status !== -1 ) {
                    currentCount = currentCountResult.value;
                  }
                } );
              }
            }
          } );
        }
      } );
    }
    //End the Browser
    destinationDelete.end ( );
  }
}