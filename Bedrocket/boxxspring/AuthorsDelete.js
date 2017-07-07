//this function is for check and Delete the Authors
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'AuthorsDelete' ];
var authorType = [ ];
var authorTitle = [ ];
var authorEditTitle = [ ];
var storyShortDesc = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
var addedCount;
var searchCount;
var getData,rowCount = 1;

module.exports = {
  tags: [ 'authorsDelete' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Authors Delete': function ( authorDelete ) {

    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read story title
      if ( z.includes ( 'A' ) ) {
        authorTitle.push ( worksheet[ z ].v );
      }
      //Read Short Edit Title
      if ( z.includes ( 'B' ) ) {
        authorEditTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if ( z.includes ( 'C' ) ) {
        storyShortDesc.push ( worksheet[ z ].v );
      }
    }
    if ( authorTitle.length > 1 ) {
      authorDelete.pause ( 3000 ).
      useXpath ( ).
      pause ( 3000 ).
      //Verify the Authors menu in the CONTENT
      verify.containsText ( "//ul/li/a[ text( ) = 'Authors' ]", "Authors" ).
      pause ( 3000 ).
      //Click the Authors menu in the CONTENT
      click ( "//ul/li/a[ text( ) = 'Authors' ]" ).
      useCss ( ).
      pause ( 3000 ).
      waitForElementVisible ( ".content-count>strong", 3000, false ).
      pause ( 3000 ).
      verify.visible ( ".content-count>strong" ).
      //Get current total count in the authors listing page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
        }
      } );
      for ( var getData = 1,rowCount=1; getData < authorTitle.length; getData++ ) {
        authorDelete.pause ( 3000 ).
        useCss ( ).
        //Wait for the Add buttin is visible
        waitForElementVisible ( ".btn-add", 3000, false ).
        pause ( 3000 ).
        //Click on the Add button
        click ( ".btn-add" ).
        pause ( 3000 ).
        //Check and Enter Authors Title               
        verify.visible ( ".video-tabs > a[ href='#properties' ]" ).
        pause ( 3000 ).
        //Click on the Properties Tab  
        click ( ".video-tabs > a[ href='#properties' ]" ).
        pause ( 3000 ).
        //Verify the Headline is visible
        verify.visible ( ".text-input-headline" ).
        //Clear the Authors Title in the Headline field
        clearValue ( ".text-input-headline" ).
        pause ( 3000 ).
        //Enter the Authors Title in the Headline field
        setValue ( ".text-input-headline", authorTitle[ getData ] ).
        pause ( 3000 ).
        //Verify the Short description field is visible
        verify.visible ( "textarea[ ng-model='artifact.shortDescription' ]" ).
        //Clear the Authors Description in the field
        clearValue ( "textarea[ ng-model='artifact.shortDescription' ]" ).
        //Enter the Authors Description in the field
        setValue ( "textarea[ ng-model='artifact.shortDescription' ]", storyShortDesc[ getData ] ).
        pause ( 3000 ).
        //Check and click save button
        verify.visible ( ".btn-active" ).
        pause ( 3000 ).
        //Click on the Save button
        click ( ".btn-active" ).
        pause ( 3000 ).
        useXpath ( ).
        //Verify the Authors menu in the CONTENT
        verify.containsText ( "//ul/li/a[ text( ) = 'Authors' ]", "Authors" ).
        pause ( 3000 ).
        //Click the Authors menu in the CONTENT
        click ( "//ul/li/a[ text( ) = 'Authors' ]" ).
        useCss ( ).
        pause ( 3000 ).
        waitForElementVisible ( ".content-count>strong", 3000, false ).
        verify.visible ( ".content-count>strong" ).
        pause ( 3000 ).
        //Get Searched Authors total count in the authors listing page
        getText ( '.content-count > strong', function ( searchCountResult ) {
          if ( searchCountResult.status !== -1 ) {
            addedCount = searchCountResult.value;
            addedCount = addedCount.substring ( 1, ( addedCount.length - 1 ) );
          }
        } );
        authorDelete.pause ( 3000 ).
        //Wait for the search field visible
        waitForElementVisible ( ".search-field-input", 3000, false ).
        verify.visible ( ".search-field-input" ).
        //Enter the search data in the field
        setValue ( ".search-field-input", authorTitle[ getData ] ).
        keys ( authorDelete.Keys.ENTER ). // hold the control
        //click on the search field
        click ( ".search-field-input" ).
        keys ( authorDelete.Keys.NULL ). // release the control
        pause ( 3000 ).
        waitForElementVisible ( ".content-count>strong", 3000, false ).
        verify.visible ( ".content-count>strong" ).
        //Get Actual total count in the authors listing page
        getText ( '.content-count > strong', function ( currentCountResult ) {
          if ( currentCountResult.status !== -1 ) {
            searchCount = currentCountResult.value;
            searchCount = searchCount.substring ( 1, searchCount.length - 1 );
          }
          if ( searchCount > 0 ) {
            authorDelete.useXpath().
            waitForElementVisible ("(//h2[@class='ng-binding'])[ 1 ]", 3000, false ).
            pause ( 3000 ).
            //Click on the Searched data in the listing page
            click ( "(//h2[@class='ng-binding'])[1]" ).
            useCss().pause ( 3000 ).
            //Check and Enter Category Title
            waitForElementVisible ( ".video-tabs > a[ href='#properties' ]", 3000, false ).
            verify.visible ( ".video-tabs > a[ href='#properties' ]" ).
            pause ( 3000 ).
            //Click on the Properties Tab
            click ( ".video-tabs > a[  href='#properties' ]" ).
            pause ( 3000 ).
            //Verify the Headline is visible
            verify.visible ( ".text-input-headline" ).
            //Clear the Author Title data in the field
            clearValue ( ".text-input-headline" ).
            pause ( 3000 ).
            //Enter the Author Title data in the field
            setValue ( ".text-input-headline", authorEditTitle[ getData ] ).
            pause ( 3000 ).
            //Check the Save button
            waitForElementVisible ( '.btn-active', 3000, false ).
            //Verify the Save button is visible
            verify.visible ( ".btn-active" ).
            pause ( 3000 ).
            //Click on the Save button
            click ( ".btn-active" ).
            pause ( 3000 ).
            //Check the Delete Button.
            verify.visible ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
            pause ( 3000 ).
            //Click on the Delete button in the Properties Tab
            click ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
            pause ( 3000 ).
            //Check the existance of delete confirmation dialog
            verify.visible ( "dialog[ name=deleteVerification ]" ).
            pause ( 3000 ).
            //Verify the Cancel Button in Delete Dialog is visible
            verify.visible ( ".link-secondary" ).
            //Click Cancel Button in Delete Dialog
            click ( ".link-secondary" ).
            pause ( 3000 ).
            //Verify the Delete Button in the Properties Tab is visible
            verify.visible ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
            pause ( 3000 ).
            //Click on the Delete button in the Properties Tab
            click ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
            pause ( 3000 ).
            //Check the existance of delete confirmation to delete
            verify.visible ( "dialog[ name=deleteVerification ]" ).
            verify.visible ( "button.btn:nth-child( 2 )" ).
            pause ( 3000 ).
            //Click on the Delete Button in Delete Dialog box
            click ( "button.btn:nth-child( 2 )" ).
            pause ( 3000 ).
            useXpath ( ).
            //Verify the Authors menu in the CONTENT
            verify.containsText ( "//ul/li/a[ text( ) = 'Authors' ]", "Authors" ).
            pause ( 3000 ).
            //Click on the Authors menu in the CONTENT
            click ( "//ul/li/a[ text( ) = 'Authors' ]" ).
            useCss ( ).
            pause ( 3000 ).
            waitForElementVisible ( ".content-count>strong", 3000,false ).
            verify.visible ( ".content-count>strong" ).
            //Get Authors total count in the authors listing page
            getText ( '.content-count > strong', function ( actualCountResult ) {
              if ( actualCountResult.status !== -1 ) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, ( actualCount.length - 1 ) );
                expectedCount = ( ( + addedCount ) - ( 1 ) );
                if ( actualCount == expectedCount ) {
                  //Write in the Excel for Pass Result and Reason
                  authorDelete.writeToExcelPass ( 'boxxspring.xlsx', 'AuthorsDelete', ++rowCount, 5 );
                }
                else {
                  //Write in the Excel for Fail Result and Reason
                  authorDelete.writeToExcelFail ( 'boxxspring.xlsx', 'AuthorsDelete', ++rowCount, 5, 6, "ActualResult: '"+ actualCount +"' in the Total Count After Deleted Authors. ExpectedResult: should be'"+ expectedCount +"' in the Total Count"  );
                }
              }
            } );
          }
          else {
            //Write in the Excel for Search Fail Result and Reason
            authorDelete.writeToExcelFail ( 'boxxspring.xlsx', 'AuthorsDelete', ++rowCount, 5, 6, "Searched Result Count,'"+ searchCount +"'" );
          }
        } );
      }
    }
    else {
    }
    //End the Browser
    authorDelete.end ( );
  }
};