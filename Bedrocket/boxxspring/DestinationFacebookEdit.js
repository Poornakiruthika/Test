//This Function is using for Edit Facebook Destination in the DISTRIBUTION
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var currentCount;
var worksheet = workbook.Sheets[ 'DestinationFacebookEdit' ];
var socialSearch = [ ];
var playlistTitle = [ ];
var destinationTitle = [ ];
var editTitle = [ ];
var result = [ ];
var expectedCount;
var actualCount;
var getData, rowCount, convertData = 1;
module.exports = {
  tags: [ 'destinationFacebookEdit' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Destination Facebook Edit': function ( facebookDestinationEdit ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Provider Name
      if ( z.includes ( 'A' ) ) {
        socialSearch.push ( worksheet[ z ].v );
      }
      //Read Playlist Title
      if ( z.includes ( 'B' ) ) {
        playlistTitle.push ( worksheet[ z ].v );
      }
      //Read Search the Facebook Destination Title
      if ( z.includes ( 'C' ) ) {
        destinationTitle.push ( worksheet[ z ].v );
      }
      //Read Edit Facebook Destination Title
      if ( z.includes ( 'D' ) ) {
        editTitle.push ( worksheet[ z ].v );
      }
    }
    if ( socialSearch.length > 1 ) {
      facebookDestinationEdit.pause ( 3000 ).
      //Verify the Distribution menu in Side bar is visible
      verify.visible ( "div.content-header:nth-child( 7 )" ).
      pause ( 3000 ).
      //Click on the Distribution menu in Side bar
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
        for ( var getData = 1, rowCount = 1; getData < destinationTitle.length; getData++ ) {
          facebookDestinationEdit.pause ( 3000 ).useXpath ( ).
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
          setValue ( "//div[@class='suggestion-dropdown-wrap']/input", destinationTitle[ getData ] ).useCss ( )
          facebookDestinationEdit.pause ( 3000 ).         
          waitForElementVisible ( ".content-count>strong", 3000, false ).
          verify.visible ( ".content-count>strong" ).
          //Get the Saerched Total count in Destination listing page
          getText ( '.content-count > strong', function ( currentCountResult ) {                      
            if ( currentCountResult.status !== -1 ) {
              searchCount = currentCountResult.value;
              searchCount = searchCount.substring ( 1, searchCount.length - 1 );
            }
            if ( getData >= socialSearch.length ) {
              convertData = getData - ( socialSearch.length - 1 );
              getData++;
            } 
            //Check IF Searched Video Count is greater than zero,it will continue in the statement or it will be move else statement
            if ( searchCount > 0 ) {
              facebookDestinationEdit.pause ( 3000 ).useXpath ( ).
              //Wait for the Searched listed in the page is visible
              waitForElementVisible ( " ( //DIV[@class='content-title'] )[1]", 3000, false ).
              pause ( 3000 ).
              //Verify the Searched listed in the page is visible
              verify.visible ( " ( //DIV[@class='content-title'] )[1]" ).
              pause ( 3000 ).
              //Click on the Searched listed in the page
              click ( " ( //DIV[@class='content-title'] )[1]" ).
              pause ( 3000 ).
              //Verify the Contains Text in the Destination page is visible
              verify.containsText ( "//label[ contains ( .,'"+ playlistTitle[ convertData ] +"' )]", playlistTitle[ convertData ] ).
              pause ( 3000 ).
              //Click on the Contains Text in the Destination page
              click ( "//label[ contains ( .,'"+ playlistTitle[ convertData ] +"' )]" ).
              useCss ( ).pause ( 3000 ).
              //Wait for the Headline field is visible
              waitForElementVisible ( ".text-input-headline", 3000, false ).
              pause ( 3000 ).
              //Clear the data in the Headline field
              clearValue ( ".text-input-headline" ).
              pause ( 3000 ).
              //Enter the data in the Headline field
              setValue ( ".text-input-headline", editTitle[ convertData ] ).
              pause ( 3000 ).useXpath ( ).
              //Verify the Provider Field is visible
              verify.visible ( "//div[@class='input-like'][contains ( .,'"+ socialSearch[ convertData ] +"' )]" ).
              pause ( 3000 ).
              //Verify the Provider name contains text is visible
              verify.containsText ( "//div[@class='input-like'][contains ( .,'"+ socialSearch[ convertData ] +"' )]", socialSearch[ convertData ] ).
              pause ( 3000 ).
              //Verify the Page Field is visible
              verify.visible ( "//div[@class='input-like ng-binding']" ).
              pause ( 3000 ).
              //Wait for the Save button is visible
              waitForElementVisible ( "//a[@class='btn btn-icon btn-active']", 3000, false ).
              pause ( 3000 ).
              //Click on the Save button 
              click ( "//a[@class='btn btn-icon btn-active']" )
              facebookDestinationEdit.pause ( 3000 ).
              //Verify the Destination menu in DISTRIBUTION is visible
              verify.containsText ( "//a[text ( ) = 'Destinations']", "Destinations" ).
              pause ( 3000 ).
              //Click on the Destination menu in DISTRIBUTION
              click ( "//a[ text ( ) = 'Destinations']" ).
              useCss ( ).pause ( 3000 ).
              //Wait for the Search input Field is visible
              waitForElementVisible ( ".ng-pristine", 3000, false ).
              pause ( 3000 ).
              //Verify the Search input Field is visible
              verify.visible ( ".ng-pristine" ).
              pause ( 3000 ).
              //Clear the data in the Search input Field
              clearValue ( ".ng-pristine" ).
              pause ( 3000 ).
              //Enter the data in the Search input Field
              setValue ( ".ng-pristine", editTitle[ convertData ] )
              pause ( 3000 ).
              facebookDestinationEdit.pause ( 3000 ).
              //Get the Actual Total count in Destination listing page after Edit the destination
              getText ( '.content-count > strong', function ( actualCountResult ) {
                if ( actualCountResult.status !== -1 ) {
                  actualCount = actualCountResult.value;
                  if ( actualCount > 0 ) {
                    //Write in the spreadsheet: Pass Result and Reason
                    facebookDestinationEdit.writeToExcelPass ( 'boxxspring.xlsx', 'DestinationFacebookEdit', ++rowCount, 6 );
                  }
                  else {
                    //Write in the spreadsheet: Fail Result and Reason
                    facebookDestinationEdit.writeToExcelFail ( 'boxxspring.xlsx', 'DestinationFacebookEdit', ++rowCount, 6, 7, "ActualResult: '"+ actualCount +"' in the Total Count After facebook Destination Edit. ExpectedResult: should be 1 in the Total Count " );
                  }
                }
              } );
              //Check the input after each destination added
              facebookDestinationEdit.pause ( 3000 )
              if ( getData < socialSearch.length - 1 ) {
                //Get the Current Total count in Destination listing page
                facebookDestinationEdit.getText ( '.content-count > strong', function ( currentCountResult ) {
                  if ( currentCountResult.status !== -1 ) {
                    currentCount = currentCountResult.value;
                  }
                } );
              }
              facebookDestinationEdit.useXpath ( ).
              pause ( 3000 ).
              //Verify the Destination menu in DISTRIBUTION is visible
              verify.containsText ( "//a[text ( ) = 'Destinations']", "Destinations" ).
              pause ( 3000 ).
              //Click on the Destination menu in DISTRIBUTION
              click ( "//a[ text ( ) = 'Destinations']" ).
              useCss ( )
            }
            else {
              facebookDestinationEdit.writeToExcelFail ( 'boxxspring.xlsx', 'DestinationFacebookEdit', ++rowCount, 6, 7, "No Results Found" ).
              useXpath ( ).pause ( 3000 ).
              //Verify the Destination menu in DISTRIBUTION is visible
              verify.containsText ( "//a[text ( ) = 'Destinations']", "Destinations" ).
              pause ( 3000 ).
              //Verify the Destination menu in DISTRIBUTION is visible
              click ( "//a[ text ( ) = 'Destinations']" ).
              useCss ( )
            }
          } );
        }
      } );
    }
    //End the Browser
    facebookDestinationEdit.end ( );
  }
}