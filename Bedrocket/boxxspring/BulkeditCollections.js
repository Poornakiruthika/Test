//this function is for check and add the Bulk edit collections
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var currentCount;
var worksheet = workbook.Sheets[ 'BulkeditCollections' ];
var collectionTitle = [ ];
var categoryTitle = [ ];
var searchcategoryTitle = [ ];
var result = [ ];
var expectedCount;
var actualCount;
var getData,rowCount,convertData,getFirstData = 1;
module.exports = {
  tags: [ 'bulkeditCollections' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Bulkedit Collections': function ( BulkeditCollection ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Search Collection Title
      if ( z.includes ( 'A' ) ) {
        collectionTitle.push ( worksheet[ z ].v );
      }
      //Read Collection Title
      if ( z.includes ( 'B' ) ) {
        categoryTitle.push ( worksheet[ z ].v );
      }
      if ( z.includes ( 'C' ) ) {
        searchcategoryTitle.push ( worksheet[ z ].v );
      }
    }
    if ( collectionTitle.length > 1 ) {
      BulkeditCollection.pause ( 3000 ).useXpath( ).
      //Verify the Collection title is visible
      verify.containsText ( "//ul/li/a[ text( ) = '" + collectionTitle[ getFirstData ] + "']", collectionTitle[ getFirstData ] ).
      pause ( 3000 ).
      //Click on the Collection title
      click ( "//ul/li/a[ text( ) = '" + collectionTitle[ getFirstData ] + "']" ).
      pause ( 3000 ).
      useCss( )
      for ( var getData = 1,rowCount = 1; getData < collectionTitle.length; getData++ ) {
        //Get the Current Total count in the Collection listing page
        BulkeditCollection.getText ( '.content-count > strong', function ( currentCountResult ) {
          if ( currentCountResult.status !== -1 ) {
            currentCount = currentCountResult.value;
            currentCount = currentCount.substring ( 1, currentCount.length - 1 );
          }
          //Converting the value from getData to convertData
          if ( getData >= ( collectionTitle.length - 1 ) ) {
            var convertData = ( ( getData - 1 ) - ( collectionTitle.length - 2 ) );
            getData++;
          }
          if ( currentCount > 0 ) {
            BulkeditCollection.pause ( 3000 ).
            //Wait for the Bulk Edit button is visible
            waitForElementVisible ( "a.btn:nth-child( 2 )", 3000, false ).
            pause ( 3000 ).
            //Verify the Bulk Edit button is visible
            verify.visible ( "a.btn:nth-child( 2 )" ).
            pause ( 3000 ).
            //Click on the Bulk Edit button
            click ( "a.btn:nth-child( 2 )" ).
            pause ( 3000 ).
            //Wait for the Bulk Edit dialog box is visible
            waitForElementVisible ( ".dialog-large", 3000, false ).
            pause ( 3000 ).
            //Verify the Bulk Edit dialog box is visible
            verify.visible ( ".dialog-large" ).
            pause ( 3000 ).
            //Verify the Bulk Edit dialog box close button is visible
            verify.visible ( "section.ng-scope:nth-child( 1 ) > h1:nth-child( 1 ) > i:nth-child( 1 )" ).
            pause ( 3000 ).
            //Wait for the Bulk Edit dialog box Search field is visible
            waitForElementVisible ( "input.ng-pristine:nth-child( 3 )", 3000, false ).
            pause ( 3000 ).
            //Verify the Bulk Edit dialog box Search field is visible
            verify.visible ( "input.ng-pristine:nth-child( 3 )" ).
            pause ( 3000 ).
            //Enter data in the Bulk Edit dialog box Search field
            setValue ( "input.ng-pristine:nth-child( 3 )", categoryTitle[ convertData ] ).
            pause ( 3000 ).
            //Click on the Bulk Edit dialog box Search field
            click ( ".suggestion-list-wrap > div:nth-child( 1 ) > div:nth-child( 1 ) > span:nth-child( 1 )" ).
            pause ( 3000 ).
            //Verify the Bulk Edit dialog box Cancel button is visible
            verify.visible ( "section.field-input > a:nth-child( 1 )" ).
            pause ( 3000 ).
            //Wait for the Bulk Edit dialog box Save Button is visible
            waitForElementVisible ( "button.ng-scope", 3000, false ).
            pause ( 3000 ).
            //Click on the Save Button
            click ( "button.ng-scope" ).
            pause ( 3000 ).useXpath( ).
            //Verify the Categories Menu in CONTENT is visible
            verify.containsText ( "//ul/li/a[ text( ) = 'Categories']", "Categories" ).
            pause ( 3000 ).
            //Click on the Categories Menu in CONTENT is visible
            click ( "//ul/li/a[ text( ) = 'Categories']" ).
            useCss( ).pause ( 3000 ).
            //Wait for the Search input field in categories is visible
            waitForElementVisible ( ".search-field-input", 3000, false ).
            //Verify the Search input field in categories is visible
            verify.visible ( ".search-field-input" ).
            //Enter the Search input field in categories is visible
            setValue ( ".search-field-input", categoryTitle[ convertData ] ).           
            keys ( BulkeditCollection.Keys.ENTER ). // hold the control
            click ( ".search-field-input" ).
            keys ( BulkeditCollection.Keys.NULL ). // release the control
            pause ( 3000 ).
            //Wait for the Searched data in categories is visible
            waitForElementVisible ( ".content-container > ng-include:nth-child( 1 )", 3000, false ).
            pause ( 3000 ).
            //Verify the Searched data in categories is visible
            verify.visible ( ".content-container > ng-include:nth-child( 1 )" ).
            pause ( 3000 ).
            //Wait for the View items button in categories is visible
            waitForElementVisible ( ".content-title > a:nth-child( 2 )", 3000, false ).
            pause ( 3000 ).
            //Verify the View items button in categories is visible
            verify.visible ( ".content-title > a:nth-child( 2 )" ).
            pause ( 3000 ).
            //Click on the View items button in categories is visible
            click ( ".content-title > a:nth-child( 2 )" ).
            pause ( 3000 ).
            //Get the Actual Total count in the Categories items page
            getText ( '.content-count > strong', function ( actualCountResult ) {
              if ( convertData > 0 ) {
                rowCount = convertData + 1;
              }
              if ( actualCountResult.status !== -1 ) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, ( actualCount.length - 1 ) );
                expectedCount = currentCount;
                if ( actualCount == expectedCount ) {
                  //Write in the Excel:PASS Result and Reason
                  BulkeditCollection.writeToExcelPass ( 'boxxspring.xlsx', 'BulkeditCollections', ++rowCount, 5 );
                }
                else {
                  //Write in the Excel:FAIL Result and Reaso
                  BulkeditCollection.writeToExcelFail ( 'boxxspring.xlsx', 'BulkeditCollections', ++rowCount, 5, 6, "ActualResult: '"+ actualCount +"' in the Total Count After Added Bulkedit. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
                }
              }
            } );
          }
          else {
            if ( convertData > 0 ) {
              rowCount = convertData;
            }
            //Write in the Excel:PASS Result and Reason
            BulkeditCollection.writeToExcelPass ( 'boxxspring.xlsx', 'BulkeditCollections', ++rowCount, 5 );
          }
          if ( convertData < collectionTitle.length - 1 ) {
            if ( convertData > 0 ) {
              convertData = convertData + 1;
            }
            BulkeditCollection.pause ( 3000 ).useXpath( ).
            //Verify the Collection Title in the Menu is visible
            verify.containsText ( "//ul/li/a[ text( ) = '"+ collectionTitle[ convertData ] +"']", collectionTitle[ convertData ] ).
            pause ( 3000 ).
            //Click on the Collection Title in Menu
            click ( "//ul/li/a[ text( ) = '"+ collectionTitle[ convertData ] +"']" ).
            pause ( 3000 ).useCss( )
          }
        } );
      }
    }
    //End the Browser
    BulkeditCollection.end( );
  }
}