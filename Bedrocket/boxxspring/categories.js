var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if  ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'categories' ];
var categoryTitle = [ ];
var categoryDescription = [ ];
var categoryShortTitle = [ ];
var categoryShortDesc = [ ];
var categoryCategoryName = [ ];
var categoryNote = [ ];
var categoryImg = [ ];
var categoryType = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
module.exports = {
  tags: [ 'categories' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Categories': function ( allCategories ) {
    for  ( z in worksheet ) {
      if  ( z[1] === '!' ) continue;
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
      //Read Thumbnail Image
      if  ( z.includes ( 'G' ) ) {
        categoryImg.push ( worksheet[ z ].v );
      }
      //Read category Type
      if  ( z.includes ( 'H' ) ) {
        categoryType.push ( worksheet[ z ].v );
      }
    }
    if  ( categoryTitle.length > 1 ) {
      var rowCount = 1;
      allCategories.pause ( 5000 ).
      useXpath ( ).
      verify.containsText ( "//ul/li/a[ text( ) = 'Categories' ]", "Categories" ).
      pause ( 3000 ).
      click ( "//ul/li/a[ text( ) = 'Categories' ]" ).
      useCss ( ).
      pause ( 5000 ).
      //Get Total Count in the Categories
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if  ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, currentCount.length - 1 );
        }
        for  ( var getData = 1; getData < categoryTitle.length; getData++ ) {
          //Wait for Add button visible
          allCategories.waitForElementVisible ( ".btn-add", 5000, false ).
          pause ( 5000 ).
          //Move the element to add button
          moveToElement ( ".btn-add", 0, 0 ).
          pause ( 5000 ).
          //Click on Add categories Button
          useXpath ( ).
          click ( "//ul[ @class='dropdown-submenu' ]//a[ contains ( .,'" + categoryType[ getData ].trim( ) + "'  )  ]" ).
          useCss ( ).
          pause ( 5000 ).
          //Verfiy the Content Tab
          verify.visible ( ".video-tabs > a[href='#content' ]" ).
          //Click on the Content Tab
          click ( ".video-tabs > a[href='#content' ]" ).
          pause ( 5000 ).
          //Wait and verify the Categories Title
          waitForElementVisible ( ".text-input-headline", 5000, false ).
          //Enter the Catgories Title
          setValue ( ".text-input-headline", categoryTitle[ getData ] ).
          pause ( 5000 ).
          //Check the Categories Text Description
          waitForElementVisible ( ".wmd-input", 5000, false ).
          //Clear the Categories Text Description
          clearValue ( ".wmd-input" ).
          //Enter the Categories Text Description
          setValue ( ".wmd-input", categoryDescription[ getData ] ).
          pause ( 5000 ).
          //Check the Save button
          waitForElementVisible ( '.btn-active', 5000, false ).
          //Verify the Save the button
          verify.visible ( ".btn-active" ).
          pause ( 5000 ).
          //Click on the Save Button
          click ( ".btn-active" ).
          pause ( 5000 ).
          //Get the Properties Details
          allproperties ( categoryShortTitle[ getData ], categoryShortDesc[ getData ], categoryCategoryName[ getData ], categoryNote[ getData ], categoryImg[ getData ], currentCount ).
          pause ( 5000 ).
          useXpath (  ).
          //Verify the Categories menu in CONTENT
          verify.containsText ( "//ul/li/a[ text( ) = 'Categories' ]", "Categories" ).
          pause ( 3000 ).
          //Click on the Categories menu in CONTENT
          click ( "//ul/li/a[ text( ) = 'Categories' ]" ).
          useCss ( ).
          pause ( 5000 ).
          //Get Total Count in the Categories
          getText ( '.content-count > strong', function ( actualCountResult ) {
            if  ( actualCountResult.status !== -1 ) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring ( 1, actualCount.length - 1 );
              expectedCount =  ( ( + currentCount ) +  ( +1 ) );
              if  ( actualCount == expectedCount ) {
                //Write in the Spreadsheet for Pass Result and Reason
                allCategories.writeToExcelPass ( 'boxxspring.xlsx', 'categories', ++rowCount, 10, 11 );
              }
              else {
                //Write in the Spreadsheet for Fail Result and Reason
                allCategories.writeToExcelFail ( 'boxxspring.xlsx', 'categories', ++rowCount, 10, 11, actualCount, expectedCount );
              }
            }
          } );
          if  ( getData < categoryTitle.length - 1 ) {
            allCategories.getText ( '.content-count > strong', function ( currentCountResult ) {
              if  ( currentCountResult.status !== -1 ) {
                currentCount = currentCountResult.value;
                currentCount = currentCount.substring ( 1, currentCount.length - 1 );
              }
            } );
          }
        }
      } );
    }
    //End the Browser
    allCategories.end ( );
  }
};