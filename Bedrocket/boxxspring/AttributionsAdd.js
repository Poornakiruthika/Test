//this function is for check and add the Attribution
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'AttributionsAdd' ];
var attributionTitle = [ ];
var attributionUrl = [ ];
var attributionDescription = [ ];
var attributionShortTitle = [ ];
var attributionShortDesc = [ ];
var attributionCategoryName = [ ];
var attributionNote = [ ];
var attributionImg = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
module.exports = {
  tags: [ 'attributionsAdd' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Attributions Add': function ( addAttributions ) {
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read authors Title
      if ( z.includes ( 'A' ) ) {
        attributionTitle.push ( worksheet[ z ].v );
      }
      //Read authors Description
      if ( z.includes ( 'B' ) ) {
        attributionUrl.push ( worksheet[ z ].v );
      }
      if ( z.includes ( 'C' ) ) {
        attributionDescription.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if ( z.includes ( 'D' ) ) {
        attributionShortTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if ( z.includes ( 'E' ) ) {
        attributionShortDesc.push ( worksheet[ z ].v );
      }
      //Read authors category Name
      if ( z.includes ( 'F' ) ) {
        attributionCategoryName.push ( worksheet[ z ].v );
      }
      //Read authors Note
      if ( z.includes ( 'G' ) ) {
        attributionNote.push ( worksheet[ z ].v );
      }
      //Read Thumbnail Image
      if ( z.includes ( 'H' ) ) {
        attributionImg.push ( worksheet[ z ].v );
      }
    }
    if ( attributionTitle.length > 1 ) {
      addAttributions.pause ( 3000 ).
      useXpath ( ).
      //Verify the Attributions in CONTENT menu is visible
      verify.containsText ( "//ul/li/a[ text( ) = 'Attributions' ]", "Attributions" ).
      pause ( 3000 ).
      //Click on the Attribution in the CONTENT menu
      click ( "//ul/li/a[ text( ) = 'Attributions' ]" ).
      useCss ( ).
      pause ( 3000 ).
      //Get the Total Count before  create Attribution in the list 
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, currentCount.length - 1 );
        }
        for ( var getData = 1,rowCount=1; getData < attributionTitle.length; getData++ ) {
          addAttributions.waitForElementVisible ( ".btn-add", 3000, false ).
          pause ( 3000 ).
          //Click on the Add button in Attribution
          click ( ".btn-add" ).
          pause ( 3000 ).
          //Verify the Content tab in the Attribution page is visible
          verify.visible ( ".video-tabs > a[ href='#content' ]" ).
          //Click on the Content tab in the Attribution Page
          click ( ".video-tabs > a[ href='#content' ]" ).
          pause ( 3000 ).
          //Check and Enter attribution Title
          waitForElementVisible ( ".text-input-headline", 3000, false ).
          //Enter the Headline in the Field
          setValue ( ".text-input-headline", attributionTitle[ getData ] ).
          pause ( 3000 ).
          //Check and Enter attribution Text Description
          waitForElementVisible ( ".wmd-input", 3000, false ).
          //Clear the data in the field
          clearValue ( ".wmd-input" ).
          //Enter the Attribution description in the Field
          setValue ( ".wmd-input", attributionDescription[ getData ] ).
          pause ( 3000 ).
          //Check the attribution URL field is visible
          waitForElementVisible ( "#attribution_provider_url", 3000, false ).
          //Enter the Attribution Provider url
          setValue ( "#attribution_provider_url", attributionUrl[ getData ] ).
          pause ( 3000 ).
          //Check and click Save button
          waitForElementVisible ( '.btn-active', 3000, false ).
          //Verify the Save buttin is visible
          verify.visible ( ".btn-active" ).
          pause ( 3000 ).
          //Click on Save button
          click ( ".btn-active" ).
          pause ( 3000 ).
          //Set details in Attribution Properties Tab
          authorsproperties ( attributionShortTitle[ getData ], attributionShortDesc[ getData ], attributionCategoryName[ getData ], attributionNote[ getData ], attributionImg[ getData ], currentCount ).
          pause ( 3000 ).
          useXpath ( ).
          //Verify the Attribution menu in CONTENT
          verify.containsText ( "//ul/li/a[ text( ) = 'Attributions' ]", "Attributions" ).
          pause ( 3000 ).
          //Click on the Attribution in the CONTENT menu
          click ( "//ul/li/a[ text( ) = 'Attributions' ]" ).
          useCss ( ).
          pause ( 3000 ).
          //Get Actual Total Count for after Author created 
          getText ( '.content-count > strong', function ( actualCountResult ) {
            if ( actualCountResult.status !== -1 ) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring ( 1, actualCount.length - 1 );
              expectedCount = ( ( +currentCount ) + ( +1 ) );
              if ( actualCount == expectedCount ) {
                //Write in the Excel for Pass Result and Reason
                addAttributions.writeToExcelPass ( 'boxxspring.xlsx', 'AttributionsAdd', ++rowCount, 10 );
              }
              else {
                //Write in the Excel for Fail Result and Reason
                addAttributions.writeToExcelFail ( 'boxxspring.xlsx', 'AttributionsAdd', ++rowCount, 10, 11, "ActualResult: '"+ actualCount +"' in the Total Count After Added New Attributions. ExpectedResult: should be'"+ expectedCount +"' in the Total Count "  );
              }
            }
          } );
          if ( getData < attributionTitle.length - 1 ) {
            addAttributions.getText ( '.content-count > strong', function ( currentCountResult ) {
              if ( currentCountResult.status !== -1 ) {
                currentCount = currentCountResult.value;
                currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
              }
            } );
          }
        }
      } );
    }
    //End the Browser
    addAttributions.end ( );
  }
};