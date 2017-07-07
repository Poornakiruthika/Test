var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'DestinationYoutubeEdit' ];
var socialSearch = [ ];
var playlistTitle = [ ];
var destinationTitle = [ ];
var editTitle = [ ];
var result = [ ];
var currentCount,expectedCount,actualCount;
var getData, rowCount, convertData = 1;
module.exports = {
  tags: [ 'destinationYoutubeEdit' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Destination Youtube Edit': function ( youtubeDestinationEdit ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Category Title
      if ( z.includes ( 'A' ) ) {
        socialSearch.push ( worksheet[z].v );
      }
      //Read Category Description
      if ( z.includes ( 'B' ) ) {
        playlistTitle.push ( worksheet[z].v );
      }
      //Read Short Title
      if ( z.includes ( 'C' ) ) {
        destinationTitle.push ( worksheet[z].v );
      }
      //Read Edit Title
      if ( z.includes ( 'D' ) ) {
        editTitle.push ( worksheet[z].v );
      }
    }
    if ( socialSearch.length > 1 ) {
      youtubeDestinationEdit.pause ( 3000 ).
      //Verify the DISTRIBUTION in Side menu bar is visible
      verify.visible ( "div.content-header:nth-child( 7 )" ).
      pause ( 3000 ).
      //Click on the DISTRIBUTION in Side menu bar
      click ( "div.content-header:nth-child( 7 )" ).
      pause ( 3000 ).useXpath ( ).pause ( 3000 ).
      //Verify the Destination menu in DISTRIBUTION is visible
      verify.containsText ( "//a[text ( ) = 'Destinations']", "Destinations" ).
      pause ( 3000 ).
      //Click on the Destination menu in DISTRIBUTION
      click ( "//a[ text ( ) = 'Destinations']" ).
      useCss ( ).pause ( 3000 ).
      //Get the Current Total count in the Destination listing page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
        }
        for ( var getData = 1, rowCount = 1; getData < destinationTitle.length; getData++ ) {
          youtubeDestinationEdit.pause ( 3000 ).useXpath ( ).
          //Wait for the Search Field is visible
          waitForElementVisible ( "//div[@class='suggestion-dropdown-wrap']/input", 3000, false ).
          pause ( 3000 ).
          //Verify the Search Field is visible
          verify.visible ( "//div[@class='suggestion-dropdown-wrap']/input" ).
          pause ( 3000 ).
          //Clear avail data in the Search Field
          clearValue ( "//div[@class='suggestion-dropdown-wrap']/input" ).
          pause ( 3000 ).
          //Enter data in the Search Field input
          setValue ( "//div[@class='suggestion-dropdown-wrap']/input", destinationTitle[ getData ] ).useCss ( )
          youtubeDestinationEdit.pause ( 3000 ).         
          //Wait for Total Count label is visible
          waitForElementVisible ( ".content-count>strong", 3000, false ).
          //Verify the Total Count label is visible
          verify.visible ( ".content-count>strong" )
          //Check the Searched Video Count
          youtubeDestinationEdit.getText ( '.content-count > strong', function ( currentCountResult ) {
            if ( getData >= socialSearch.length ) {
              convertData = getData - ( socialSearch.length - 1 );
              getData++;
            }
            if ( currentCountResult.status !== -1 ) {
              searchCount = currentCountResult.value;
              //console.log (  "Two test", videoTitle[ convertData ]  );
              searchCount = searchCount.substring ( 1, searchCount.length - 1 );
            }
            //Check IF Searched Video Count is greater than zero,it will continue in the statement or it will be move else part
            if ( searchCount > 0 ) {
              youtubeDestinationEdit.pause ( 3000 ).useXpath ( ).
              //Wait for the Searched destination to visible
              waitForElementVisible ( "(//h2[@class='ng-binding'])[1]", 3000, false ).
              pause ( 3000 ).
              //Verify the Searched destination is visible
              verify.visible ( "(//h2[@class='ng-binding'])[1]" ).
              pause ( 3000 ).
              //Click on the Searched destination
              click ( "(//h2[@class='ng-binding'])[1]" ).
              pause ( 3000 ).
              //Verify the Contains text in the provider field is visible
              verify.containsText ( "//div[@class='input-like'][contains ( .,'Youtube' )]", "Youtube" ).
              pause ( 3000 ).useCss ( ).
              //Verify the Headline text field is visible
              verify.visible ( ".text-input-headline" ).
              pause ( 3000 ).
              //Clear the data in the Headline text field
              clearValue ( ".text-input-headline" ).
              pause ( 9000 ).
              //Enter the data in the Headline text field
              setValue ( ".text-input-headline", editTitle[ convertData ] ).
              pause ( 3000 ).useXpath ( ).
              //Verify the Provider field is visible
              verify.visible ( "//div[@class='input-like'][contains ( .,'"+ socialSearch[ convertData ] +"' )]" ).
              pause ( 3000 ).
              //Verify the Contains text in the provider field is visible
              verify.containsText ( "//div[@class='input-like'][contains ( .,'"+ socialSearch[ convertData ] +"' )]", socialSearch[ convertData ] ).
              pause ( 3000 ).
              //Verify the Contains text in the Channel field is visible
              verify.visible ( "//div[@class='input-like ng-binding']" ).
              pause ( 3000 )
              var playlistTemp = playlistTitle[ convertData ];
              //Split the data from excel input and stored in variable
              var playlistTemp_array = playlistTemp.split ( ',' );
              for ( var playlistCount = 0; playlistCount < playlistTemp_array.length; playlistCount++ ) {
                playlistTemp_array[ playlistCount ] = playlistTemp_array[ playlistCount ].replace ( /^\s*/, "" ).replace ( /\s*$/, "" );
                console.log ( "Comma Separated:", playlistTemp_array[ playlistCount ] )
                youtubeDestinationEdit.useXpath ( ).pause ( 3000 ).
                //Verify the Playlist field is visible
                verify.containsText ( "//label[ contains ( .,'"+ playlistTemp_array[ playlistCount ] +"' )]", playlistTemp_array[ playlistCount ] ).
                pause ( 3000 ).
                //Click on the Playlist field
                click ( "//label[ contains ( .,'"+ playlistTemp_array[ playlistCount ] +"' )]" ).
                pause ( 3000 )
              }
              youtubeDestinationEdit.useXpath ( ).
              //Verify the Save button is visible
              waitForElementVisible ( "//a[@class='btn btn-icon btn-active']", 3000, false ).
              pause ( 3000 ).
              //Click on the Save button
              click ( "//a[@class='btn btn-icon btn-active']" ).
              pause ( 3000 ).
              //Verify the Destination menu in DISTRIBUTION is visible
              verify.containsText ( "//a[text ( ) = 'Destinations']", "Destinations" ).
              pause ( 3000 ).
              //Click on the Destination menu in DISTRIBUTION
              click ( "//a[ text ( ) = 'Destinations']" ).
              useCss ( ).pause ( 3000 ).
              //Wait for the Search Field is visible
              waitForElementVisible ( ".ng-pristine", 3000, false ).
              pause ( 3000 ).
              //Verify the Search Field is visible
              verify.visible ( ".ng-pristine" ).
              pause ( 3000 ).
              //Clear the Search Field input
              clearValue ( ".ng-pristine" )
              pause ( 3000 ).
              //Enter the Search Field input
              setValue ( ".ng-pristine", editTitle[ convertData ] )
              youtubeDestinationEdit.pause ( 3000 ).
              //Get the Actual Total count  after searched in the Destination listing page
              getText ( '.content-count > strong', function ( actualCountResult ) {
                if ( actualCountResult.status !== -1 ) {
                  actualCount = actualCountResult.value;
                  if ( actualCount > 0 ) {
                    //Write in the spreadsheet: Pass Result and Reason
                    youtubeDestinationEdit.writeToExcelPass ( 'boxxspring.xlsx', 'DestinationYoutubeEdit', ++rowCount, 6 );
                  }
                  else {
                    //Write in the spreadsheet: Fail Result and Reason
                    youtubeDestinationEdit.writeToExcelFail ( 'boxxspring.xlsx', 'DestinationYoutubeEdit', ++rowCount, 6, 7, "ActualResult: '"+ actualCount +"' in the Total Count After Youtube Destination Edit. ExpectedResult: should be 1 in the Total Count " );
                  }
                }
              } );
              //Check the input after each destination added
              youtubeDestinationEdit.pause ( 3000 )
              if ( getData < socialSearch.length - 1 ) {
                youtubeDestinationEdit.getText ( '.content-count > strong', function ( currentCountResult ) {
                  if ( currentCountResult.status !== -1 ) {
                    currentCount = currentCountResult.value;
                  }
                } );
              }
              youtubeDestinationEdit.useXpath ( ).pause ( 3000 ).
              //Verify the Destination menu in DISTRIBUTION is visible
              verify.containsText ( "//a[text ( ) = 'Destinations']", "Destinations" ).
              pause ( 3000 ).
              //Click on the Destination menu in DISTRIBUTION
              click ( "//a[ text ( ) = 'Destinations']" ).
              useCss ( )
            }
            else {
              //Write the Excel data for Search FAIL Result and Reason
              youtubeDestinationEdit.writeToExcelFail ( 'boxxspring.xlsx', 'DestinationYoutubeEdit', ++rowCount, 6, 7, "0<-->No Results" ).
              useXpath ( ).pause ( 3000 ).
              //Verify the Destination menu in DISTRIBUTION is visible
              verify.containsText ( "//a[text ( ) = 'Destinations']", "Destinations" ).
              pause ( 3000 ).
              //Click on the Destination menu in DISTRIBUTION
              click ( "//a[ text ( ) = 'Destinations']" ).
              useCss ( )
            }
          } );
        }
      } );
    }
    //End the Browser
    youtubeDestinationEdit.end ( );
  }
}