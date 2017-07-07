var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var currentCount;
var getData,rowCount = 1;
var worksheet = workbook.Sheets[ 'ContentDelete' ];
var searchContent = [ ];
var contentTitle = [ ];
var result = [ ];
var expectedCount;
var actualCount;
module.exports = {
  tags: [ 'contentDelete' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;    
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Content Delete': function ( contentsDelete ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Search Collection Title
      if ( z.includes ( 'A' ) ) {
        searchContent.push ( worksheet[ z ].v );
      }
      //Read Collection Title
      if ( z.includes ( 'B' ) ) {
        contentTitle.push ( worksheet[ z ].v );
      }
    }
    if ( contentTitle.length > 1 ) {
      contentsDelete.pause ( 3000 ).useXpath ( ).
      //Wait for the ALL Menu in CONTENT is visible
      waitForElementVisible ( "//a[@href='/properties/81/smart_collections'][text( ) ='All']", 3000, false ).
      pause ( 3000 ).
      //Click on the ALL menu in CONTENT
      click ( "//a[@href='/properties/81/smart_collections'][text( ) ='All']" ).
      pause ( 4000 ).useCss ( ).
      //Get the Current total count in the Content listing page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, currentCount.length - 1 );
        }
        for ( var getData = 1,rowCount = 1; getData < contentTitle.length; getData++ ) {
          contentsDelete.pause ( 3000 ).useXpath ( ).
          //Wait for the Search content is visible in the listing page
          waitForElementVisible ( "//h2[contains ( .,'"+ searchContent[ getData ] +"' )]", 3000, false ).
          pause ( 3000 ).
          //Click on the Searched Content in the listing page
          click ( "//h2[contains ( .,'"+ searchContent[ getData ] +"' )]" ).
          useCss ( ).pause ( 3000 ).
          //Wait for the Headline field is visible in the edit page
          waitForElementVisible ( ".text-input-headline", 3000, false ).
          pause ( 3000 ).
          //Verify the Headline field is visible in the edit page
          verify.visible ( ".text-input-headline" ).
          pause ( 3000 ).
          //Clear the data in Headline field.
          clearValue ( ".text-input-headline" ).
          pause ( 3000 ).
          //Enter the data in Headline field.
          setValue ( ".text-input-headline", contentTitle[ getData ] ).
          pause ( 3000 ).
          //Verify the Delete button is visible in the edit content page
          verify.visible ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
          //Click on the Delete button
          click ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
          pause ( 3000 ).
          //Check the existance of delete confirmation dialog
          verify.visible ( "dialog[ name=deleteVerification ]" ).
          pause ( 3000 ).
          //Verify the Cancel Button in Delete Dialog is visible
          verify.visible ( ".link-secondary" ).
          //Click Cancel Button in Delete Dialog
          click ( ".link-secondary" ).
          pause ( 3000 ).
          //Verify the Delete button is visible in the edit page
          verify.visible ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
          //Click on the Delete button in the edit content page
          click ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
          pause ( 3000 ).
          //Check the existance of delete confirmation to delete
          verify.visible ( "dialog[ name=deleteVerification ]" ).
          //Verify the Delete Button in Delete Dialog is visible
          verify.visible ( "button.btn:nth-child( 2 )" ).
          pause ( 3000 ).
          //Click Delete Button in Delete Dialog
          click ( "button.btn:nth-child( 2 )" ).
          pause ( 3000 ).useXpath ( ).
          //Wait for the ALL Menu in CONTENT is visible
          waitForElementVisible ( "//a[@href='/properties/81/smart_collections'][text( ) ='All']", 3000, false ).
          pause ( 3000 ).
          //Click on the ALL Menu in CONTENT
          click ( "//a[@href='/properties/81/smart_collections'][text( ) ='All']" ).
          pause ( 4000 ).useCss ( ).
          //Get the Actual total count in the Content listing page
          getText ( '.content-count > strong', function ( actualCountResult ) {
            if ( actualCountResult.status !== -1 ) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring ( 1, actualCount.length - 1 );
              expectedCount = ( ( +currentCount ) - 1 );
              if ( actualCount == expectedCount ) {
                //Write in the Excel file:PASS Result
                contentsDelete.writeToExcelPass ( 'boxxspring.xlsx', 'ContentDelete', ++rowCount, 4 );
                result.push ( 'PASS' );
              }
              else {
                //Write in the Excel file:FAIL Result and Reason
                contentsDelete.writeToExcelFail ( 'boxxspring.xlsx', 'ContentDelete', ++rowCount, 4, 5, "ActualResult: '"+ actualCount +"' in the Total Count After Deleted Content. ExpectedResult: should be'"+ expectedCount +"' in the Total Count "  );
                result.push ( 'FAIL' );
              }
            }
          } );
          if ( getData < contentTitle.length - 1 ) {
            //Get the total count in the Content listing page
            contentsDelete.getText ( '.content-count > strong', function ( currentCountResult ) {
              if ( currentCountResult.status !== -1 ) {
                currentCount = currentCountResult.value;
                currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
              }
              contentsDelete.useXpath ( ).
              //Wait for the ALL Menu in CONTENT is visible
              waitForElementVisible ( "//a[@href='/properties/81/smart_collections'][text( ) ='All']", 3000, false ).
              pause ( 3000 ).
              //Click on the ALL Menu in CONTENT
              click ( "//a[@href='/properties/81/smart_collections'][text( ) ='All']" ).
              pause ( 10000 ).useCss ( ).
              //Get the total count in the Content listing page
              getText ( '.content-count > strong', function ( currentCountResult ) {
                if ( currentCountResult.status !== -1 ) {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
                }
              } );
            } );
          }
        }
      } );
    }
    //End the Browser
    contentsDelete.end ( );
  }
}