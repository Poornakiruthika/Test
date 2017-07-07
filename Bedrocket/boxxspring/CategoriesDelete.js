//this function is for check and Delete the categories 
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'CategoriesDelete' ];
var categoryType = [ ];
var storyTitle = [ ];
var storyEditTitle = [ ];
var storyShortDesc = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
var addedCount;
var searchCount;
var getData, rowCount = 1;
module.exports = {
  tags: [ 'categoriesDelete' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;    
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Categories Delete': function ( CategoriesDelete ) {
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Category Type
      if ( z.includes ( 'A' ) ) {
        categoryType.push ( worksheet[ z ].v );
      }
      //Read story title
      if ( z.includes ( 'B' ) ) {
        storyTitle.push ( worksheet[ z ].v );
      }
      //Read Short Edit Title
      if ( z.includes ( 'C' ) ) {
        storyEditTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if ( z.includes ( 'D' ) ) {
        storyShortDesc.push ( worksheet[ z ].v );
      }
    }
    if ( storyTitle.length > 1 ) {
      CategoriesDelete.pause ( 3000 ).
      useXpath ( ).
      pause ( 3000 ).
      //Verify the Categories menu in CONTENT
      verify.containsText ( "//ul/li/a[ text( ) = 'Categories' ]", "Categories" ).
      pause ( 3000 ).
      //Click on the Categories
      click ( "//ul/li/a[ text( ) = 'Categories' ]" ).
      useCss ( ).
      pause ( 3000 ).
      waitForElementVisible ( ".content-count>strong", 3000, false ).
      pause ( 3000 ).
      //Verify the count value is visible
      verify.visible ( ".content-count>strong" ).
      //Get the Current Total Count in the Categories List
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, currentCount.length - 1 );
        }
      } );
      for ( var getData = 1; getData < storyTitle.length; getData++ ) {
        CategoriesDelete.pause ( 3000 ).
        useCss ( ).
        //Wait for the Add button is visible
        waitForElementVisible ( ".btn-add", 3000, false ).
        pause ( 3000 ).
        //Move to Element for Add button in the Categories page
        moveToElement ( ".btn-add", 0, 0 ).
        pause ( 3000 ).
        //Check and click Add categories Button
        useXpath ( ).
        //Click on the Categories Type
        click ( "//ul[ @class='dropdown-submenu' ]//a[ contains (.,'"+ categoryType[ getData ].trim( ) +"' ) ]" ).
        useCss ( ).
        pause ( 3000 )
        CategoriesDelete.pause ( 3000 ).
        //Check and Enter Categories Title is visibel            
        verify.visible ( ".video-tabs > a[href='#properties']" ).
        //Click on the Properties Tab in the categories page
        click ( ".video-tabs > a[href='#properties']" ).
        pause ( 3000 ).
        //Verify the Headlines field is visible
        verify.visible ( ".text-input-headline" ).
        //Clear the Headline data in the field
        clearValue ( ".text-input-headline" ).
        pause ( 3000 ).
        //Enter the data in Headline field
        setValue ( ".text-input-headline", storyTitle[ getData ] ).
        pause ( 3000 ).
        //Verify the Short Description field is visible
        verify.visible ( "textarea[ng-model='artifact.shortDescription']" ).
        //Clear the Short Description data in the field
        clearValue ( "textarea[ng-model='artifact.shortDescription']" ).
        //Enter the data in Short Description field
        setValue ( "textarea[ng-model='artifact.shortDescription']", storyShortDesc[ getData ] ).
        pause ( 3000 ).
        //Check the save button is visible
        verify.visible ( ".btn-active" ).
        //Click on the Save Button
        click ( ".btn-active" ).
        pause ( 3000 ).
        useXpath ( ).
        //Verify the Categories menu in CONTENT is visible
        verify.containsText ( "//ul/li/a[ text( ) = 'Categories']", "Categories" ).
        pause ( 3000 ).
        //Click on the Categories menu in CONTENT
        click ( "//ul/li/a[ text( ) = 'Categories']" ).
        useCss ( ).
        pause ( 3000 ).
        waitForElementVisible ( ".content-count>strong", 3000, false ).
        verify.visible ( ".content-count>strong" ).
        pause ( 3000 ).
        //Get the Actual Total Count in the Categories List
        getText ( '.content-count > strong', function ( actualCountResult ) {
          if ( actualCountResult.status !== -1 ) {
            addedCount = actualCountResult.value;
            addedCount = addedCount.substring ( 1, addedCount.length - 1 );
          }
        } );
        CategoriesDelete.pause ( 3000 ).
        //Wait for the Search input field is visible
        waitForElementVisible ( ".search-field-input", 3000, false ).
        //Verify the Search input field is visible
        verify.visible ( ".search-field-input" ).
        //Enter the data in the Search input field
        setValue ( ".search-field-input", storyTitle[ getData ] ).
        keys ( CategoriesDelete.Keys.ENTER ). // hold the control
        click ( ".search-field-input" ).
        keys ( CategoriesDelete.Keys.NULL ). // release the control
        pause ( 3000 ).
        waitForElementVisible ( ".content-count>strong", 3000, false ).
        verify.visible ( ".content-count>strong" ).
        //Get the Total Searched Count in the Categories List
        getText ( '.content-count > strong', function ( searchCountResult ) {
          if ( searchCountResult.status !== -1 ) {
            searchCount = searchCountResult.value;
            searchCount = searchCount.substring ( 1, searchCount.length - 1 );
          }
          if ( searchCount > 0 ) {
            CategoriesDelete.useXpath().
            waitForElementVisible ( "(//h2[@class='ng-binding'])[ 1 ]", 3000, false ).
            pause ( 3000 ).
            //Click on the searched categories in the listing page
            click ( "(//h2[@class='ng-binding'])[1]" ).
            useCss().pause ( 3000 ).
            //Wait for the Properties Tab is visible
            waitForElementVisible ( ".video-tabs > a[href='#properties' ]", 3000, false ).
            //Check the Properties Tab is visible
            verify.visible ( ".video-tabs > a[href='#properties' ]" ).
            pause ( 3000 ).
            //Click on the Properties Tab
            click ( ".video-tabs > a[href='#properties' ]" ).
            pause ( 3000 ).
            //Verify the Headline field is visible
            verify.visible ( ".text-input-headline" ).
            //Clear the Headline data in the field
            clearValue ( ".text-input-headline" ).
            pause ( 3000 ).
            //Enter the Headline data in the field
            setValue ( ".text-input-headline", storyEditTitle[ getData ] ).
            pause ( 3000 ).
            //Check and click Save button
            waitForElementVisible ( '.btn-active', 3000, false ).
            //Verify the Save Button
            verify.visible ( ".btn-active" ).
            pause ( 3000 ).
            //Click on the Save Button
            click ( ".btn-active" ).
            pause ( 3000 ).
            //Check and Click Delete Button.
            verify.visible ( ".btn-delete > span[ng-click='showDeleteVerification();']" ).
            //Click on the Delete button in the Portal
            click ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
            pause ( 3000 ).
            //Check the existance of delete confirmation dialog
            verify.visible ( "dialog[name=deleteVerification ]" ).
            pause ( 3000 ).
            //Click Cancel Button in Delete Dialog
            verify.visible ( ".link-secondary" ).
            //Click on the Cancel button in the pop-up window
            click ( ".link-secondary" ).
            pause ( 3000 ).
            verify.visible ( ".btn-delete > span[ng-click='showDeleteVerification();']" ).
            //Click Cancel Button in Delete Dialog
            click ( ".btn-delete > span[ng-click='showDeleteVerification();']" ).
            pause ( 3000 ).
            //Check the existance of delete confirmation to delete
            verify.visible ( "dialog[name=deleteVerification]" ).
            verify.visible ( "button.btn:nth-child(2)" ).
            pause ( 3000 ).
            //click on the delete button in pop-up window
            click ( "button.btn:nth-child(2)" ).
            pause ( 3000 ).
            useXpath ( ).
            verify.containsText ( "//ul/li/a[text( ) = 'Categories']", "Categories" ).
            pause ( 3000 ).
            //Click on the Categories Menu in CONTENT
            click ( "//ul/li/a[ text( ) = 'Categories']" ).
            useCss ( ).
            pause ( 3000 ).
            waitForElementVisible ( ".content-count>strong", 3000, false ).
            verify.visible ( ".content-count>strong" ).
            //Get the Total Count in the Categories list
            getText ( '.content-count > strong', function ( actualCountResult ) {
              if ( actualCountResult.status !== -1 ) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, ( actualCount.length - 1 ) );
                expectedCount = ( ( + addedCount ) - ( 1 ) );
                if ( actualCount == expectedCount ) {
                  //Write in the Excel for Pass Result and Reason
                  CategoriesDelete.writeToExcelPass ( 'boxxspring.xlsx', 'CategoriesDelete', ++rowCount, 6 );
                }
                else {
                  //Write in the Excel for Fail Result and Reason
                  CategoriesDelete.writeToExcelFail ( 'boxxspring.xlsx', 'CategoriesDelete', ++rowCount, 6, 7, "ActualResult: '"+ actualCount +"' in the Total Count After Deleted Categories. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
                }
              }
            } );
          }
          else {
            //Write in the Excel for Fail-Search Result and Reason
            CategoriesDelete.writeToExcelFail ( 'boxxspring.xlsx', 'CategoriesDelete', ++rowCount, 6, 7,  "Searched Result Count,'"+ searchCount +"'" );
          }
        } );
      }
    }
    else {
    }
    //End the Browser
    CategoriesDelete.end ( );
  }
};