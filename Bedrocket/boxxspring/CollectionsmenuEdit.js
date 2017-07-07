//this function is for check and Edit the Collections Menu
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var currentCount;
var worksheet = workbook.Sheets[ 'CollectionsmenuEdit' ];
var searchCollection = [ ];
var collectionTitle = [ ];
var collectiondesc = [ ];
var collectionPublic = [ ];
var result = [ ];
var expectedCount;
var actualCount;
var getData,rowCount,convertData = 1;
module.exports = {
  tags: [ 'collectionsmenuEdit' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Collectionsmenu Edit': function ( collectionsEditMenu ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Search Collection Title
      if ( z.includes ( 'A' ) ) {
        searchCollection.push ( worksheet[ z ].v );
      }
      //Read Collection Title
      if ( z.includes ( 'B' ) ) {
        collectionTitle.push ( worksheet[ z ].v );
      }
      //Read Collection Description
      if ( z.includes ( 'C' ) ) {
        collectiondesc.push ( worksheet[ z ].v );
      }
      //Read Collection Public
      if ( z.includes ( 'D' ) ) {
        collectionPublic.push ( worksheet[ z ].v );
      }
    }
    if ( collectionTitle.length > 1 ) {
      collectionsEditMenu.pause ( 3000 ).
      useXpath ( ).
      //Wait for ALL button in COLLECTION menu is visble
      waitForElementVisible ( "//a[@href='/properties/81/collections'][text( ) ='All']", 3000, false ).
      pause ( 3000 ).
      //Click on the ALL button in COLLECTION menu
      click ( "//a[@href='/properties/81/collections'][text( ) ='All']" ).
      pause ( 3000 ).
      useCss ( ).
      //Get the Current Total count in the collection listing page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
        }
        for ( var getData = 1,rowCount = 1; getData < collectionTitle.length; getData++ ) {
          collectionsEditMenu.
          pause ( 3000 ).
          useXpath ( ).
          //Wait for the Search collection is visible
          waitForElementVisible ( "//h2[contains ( .,'"+ searchCollection[ getData ] +"' )]", 3000, false ).
          pause ( 3000 ).
          //Click on the Search collection
          click ( "//h2[contains ( .,'"+ searchCollection[ getData ] +"' )]" ).
          useCss ( ).pause ( 3000 ).
          //Wait for the Headline field is visible
          waitForElementVisible ( ".text-input-headline", 3000, false ).
          pause ( 3000 ).
          //Verify the Headline field is visible
          verify.visible ( ".text-input-headline" ).
          pause ( 3000 ).
          //Clear the Headline data in the field
          clearValue ( ".text-input-headline" ).
          pause ( 3000 ).
          //Enter the Headline data in the field
          setValue ( ".text-input-headline", collectionTitle[ getData ] ).
          pause ( 3000 ).
          //Check the valid URL from given URL
          waitForElementVisible ( ".btn-slider", 3000, false ).
          pause ( 3000 ).useXpath ( ).
          //Get the Public values(YES/NO) in the collections page
          getText ( "//*[contains ( @class,'field-input' )]/span", function ( collectionPub ) {
            var collectPub = collectionPub.value;
            //Converting the getData into ConvertData
            if ( getData >= ( collectionTitle.length - 1 ) ) {
              convertData = getData - ( collectionTitle.length - 1 );
              getData++;
            }
            collectionsEditMenu.useCss ( )
            //Check the condition for Public as YES or NO in the expected condition
            if ( collectPub !== collectionPublic[ convertData ] && ( ( collectionPublic[ convertData ] === "YES" ) || ( collectionPublic[ convertData ] === "NO" ) ) ) {
              collectionsEditMenu.waitForElementVisible ( ".btn-false", 3000, false ).
              pause ( 3000 ).
              //Verify the No option is visible
              verify.visible ( ".btn-false" ).
              pause ( 3000 ).
              //Click on the public to select NO option
              click ( ".btn-false" ).
              pause ( 3000 )
            }
            else {
            }
          } );
          //Wait for the Title field is visible
          collectionsEditMenu.waitForElementVisible ( "text-field >textarea[ng-model='collection.description']", 3000, false ).
          pause ( 3000 ).
          //Verify the Title field is visible
          verify.visible ( "text-field >textarea[ng-model='collection.description']" ).
          pause ( 3000 ).
          //Clear the title data in the field
          clearValue ( "text-field >textarea[ng-model='collection.description']" ).
          pause ( 3000 ).
          //Enter the title data in the field
          setValue ( "text-field >textarea[ng-model='collection.description']", collectiondesc[ getData ] ).
          pause ( 3000 ).
          //Wait for the save button is visible
          waitForElementVisible ( ".btn-active", 3000, false ).
          pause ( 3000 ).
          //Click on the Save button
          click ( ".btn-active" ).
          pause ( 3000 ).useXpath ( ).
          //Wait for the ALL button is visible
          waitForElementVisible ( "//a[@href='/properties/81/collections'][text ( )='All']", 3000, false ).
          pause ( 3000 ).
          //Click on the ALL in the Collections Menu
          click ( "//a[@href='/properties/81/collections'][text ( )='All']" ).
          pause ( 3000 ).useCss ( ).
          //Get the Actual Total count in the collection listing page
          getText ( '.content-count > strong', function ( actualCountResult ) {
            if ( actualCountResult.status !== -1 ) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring ( 1, actualCount.length - 1 );
              expectedCount = currentCount;
              if ( actualCount == expectedCount ) {
                //Write the Excel:PASS Result and Reason
                collectionsEditMenu.writeToExcelPass ( 'boxxspring.xlsx', 'CollectionsmenuEdit', ++rowCount, 6 );
              }
              else {
                //Write the Excel:FAIL Result and Reason
                collectionsEditMenu.writeToExcelFail ( 'boxxspring.xlsx', 'CollectionsmenuEdit', ++rowCount, 6, 7, "ActualResult: '"+ actualCount +"' in the Total Count After Collections Menu Edit. ExpectedResult: should be'"+ expectedCount +"' in the Total Count "  );
              }
            }
          } );
          if ( getData < collectionTitle.length - 1 ) {
            collectionsEditMenu.getText ( '.content-count > strong', function ( currentCountResult ) {
              if ( currentCountResult.status !== -1 ) {
                currentCount = currentCountResult.value;
                currentCount = currentCount.substring ( 1, currentCount.length - 1 );
              }
              collectionsEditMenu.useXpath ( ).
              //Wait for the ALL button is visible
              waitForElementVisible ( "//a[@href='/properties/81/collections'][text( )='All']", 3000, false ).
              pause ( 3000 ).
              //Click on the ALL in the Collections Menu
              click ( "//a[@href='/properties/81/collections'][text( ) ='All']" ).
              pause ( 3000 ).useCss ( ).
              //Get the Total count in the collection listing page
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
    collectionsEditMenu.end ( );
  }
}