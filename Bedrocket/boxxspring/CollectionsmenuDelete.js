//this function is for check and Delete the Collections Menu 
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var currentCount;
var worksheet = workbook.Sheets[ 'CollectionsmenuDelete' ];
var searchCollection = [ ];
var collectionTitle = [ ];
var result = [ ];
var expectedCount;
var actualCount;
var getData,rowCount = 1;
module.exports = {
  tags: [ 'collectionsmenuDelete' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;    
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Collectionsmenu Delete': function ( CollectionsDeletemenu ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Search Collection Title
      if ( z.includes ( 'A' ) ) {
        searchCollection.push ( worksheet[ z ].v );
        console.log ( worksheet[ z ].v );
      }
      //Read Collection Title
      if ( z.includes ( 'B' ) ) {
        collectionTitle.push ( worksheet[ z ].v );
        console.log ( worksheet[ z ].v );
      }
    }
    if ( collectionTitle.length > 1 ) {
      CollectionsDeletemenu.pause ( 3000 ).useXpath ( ).
      //Check and Wait for the ALL button in the collections is visible
      waitForElementVisible ( "//a[@href='/properties/81/collections'][text( ) ='All']", 3000, false ).
      pause ( 3000 ).
      //Click on the All button in the collections
      click ( "//a[@href='/properties/81/collections'][text( ) ='All']" ).
      pause ( 3000 ).
      useCss ( ).
      //Get the Current Total Count in the Collections listing page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
        }
        for ( var getData = 1,rowCount = 1; getData < collectionTitle.length; getData++ ) {
          CollectionsDeletemenu.pause ( 3000 ).useXpath ( ).
          //Check and Wait for the Search input field in the collections is visible
          waitForElementVisible ( "//h2[contains (.,'"+ searchCollection[ getData ] +"')]", 3000, false ).
          pause ( 3000 ).
          //Click on the Search collections in the collections page
          click ( "//h2[contains (.,'"+ searchCollection[ getData ] +"')]" ).
          useCss ( ).pause ( 3000 ).
          //Check and Wait for the Headline field in the collections is visible
          waitForElementVisible ( ".text-input-headline", 3000, false ).
          pause ( 3000 ).
          //Verify the Headline field in the collections is visible
          verify.visible ( ".text-input-headline" ).
          pause ( 3000 ).
          //Clear the Headline data in the field
          clearValue ( ".text-input-headline" ).
          pause ( 3000 ).
          //Enter the Headline data in the field
          setValue ( ".text-input-headline", collectionTitle[ getData ] ).
          pause ( 3000 ).
          //Verify the Headline field in the collections is visible
          verify.visible ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
          click ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
          pause ( 3000 ).
          //Check the existance of delete confirmation dialog
          verify.visible ( "dialog[ name=deleteVerification ]" ).
          pause ( 3000 ).
          //Click Cancel Button in Delete Dialog
          verify.visible ( ".link-secondary" ).
          click ( ".link-secondary" ).
          pause ( 3000 ).
          //Verify the Delete in the Properties Tab
          verify.visible ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
          //Click the Delete in the Properties Tab
          click ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
          pause ( 3000 ).
          //Check the existance of delete confirmation to delete
          verify.visible ( "dialog[ name=deleteVerification ]" ).
          verify.visible ( "button.btn:nth-child( 2 )" ).
          pause ( 3000 ).
          //Click on the Delete button
          click ( "button.btn:nth-child( 2 )" ).
          pause ( 3000 ).useXpath ( ).
          //Check and Wait for the ALL button in the collections is visible
          waitForElementVisible ( "//a[@href='/properties/81/collections'][text( ) ='All']", 5000, false ).
          pause ( 3000 ).
          //Click on the All button in the collections
          click ( "//a[@href='/properties/81/collections'][text( ) ='All']" ).
          pause ( 3000 ).useCss ( ).
          //Get the Actual Total Count in the Collections listing page
          getText ( '.content-count > strong', function ( actualCountResult ) {
            if ( actualCountResult.status !== -1 ) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring ( 1, actualCount.length - 1 );
              expectedCount = ( ( + currentCount ) - 1 );
              if ( actualCount == expectedCount ) {
                CollectionsDeletemenu.writeToExcelPass ( 'boxxspring.xlsx', 'CollectionsmenuDelete', ++rowCount, 4 );
              }
              else {
                CollectionsDeletemenu.writeToExcelFail ( 'boxxspring.xlsx', 'CollectionsmenuDelete', ++rowCount, 4, 5, "ActualResult: '"+ actualCount +"' in the Total Count After Deleted Collections Menu. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
              }
            }
          } );
          if ( getData < collectionTitle.length - 1 ) {
          	//Get the Total Count in the Collections listing page
            CollectionsDeletemenu.getText ( '.content-count > strong', function ( currentCountResult ) {
              if ( currentCountResult.status !== -1 ) {
                currentCount = currentCountResult.value;
                currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
              }
              CollectionsDeletemenu.useXpath ( ).
              waitForElementVisible ( "//a[@href='/properties/81/collections'][text ( )='All']", 3000, false ).
              pause ( 3000 ).
              click ( "//a[@href='/properties/81/collections'][text ( )='All']" ).
              pause ( 3000 ).
              useCss ( ).
              //Get the Current Total Count after deleted in the Collections listing page
              getText ( '.content-count > strong', function ( currentCountDeleteResult ) {
                if ( currentCountDeleteResult.status !== -1 ) {
                  currentCount = currentCountDeleteResult.value;
                  currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
                }
              } );
            } );
          }
        }
      } );
    }
    //End the browser
    CollectionsDeletemenu.end ( );
  }
}