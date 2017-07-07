//this function is for check and add the Authors
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets['AuthorsAdd'];
var authorTitle = [ ];
var authorDescription = [ ];
var authorShortTitle = [ ];
var authorShortDesc = [ ];
var authorCategoryName = [ ];
var authorNote = [ ];
var authorImg = [ ];
var result = [ ];
var currentCount;
var getData,rowCount = 1;
var actualCount;
var expectedCount;
module.exports = {
  tags: ['authorsAdd'],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Authors Add': function ( authorsAdd ) {
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read authors Title
      if ( z.includes ( 'A' ) ) {
        authorTitle.push ( worksheet[ z ].v );
      }
      //Read authors Description
      if ( z.includes ( 'B' ) ) {
        authorDescription.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if ( z.includes ( 'C' ) ) {
        authorShortTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if ( z.includes ( 'D' ) ) {
        authorShortDesc.push ( worksheet[ z ].v );
      }
      //Read authors category Name
      if ( z.includes ( 'E' ) ) {
        authorCategoryName.push ( worksheet[ z ].v );
      }
      //Read authors Note
      if ( z.includes ( 'F' ) ) {
        authorNote.push ( worksheet[ z ].v );
      }
      //Read authors Image
      if ( z.includes ( 'G' ) ) {
        authorImg.push ( worksheet[ z ].v );
      }
    }
    if ( authorTitle.length > 1 ) {
      authorsAdd.pause ( 3000 ).
      useXpath( ).
      //Verify the Authors Menu in the CONTENT
      verify.containsText ( "//ul/li/a[ text( ) = 'Authors' ]", "Authors" ).
      pause ( 3000 ).
      //Click on the Authors Menu in the CONTENT
      click ( "//ul/li/a[ text( ) = 'Authors' ]" ).
      useCss( ).
      pause ( 3000 ).
      //Get the Total Authors count in the Authors listing page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length  - 1 ) );
        }
        for ( var getData = 1,rowCount = 1; getData < authorTitle.length; getData++ ) {
          authorsAdd.waitForElementVisible ( ".btn-add", 3000, false ).
          pause ( 3000 ).
          //Click on the Add button to create an author
          click ( ".btn-add" ).
          pause ( 3000 ).
          //Verify the Content Tab in the Author page
          verify.visible ( ".video-tabs > a[ href='#content' ]" ).
          //Click on the Content Tab
          click ( ".video-tabs > a[ href='#content' ]" ).
          pause ( 3000 ).
          //Check and Enter authors Title
          waitForElementVisible ( ".text-input-headline", 3000, false ).
          //Enter the Author Title in the Headline
          setValue ( ".text-input-headline", authorTitle[ getData ] ).
          pause ( 3000 ).
          //Check and Enter authors Text Description
          waitForElementVisible ( ".wmd-input", 3000, false ).
          clearValue ( ".wmd-input" ).
          setValue ( ".wmd-input", authorDescription[ getData ] ).
          pause ( 3000 ).
          //Check and click Save button
          waitForElementVisible ( '.btn-active', 3000, false ).
          verify.visible ( ".btn-active" ).
          pause ( 3000 ).
          //Click on the Save button
          click ( ".btn-active" ).
          pause ( 6000 ).
          //Check and Enter the valid input in the Properties Tab
          authorsproperties ( authorShortTitle[ getData ], authorShortDesc[ getData ], authorCategoryName[ getData ], authorNote[ getData ], authorImg[ getData ], currentCount ).
          pause ( 3000 ).
          useXpath( ).
          //Verify the Authors Menu in the CONTENT
          verify.containsText ( "//ul/li/a[ text( ) = 'Authors' ]", "Authors" ).
          pause ( 3000 ).
          //Click on the Authors Menu in the CONTENT
          click ( "//ul/li/a[ text( ) = 'Authors' ]" ).
          useCss( ).
          pause ( 3000 ).
          getText ( '.content-count > strong', function ( actualCountResult ) {
            if ( actualCountResult.status !== -1 ) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring ( 1, actualCount.length - 1 );
              expectedCount = ( ( +currentCount ) + ( + 1 ) );
              if ( actualCount == expectedCount ) {
                //Write in the spreadsheet: Pass Result and Reason
                authorsAdd.writeToExcelPass ( 'boxxspring.xlsx', 'AuthorsAdd', ++rowCount, 9 );
              }
              else {
                //Write in the spreadsheet: Fail Result and Reason
                authorsAdd.writeToExcelFail ( 'boxxspring.xlsx', 'AuthorsAdd', ++rowCount, 9, 10, "ActualResult: '"+ actualCount +"' in the Total Count After Added New Authors. ExpectedResult: should be'"+ expectedCount +"' in the Total Count" );
              }
            }
          } );
          if ( getData < authorTitle.length - 1 ) {
            authorsAdd.getText ( '.content-count > strong', function ( currentCountResult ) {
              if ( currentCountResult.status !== -1 ) {
                currentCount = currentCountResult.value;
                currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
              }
            } );
          }
        }
      } );
    }
    //End the browser
    authorsAdd.end( );
  }
};