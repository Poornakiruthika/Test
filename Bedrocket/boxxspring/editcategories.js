var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if  ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'editcategories' ];
var categoryTitle = [ ];
var categoryDescription = [ ];
var categoryShortTitle = [ ];
var categoryShortDesc = [ ];
var categoryCategoryName = [ ];
var categoryNote = [ ];
var categoryImg = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
module.exports = {
  tags: [ 'editcategories' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'EditCategories': function ( categoriesEdit ) {
    for  ( z in worksheet ) {
      if  ( z[ 0 ] === '!' ) continue;
      //Read Category Title
      if  ( z.includes ( 'A' ) ) {
        categoryTitle.push ( worksheet[ z ].v );
      }
      //Read Category Description
      if  ( z.includes ( 'B' ) ) {
        categoryDescription.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if  ( z.includes ( 'C' ) ) {
        categoryShortTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if  ( z.includes ( 'D' ) ) {
        categoryShortDesc.push ( worksheet[ z ].v );
      }
      //Read Category Name
      if  ( z.includes ( 'E' ) ) {
        categoryCategoryName.push ( worksheet[ z ].v );
      }
      //Read Category Note
      if  ( z.includes ( 'F' ) ) {
        categoryNote.push ( worksheet[ z ].v );
      }
      //Read Thumbnil Image
      if  ( z.includes ( 'G' ) ) {
        categoryImg.push ( worksheet[ z ].v );
      }
    }
    if  ( categoryTitle.length > 1 ) {
      var rowCount = 1;
      categoriesEdit.pause ( 5000 ).
      useXpath ( ).
      //Verify the Categories Menu in CONTENT
      verify.containsText ( "//ul/li/a[ text( ) = 'Categories' ]", "Categories" ).
      pause ( 3000 ).
      click ( "//ul/li/a[ text( ) = 'Categories' ]" ).
      useCss ( ).
      pause ( 5000 ).
      //Get Total Count in the Categories list page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if  ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, currentCount.length - 1 );
        }
        for  ( var getData = 1; getData < categoryTitle.length; getData++ ) {
          categoriesEdit.waitForElementVisible ( " li.content-container:nth-child(1) > ng-include:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > a:nth-child(1) > h2:nth-child(1) ", 5000, false ).
          pause ( 5000 ).
          //Click on the Edit categories in the list
          click ( "li.content-container:nth-child(1) > ng-include:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2)  > a:nth-child(1) > h2:nth-child(1) " ).
          pause ( 5000 ).
          //Verify the Content Tab
          verify.visible ( ".video-tabs > a[href='#content' ]" ).
          pause( 5000 ).
          //Click on the Contnet Tab
          click ( ".video-tabs > a[href='#content' ]" ).
          pause ( 5000 ).
          //Check and Enter Categories Title
          waitForElementVisible ( ".text-input-headline", 5000, false ).
          //Clear the Headline
          clearValue ( ".text-input-headline" ).
          //Enter the Headline
          setValue ( ".text-input-headline", categoryTitle[ getData ] ).
          pause ( 5000 ).
          //Check and Enter Categories Text Description
          waitForElementVisible ( ".wmd-input", 5000, false ).
          //Clear the Categories Description
          clearValue ( ".wmd-input" ).
          //Enter the Categories Description
          setValue ( ".wmd-input", categoryDescription[ getData ] ).
          pause ( 5000 ).
          //Check and click Save button
          waitForElementVisible ( '.btn-active', 5000, false ).
          //Verify the SAve Button
          verify.visible ( ".btn-active" ).
          pause ( 5000 ).
          //Click on the Save Button
          click ( ".btn-active" ).
          pause ( 5000 ).
          //Get the Properties details and Enter in the Properties Tab
          allproperties ( categoryShortTitle[ getData ], categoryShortDesc[ getData ], categoryCategoryName[ getData ], categoryNote[ getData ], categoryImg[ getData ], currentCount ).
          pause ( 5000 ).
          useXpath ( ).
          //Verify the Categories Menu in CONENT
          verify.containsText ( "//ul/li/a[ text( ) = 'Categories' ]", "Categories" ).
          pause ( 3000 ).
          //Click on the Categories Menu in CONTENT
          click ( "//ul/li/a[ text( ) = 'Categories' ]" ).
          useCss ( ).
          pause ( 5000 ).
          //Get Total Count in the Categories list page
          getText ( '.content-count > strong', function ( actualCountResult ) {
            if  ( actualCountResult.status !== -1 ) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring ( 1, actualCount.length - 1 );
              if  ( actualCount == currentCount ) {
                //Write in the Excel for Pass Result and Reason
                categoriesEdit.writeToExcelPass ( 'boxxspring.xlsx', 'editcategories', ++rowCount, 9, 10 );
              }
              else {
                //Write in the Excel for Fail Result and Reason
                categoriesEdit.writeToExcelFail ( 'boxxspring.xlsx', 'editcategories', ++rowCount, 9, 10, actualCount, currentCount );
              }
            }
          } );
          if  ( getData < categoryTitle.length - 1 ) {
            categoriesEdit.getText ( '.content-count > strong', function ( currentCountResult ) {
              if  ( currentCountResult.status !== -1 ) {
                currentCount = currentCountResult.value;
                currentCount = currentCount.substring ( 1, currentCount.length - 1 );
              }
            } );
          }
        }
      } );
    }
    categoriesEdit.end ( );
  }
};