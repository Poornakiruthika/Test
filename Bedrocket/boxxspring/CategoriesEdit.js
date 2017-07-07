//this function is for check and Edit the categories 
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'CategoriesEdit' ];
var categoryTitle = [ ];
var categoryDescription = [ ];
var categoryShortTitle = [ ];
var categoryShortDesc = [ ];
var categoryCategoryName = [ ];
var categoryNote = [ ];
var categoryImg = [ ];
var result = [ ];
var getData,rowCount = 1;
var currentCount;
var actualCount;
var expectedCount;
module.exports = {
  tags: [ 'categoriesEdit' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Categories Edit': function ( categoriesEdit ) {
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Category Title
      if ( z.includes ( 'A' ) ) {
        categoryTitle.push ( worksheet[ z ].v );
      }
      //Read Category Description
      if ( z.includes ( 'B' ) ) {
        categoryDescription.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if ( z.includes ( 'C' ) ) {
        categoryShortTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if ( z.includes ( 'D' ) ) {
        categoryShortDesc.push ( worksheet[ z ].v );
      }
      //Read Category Name
      if ( z.includes ( 'E' ) ) {
        categoryCategoryName.push ( worksheet[ z ].v );
      }
      //Read Category Note
      if ( z.includes ( 'F' ) ) {
        categoryNote.push ( worksheet[ z ].v );
      }
      //Read Thumbnil Image
      if ( z.includes ( 'G' ) ) {
        categoryImg.push ( worksheet[ z ].v );
      }
    }
    if ( categoryTitle.length > 1 ) {      
      categoriesEdit.pause ( 3000 ).
      useXpath ( ).
      //Verify the Categories Menu in CONTENT
      verify.containsText ( "//ul/li/a[ text( ) = 'Categories' ]", "Categories" ).
      pause ( 3000 ).
      //Click on the Categories Menu in CONTENT
      click ( "//ul/li/a[ text( ) = 'Categories' ]" ).
      useCss ( ).
      pause ( 3000 ).
      //Get Total Count in the Categories list page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
        }
        for ( var getData = 1,rowCount = 1; getData < categoryTitle.length; getData++ ) {
          categoriesEdit.useXpath().
          //Wait for the Edit categories in the list is visible          
          waitForElementVisible ( "(//h2[@class='ng-binding'])[ 1 ]", 3000, false ).
          pause ( 3000 ).
          //Click on the Edit categories in the list
          click ( "(//h2[@class='ng-binding'])[1]" ).
          useCss().pause ( 3000 ).
          //Verify the Content Tab is visible
          verify.visible ( ".video-tabs > a[href='#content']" ).
          pause( 3000 ).
          //Click on the Contnet Tab
          click ( ".video-tabs > a[href='#content']" ).
          pause ( 3000 ).
          //Check and Enter Categories Title is visible
          waitForElementVisible ( ".text-input-headline", 3000, false ).
          //Clear the Headline in the field
          clearValue ( ".text-input-headline" ).
          //Enter the Headline in the field
          setValue ( ".text-input-headline", categoryTitle[ getData ] ).
          pause ( 3000 ).
          //Check and Enter Categories Text Description
          waitForElementVisible ( ".wmd-input", 3000, false ).
          //Clear the Categories Description in the field
          clearValue ( ".wmd-input" ).
          //Enter the Categories Description in the field
          setValue ( ".wmd-input", categoryDescription[ getData ] ).
          pause ( 3000 ).
          //Check and click Save button
          waitForElementVisible ( '.btn-active', 3000, false ).
          //Verify the Save Button is visible
          verify.visible ( ".btn-active" ).
          pause ( 3000 ).
          //Click on the Save Button
          click ( ".btn-active" ).
          pause ( 3000 ).
          //Get the Properties details and Enter in the Properties Tab
          allproperties ( categoryShortTitle[ getData ], categoryShortDesc[ getData ], categoryCategoryName[ getData ], categoryNote[ getData ], categoryImg[ getData ], currentCount ).
          pause ( 3000 ).
          useXpath ( ).
          //Verify the Categories Menu in CONENT
          verify.containsText ( "//ul/li/a[text( ) = 'Categories']", "Categories" ).
          pause ( 3000 ).
          //Click on the Categories Menu in CONTENT
          click ( "//ul/li/a[text( ) = 'Categories']" ).
          useCss ( ).
          pause ( 3000 ).
          //Get Actual Total Count in the Categories list page
          getText ( '.content-count > strong', function ( actualCountResult ) {
            if ( actualCountResult.status !== -1 ) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring ( 1, actualCount.length - 1 );
              if ( actualCount == currentCount ) {
                //Write in the Excel for PASS Result and Reason
                categoriesEdit.writeToExcelPass ( 'boxxspring.xlsx', 'CategoriesEdit', ++rowCount, 9 );
              }
              else {
                //Write in the Excel for FAIL Result and Reason
                categoriesEdit.writeToExcelFail ( 'boxxspring.xlsx', 'CategoriesEdit', ++rowCount, 9, 10, "ActualResult: '"+ actualCount +"' in the Total Count After Categories Edit. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
              }
            }
          } );
          if ( getData < categoryTitle.length - 1 ) {
            //Get Total Count in the Categories list page
            categoriesEdit.getText ( '.content-count > strong', function ( currentCountResult ) {
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
    categoriesEdit.end ( );
  }
};