var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if  ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'deleteCategories' ];
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
  tags: [ 'deletecategories' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;    
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'DeleteCategories': function ( CategoriesDelete ) {
    for  ( z in worksheet ) {
      if  ( z[ 1 ] === '!' ) continue;
      //Read Category Type
      if  ( z.includes ( 'A' ) ) {
        categoryType.push ( worksheet[ z ].v );
      }
      //Read story title
      if  ( z.includes ( 'B' ) ) {
        storyTitle.push ( worksheet[ z ].v );
      }
      //Read Short Edit Title
      if  ( z.includes ( 'C' ) ) {
        storyEditTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if  ( z.includes ( 'D' ) ) {
        storyShortDesc.push ( worksheet[ z ].v );
      }
    }
    if  ( storyTitle.length > 1 ) {
      CategoriesDelete.pause ( 5000 ).
      useXpath ( ).
      pause ( 5000 ).
      //Verify the Categories menu in CONTENT
      verify.containsText ( "//ul/li/a[ text( ) = 'Categories' ]", "Categories" ).
      pause ( 3000 ).
      //Click on the Categories
      click ( "//ul/li/a[ text( ) = 'Categories' ]" ).
      useCss ( ).
      pause ( 5000 ).
      waitForElementVisible ( ".content-count>strong", 5000, false ).
      pause ( 5000 ).
      verify.visible ( ".content-count>strong" ).
      //Get the Total Count in the Categories List
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if  ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, currentCount.length - 1 );
        }
      } );
      for  ( var getData = 1; getData < storyTitle.length; getData++ ) {
        CategoriesDelete.pause ( 5000 ).
        useCss ( ).
        waitForElementVisible ( ".btn-add", 5000, false ).
        pause ( 5000 ).
        moveToElement ( ".btn-add", 0, 0 ).
        pause ( 5000 ).
        //Check and click Add categories Button
        useXpath ( ).
        //Click on the Categories Type
        click ( "//ul[ @class='dropdown-submenu' ]//a[ contains  ( . ,'" + categoryType[ getData ].trim( ) + "' ) ]" ).
        useCss ( ).
        pause ( 5000 )
        CategoriesDelete.pause ( 5000 ).
        //Check and Enter Categories Title               
        verify.visible ( ".video-tabs > a[ href='#properties' ]" ).
        click ( ".video-tabs > a[ href='#properties' ]" ).
        pause ( 5000 ).
        verify.visible ( ".text-input-headline" ).
        clearValue ( ".text-input-headline" ).
        pause ( 5000 ).
        setValue ( ".text-input-headline", storyTitle[ getData ] ).
        pause ( 5000 ).
        verify.visible ( "textarea[ ng-model='artifact.shortDescription' ]" ).
        clearValue ( "textarea[ ng-model='artifact.shortDescription' ]" ).
        setValue ( "textarea[ ng-model='artifact.shortDescription' ]", storyShortDesc[ getData ] ).
        pause ( 5000 ).
        //Check and click save button
        verify.visible ( ".btn-active" ).
        click ( ".btn-active" ).
        pause ( 5000 ).
        useXpath ( ).
        verify.containsText ( "//ul/li/a[ text( ) = 'Categories' ]", "Categories" ).
        pause ( 5000 ).
        click ( "//ul/li/a[ text( ) = 'Categories' ]" ).
        useCss ( ).
        pause ( 5000 ).
        waitForElementVisible ( ".content-count>strong", 5000, false ).
        verify.visible ( ".content-count>strong" ).
        pause ( 5000 ).
        getText ( '.content-count > strong', function ( currentCountResult ) {
          if  ( currentCountResult.status !== -1 ) {
            addedCount = currentCountResult.value;
            addedCount = addedCount.substring ( 1, addedCount.length - 1 );
          }
        } );
        CategoriesDelete.pause ( 5000 ).
        waitForElementVisible ( ".search-field-input", 5000 ).
        assert.visible ( ".search-field-input" ).
        setValue ( ".search-field-input", storyTitle[ getData ] ).
        keys ( CategoriesDelete.Keys.ENTER ). // hold the control
        click ( ".search-field-input" ).
        keys ( CategoriesDelete.Keys.NULL ). // release the control
        pause ( 5000 ).
        waitForElementVisible ( ".content-count>strong", 5000 ).
        verify.visible ( ".content-count>strong" ).
        getText ( '.content-count > strong', function ( currentCountResult ) {
          if  ( currentCountResult.status !== -1 ) {
            searchCount = currentCountResult.value;
            searchCount = searchCount.substring ( 1, searchCount.length - 1 );
          }
          if  ( searchCount > 0 ) {
            CategoriesDelete.waitForElementVisible ( " li.content-container:nth-child(1) > ng-include:nth-child(1)  > div:nth-child(1) > section:nth-child(1)  > div:nth-child(2)  > a:nth-child(1) > h2:nth-child(1) ", 9000, false ).
            pause ( 5000 ).
            click ( "li.content-container:nth-child(1) > ng-include:nth-child(1)  > div:nth-child(1) > section:nth-child(1) > div:nth-child(2)  > a:nth-child(1) > h2:nth-child(1) " ).
            pause ( 5000 ).
            //Check and Enter Category Title
            waitForElementVisible ( ".video-tabs > a[href='#properties' ]", 5000, false ).
            verify.visible ( ".video-tabs > a[href='#properties' ]" ).
            pause ( 5000 ).
            click ( ".video-tabs > a[href='#properties' ]" ).
            pause ( 5000 ).
            //Verify the Headline
            verify.visible ( ".text-input-headline" ).
            //Clear the Headline
            clearValue ( ".text-input-headline" ).
            pause ( 5000 ).
            //Enter the Headline
            setValue ( ".text-input-headline", storyEditTitle[ getData ] ).
            pause ( 5000 ).
            //Check and click Save button
            waitForElementVisible ( '.btn-active', 5000, false ).
            //Verify the Save Button
            verify.visible ( ".btn-active" ).
            pause ( 5000 ).
            //Click on the Save Button
            click ( ".btn-active" ).
            pause ( 5000 ).
            //Check and Click Delete Button.
            verify.visible ( ".btn-delete > span[ng-click='showDeleteVerification(); ']" ).
            //Click on the Delete button in the Portal
            click ( ".btn-delete > span[ng-click='showDeleteVerification(); ']" ).
            pause ( 5000 ).
            //Check the existance of delete confirmation dialog
            verify.visible ( "dialog[name=deleteVerification ]" ).
            pause ( 5000 ).
            //Click Cancel Button in Delete Dialog
            verify.visible ( ".link-secondary" ).
            //Click on the Cancel button in the pop-up window
            click ( ".link-secondary" ).
            pause ( 5000 ).
            verify.visible ( ".btn-delete > span[ng-click='showDeleteVerification();']" ).
            //Click Cancel Button in Delete Dialog
            click ( ".btn-delete > span[ng-click='showDeleteVerification();' ]" ).
            pause ( 5000 ).
            //Check the existance of delete confirmation to delete
            verify.visible ( "dialog[ name=deleteVerification ]" ).
            verify.visible ( "button.btn:nth-child(2) " ).
            pause ( 5000 ).
            //click on the delete button in pop-up window
            click ( "button.btn:nth-child(2)" ).
            pause ( 5000 ).
            useXpath ( ).
            verify.containsText ( "//ul/li/a[ text( ) = 'Categories' ]", "Categories" ).
            pause ( 5000 ).
            click ( "//ul/li/a[ text( ) = 'Categories']" ).
            useCss ( ).
            pause ( 5000 ).
            waitForElementVisible ( ".content-count>strong", 5000 , false ).
            assert.visible ( ".content-count>strong" ).
            //Get the Total Count in the CAtegories list
            getText ( '.content-count > strong', function ( actualCountResult ) {
              if  ( actualCountResult.status !== -1 ) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                expectedCount =  (  ( + addedCount ) -  ( 1 ) );
                if  ( actualCount == expectedCount ) {
                  //Write in the Excel for Pass Result and Reason
                  CategoriesDelete.writeToExcelPass ( 'boxxspring.xlsx', 'deleteCategories', ++rowCount, 6, 7 );
                }
                else {
                  //Write in the Excel for Fail Result and Reason
                  CategoriesDelete.writeToExcelFail ( 'boxxspring.xlsx', 'deleteCategories', ++rowCount, 6, 7, actualCount, expectedCount );
                }
              }
            } );
          }
          else {
            //Write in the Excel for Fail-Search Result and Reason
            CategoriesDelete.writeToExcelFailSearch ( 'boxxspring.xlsx', 'deleteCategories', ++rowCount, 6, 7, searchCount );
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