//this function is for check and Edit the Authors
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets['AuthorsEdit'];
var authorTitle = [ ];
var authorDescription = [ ];
var authorShortTitle = [ ];
var authorShortDesc = [ ];
var authorCategoryName = [ ];
var authorNote = [ ];
var authorImg = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
var authorSearch = [ ];
var getData,convertData,rowCount = 1;
module.exports = {
  tags: ['editauthors'],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Authors Edit': function ( authorsEdit ) {
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Category Title
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
      //Read authors Search
      if ( z.includes ( 'H' ) ) {
        authorSearch.push ( worksheet[ z ].v );
      }
    }
    if ( authorTitle.length > 1 ) {
      authorsEdit.pause ( 3000 ).
      useXpath ( ).
      //Verify the Authors menu in the CONTENT
      verify.containsText ( "//ul/li/a[ text( ) = 'Authors' ] ", "Authors" ).
      pause ( 3000 ).
      //Click on the Authors menu in the CONTENT
      click ( "//ul/li/a[ text( ) = 'Authors' ] " ).
      useCss ( ).
      pause ( 3000 ).
      //Get the Authors Total Count in the authors listing page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
        }
        for ( var getData = 1,rowCount = 1; getData < authorTitle.length; getData++ ) {
          authorsEdit.pause ( 3000 ).waitForElementVisible ( ".search-field-input", 3000, false ).
          verify.visible ( ".search-field-input" ).
          pause ( 3000 ).
          //Clear the data in search field
          clearValue ( ".search-field-input" ).
          pause ( 3000 ).
          //Enter the serach data in the field
          setValue ( ".search-field-input", authorSearch[ getData ] ).
          pause ( 3000 ).
          //Press Enter key to search
          keys ( authorsEdit.Keys.ENTER ). // hold the control
          click ( ".search-field-input" ).
          keys ( authorsEdit.Keys.NULL ). // release the control
          pause ( 3000 )
          authorsEdit.waitForElementVisible ( ".content-count>strong", 3000, false ).
          verify.visible ( ".content-count>strong" )
          var convertData = 1;
          authorsEdit.pause ( 3000 ).
          //Get the Authors Total Count in the authors listing page after Search data
          getText ( '.content-count > strong', function ( searchCountResult ) {
            if ( getData >= ( authorTitle.length - 1 ) ) {
              convertData = ( getData - ( authorTitle.length - 1 ) );
              getData++;
            }
            if ( searchCountResult.status !== -1 ) {
              searchCount = searchCountResult.value;
              searchCount = searchCount.substring ( 1, searchCount.length - 1 );
            }
            if ( searchCount > 0 ) {
              authorsEdit.pause ( 3000 ).useXpath().
              //Wait for Edit Authors button visible
              waitForElementVisible ( "(//h2[@class='ng-binding'])[ 1 ]", 3000, false ).
              pause ( 3000 ).
              //Click on the Edit Author button
              click ( "(//h2[@class='ng-binding'])[1]" ).
              useCss().pause ( 3000 ).
              verify.visible ( ".video-tabs > a[ href='#content' ] " ).
              pause ( 3000 ).
              click ( ".video-tabs > a[ href='#content' ] " ).
              pause ( 3000 ).
              //Check the Authors Title filed visible
              waitForElementVisible ( ".text-input-headline", 3000, false ).
              //Clear the Authors Title in the field
              clearValue ( ".text-input-headline" ).
              pause ( 3000 ).
              //Enter the Authors Title in the Field
              setValue ( ".text-input-headline", authorTitle[ convertData ] ).
              pause ( 3000 ).
              //Check and Enter Authors Text Description
              waitForElementVisible ( ".wmd-input", 3000, false ).
              //Clear the Author Description
              clearValue ( ".wmd-input" ).
              //Enter the Authors Description
              setValue ( ".wmd-input", authorDescription[ convertData ] ).
              pause ( 3000 ).
              //Check and click Save button
              waitForElementVisible ( '.btn-active', 3000, false ).
              verify.visible ( ".btn-active" ).
              pause ( 3000 ).
              //Click on the Save Button
              click ( ".btn-active" ).
              pause ( 3000 ).
              authorsproperties ( authorShortTitle[ convertData ], authorShortDesc[ convertData ], authorCategoryName[ convertData ], authorNote[ convertData ], authorImg[ convertData ] ).
              pause ( 3000 ).useXpath ( ).
              //Verify the Authors menu in the CONTENT
              verify.containsText ( "//ul/li/a[ text( ) = 'Authors' ] ", "Authors" ).
              pause ( 3000 ).
              //Click on the Authors menu in the CONTENT
              click ( "//ul/li/a[ text( ) = 'Authors' ] " ).
              useCss ( ).pause ( 3000 ).
              //Get the Authors Total Count in the authors listing page
              getText ( '.content-count > strong', function ( actualCountResult ) {
                if ( actualCountResult.status !== -1 ) {
                  actualCount = actualCountResult.value;
                  actualCount = actualCount.substring ( 1, ( actualCount.length - 1 ) );
                  if ( actualCount == currentCount ) {
                    //Write in the Excel for Pass Result and Reason
                    authorsEdit.writeToExcelPass ( 'boxxspring.xlsx', 'AuthorsEdit', ++rowCount, 10 );
                  }
                  else {
                    //Write in the Excel for Fail Result and Reason
                    authorsEdit.writeToExcelFail ( 'boxxspring.xlsx', 'AuthorsEdit', ++rowCount, 10, 11,  "ActualResult: '"+ actualCount +"' in the Total Count After Authors Edit. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
                  }
                }
              } );
              if ( getData < authorTitle.length - 1 ) {
                authorsEdit.getText ( '.content-count > strong', function ( currentCountResult ) {
                  if ( currentCountResult.status !== -1 ) {
                    currentCount = currentCountResult.value;
                  }
                } );
              }
            }
            else {
              //Write in the Excel for Search Fail Result and Reason
              authorsEdit.writeToExcelFail ( 'boxxspring.xlsx', 'AuthorsEdit', ++rowCount, 10, 11, "Searched Result Count,'"+ searchCount +"'" );
            }
          } );
        }
      } );
    }
    //End the Browser
    authorsEdit.end ( );
  }
};