//this function is for check and Add the Collections Menu
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var currentCount;
var worksheet = workbook.Sheets['CollectionsmenuAdd'];
var collectionTitle = [ ];
var collectiondesc = [ ];
var collectionPublic = [ ];
var result = [ ];
var expectedCount;
var actualCount;
var rowCount,getData = 1;
module.exports = {
  tags: ['collectionsmenuAdd'],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Collectionsmenu Add': function ( CollectionsAdd ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Collection Title
      if ( z.includes ( 'A' ) ) {
        collectionTitle.push ( worksheet[ z ].v );
      }
      //Read Collection Description
      if ( z.includes ( 'B' ) ) {
        collectiondesc.push ( worksheet[ z ].v );
      }
      //Read Collection Public
      if ( z.includes ( 'C' ) ) {
        collectionPublic.push ( worksheet[ z ].v );
      }
    }
    if ( collectionTitle.length > 1 ) {
      CollectionsAdd.pause ( 3000 ).
      useXpath ( ).
      //Wait to visible for the All button
      waitForElementVisible ( "//a[ @href='/properties/81/collections' ][text( )='All' ]", 3000, false ).
      pause ( 3000 ).
      //Click on the All button
      click ( "//a[ @href='/properties/81/collections' ][text( )='All' ]" ).
      pause ( 3000 ).
      useCss ( ).
      //Get the Collections total count in the Collections Listing page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, currentCount.length - 1 );
        }
        for ( var getData = 1,rowCount = 1; getData < collectionTitle.length; getData++ ) {
          CollectionsAdd.pause ( 9000 ).          
          waitForElementVisible ( "div.content-header:nth-child( 4 ) > a:nth-child( 2 )", 3000, false ).
          pause ( 3000 ).
          //Verift the text as COLLECTIONS in the Page
          verify.containsText ( "div.content-header:nth-child( 4 ) > a:nth-child( 2 )", "COLLECTIONS" ).
          pause ( 3000 ).
          waitForElementVisible ( "div.content-header:nth-child( 4 ) > span:nth-child( 3 )", 3000,false ).
          pause ( 3000 ).
          verify.visible ( "div.content-header:nth-child( 4 ) > span:nth-child( 3 )" ).
          pause ( 3000 ).
          //Click on the Collection Add
          click ( "div.content-header:nth-child( 4 ) > span:nth-child( 3 )" ).
          pause ( 3000 ).
          waitForElementVisible ( ".text-input-headline", 3000, false ).
          pause ( 3000 ).
          //Verify the Collection title in the field
          verify.visible ( ".text-input-headline" ).
          pause ( 3000 ).
          //Enter the Collection title in the field
          setValue ( ".text-input-headline", collectionTitle[ getData ] ).
          pause ( 3000 ).
          //Check the valid URL from given URL
          waitForElementVisible ( ".btn-slider", 3000, false ).
          pause ( 3000 )
          var expectedYES = "YES";
          var expectedNO = "NO";
          //Check the condition for YES option
          if ( expectedYES === collectionPublic[ getData ] ) {
            CollectionsAdd.waitForElementVisible ( ".btn-secondary", 3000, false ).
            pause ( 3000 ).
            verify.visible ( ".btn-secondary" ).
            pause ( 3000 ).
            //Click on the Yes button
            click ( ".btn-secondary" ).
            pause ( 3000 ).
            //Wait for the YES option is visible
            waitForElementVisible ( ".text-success", 3000, false ).
            pause ( 3000 ).
            //Verify the YES option is visible
            verify.visible ( ".text-success" ).
            pause ( 3000 )
          }
          //Check the condition for NO option
          else if ( expectedNO === collectionPublic[ getData ] ) {
            CollectionsAdd.waitForElementVisible ( ".btn-secondary", 3000, false ).
            pause ( 3000 ).
            verify.visible ( ".btn-secondary" ).
            pause ( 3000 ).
            //Wait for the NO option is visible
            waitForElementVisible ( ".text-private", 3000, false ).
            pause ( 3000 ).
            //Verify the NO option is visible
            verify.visible ( ".text-private" ).
            pause ( 3000 )
          }
          //Wait for the Collection description in the field is visible
          CollectionsAdd.waitForElementVisible ( "#artifact-url>.ng-pristine", 3000, false ).
          pause ( 3000 ).
          //Verify the Collection description in the field is visible
          verify.visible ( "#artifact-url>.ng-pristine" ).
          pause ( 3000 ).
          //Enter the Collection description in the field
          setValue ( "#artifact-url>.ng-pristine", collectiondesc[ getData ] ).
          pause ( 3000 ).
          //Wait for the SAve button is visible
          waitForElementVisible ( ".btn-active", 3000, false ).
          pause ( 3000 ).
          //Click on the Save button
          click ( ".btn-active" ).
          pause ( 3000 ).
          useXpath ( ).
          //Wait for visible for the All button
          waitForElementVisible ( "//a[ @href='/properties/81/collections' ][text( )='All' ]", 3000, false ).
          pause ( 3000 ).
          //Click on the All button
          click ( "//a[ @href='/properties/81/collections' ][text( )='All' ]" ).
          pause ( 3000 ).
          useCss ( ).
          //Get the Collections Actual total count in the Collections Listing page
          getText ( '.content-count > strong', function ( actualCountResult ) {
            if ( actualCountResult.status !== -1 ) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring ( 1, ( actualCount.length - 1 ) );
              expectedCount = ( ( +currentCount ) + ( + 1 ) );
              if ( actualCount == expectedCount ) {
                //Write the Excel for Pass Result and Reason
                CollectionsAdd.writeToExcelPass ( 'boxxspring.xlsx', 'CollectionsmenuAdd', ++rowCount, 5 );
              }
              else {
                //Write the Excel for Fail Result and Reason
                CollectionsAdd.writeToExcelFail ( 'boxxspring.xlsx', 'CollectionsmenuAdd', ++rowCount, 5, 6, "ActualResult: '"+ actualCount +"' in the Total Count After Added New Collections Menu. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
              }
            }
          } );
          if ( getData < collectionTitle.length - 1 ) {
            CollectionsAdd.getText ( '.content-count > strong', function ( currentCountResult ) {
              if ( currentCountResult.status !== -1 ) {
                currentCount = currentCountResult.value;
                currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
              }
              CollectionsAdd.useXpath ( ).
              //Wait for visible for the All button
              waitForElementVisible ( "//a[ @href='/properties/81/collections' ][text( )='All' ]", 3000, false ).
              pause ( 3000 ).
              //Click on the All button
              click ( "//a[ @href='/properties/81/collections' ][text( )='All' ]" ).
              pause ( 3000 ).
              useCss ( ).
              //Get the Collections total count in the Collections Listing page
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
    CollectionsAdd.end ( );
  }
}