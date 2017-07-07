//this function is for check and Delete the Attributions
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'AttributionsDelete' ];
var attributionType = [ ];
var attributionTitle = [ ];
var storyShortDesc = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
var addedCount;
var searchCount;
var getData,rowCount = 1;
module.exports = {
  tags: [ 'attributionsDelete' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Attributions Delete': function ( attributionDelete ) {
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Attribution Title
      if ( z.includes ( 'A' ) ) {
        attributionTitle.push ( worksheet[ z ].v );
      }      
      //Read Attribution Short Description
      if ( z.includes ( 'B' ) ) {
        storyShortDesc.push ( worksheet[ z ].v );
      }
    }
    if ( attributionTitle.length > 1 ) {
      attributionDelete.pause ( 3000 ).
      useXpath ( ).
      pause ( 3000 ).
      //Verify the Attributions menu in the CONTENT
      verify.containsText ( "//ul/li/a[ text( ) = 'Attributions' ]", "Attributions" ).
      pause ( 3000 ).
      //Click the Attributions menu in the CONTENT
      click ( "//ul/li/a[ text( ) = 'Attributions' ]" ).
      useCss ( ).
      pause ( 3000 ).
      waitForElementVisible ( ".content-count>strong", 3000, false ).
      pause ( 3000 ).
      verify.visible ( ".content-count>strong" ).
      //Get current total count in the Attributions listing page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
        }
      } );
      for ( var getData = 1,rowCount = 1; getData < attributionTitle.length; getData++ ) {
        attributionDelete.pause ( 3000 ).
        useCss ( ).
        //Wait for the Add buttin is visible
        /*waitForElementVisible ( ".btn-add", 3000, false ).
        pause ( 3000 ).
        //Click on the Add button
        click ( ".btn-add" ).
        pause ( 3000 ).
        //Check and Enter Attributions Title               
        verify.visible ( ".video-tabs > a[ href='#properties' ]" ).
        pause ( 3000 ).
        //Click on the Properties Tab  
        click ( ".video-tabs > a[ href='#properties' ]" ).
        pause ( 3000 ).
        //Verify the Headline is visible
        verify.visible ( ".text-input-headline" ).
        //Clear the Attributions Title in the Headline field
        clearValue ( ".text-input-headline" ).
        pause ( 3000 ).
        //Enter the Attributions Title in the Headline field
        setValue ( ".text-input-headline", attributionTitle[ getData ] ).
        pause ( 3000 ).
        //Verify the Short description field is visible
        verify.visible ( "textarea[ ng-model='artifact.shortDescription' ]" ).
        //Clear the Attributions Description in the field
        clearValue ( "textarea[ ng-model='artifact.shortDescription' ]" ).
        //Enter the Attributions Description in the field
        setValue ( "textarea[ ng-model='artifact.shortDescription' ]", storyShortDesc[ getData ] ).
        pause ( 3000 ).
        //Check and click save button
        verify.visible ( ".btn-active" ).
        pause ( 3000 ).
        //Click on the Save button
        click ( ".btn-active" ).
        pause ( 3000 ).
        useXpath ( ).
        //Verify the Attributions menu in the CONTENT
        verify.containsText ( "//ul/li/a[ text( ) = 'Attributions' ]", "Attributions" ).
        pause ( 3000 ).
        //Click the Attributions menu in the CONTENT
        click ( "//ul/li/a[ text( ) = 'Attributions' ]" ).
        useCss ( ).*/
        pause ( 3000 ).
        waitForElementVisible ( ".content-count>strong", 3000, false ).
        verify.visible ( ".content-count>strong" ).
        pause ( 3000 ).
        //Get Searched Attributions total count in the Attributions listing page
        getText ( '.content-count > strong', function ( currentCountResult ) {
          if ( currentCountResult.status !== -1 ) {
            addedCount = currentCountResult.value;
            addedCount = addedCount.substring ( 1, ( addedCount.length - 1 ) );
          }
        } );
        attributionDelete.pause ( 3000 ).
        //Wait for the search field visible
        waitForElementVisible ( ".search-field-input", 3000, false ).
        verify.visible ( ".search-field-input" ).
        //Enter the search data in the field
        setValue ( ".search-field-input", attributionTitle[ getData ] ).
        keys ( attributionDelete.Keys.ENTER ). // hold the control
        //click on the search field
        click ( ".search-field-input" ).
        keys ( attributionDelete.Keys.NULL ). // release the control
        pause ( 3000 ).
        waitForElementVisible ( ".content-count>strong", 3000, false ).
        verify.visible ( ".content-count>strong" ).
        //Get Actual total count in the Attributions listing page
        getText ( '.content-count > strong', function ( searchCountResult ) {
          if ( searchCountResult.status !== -1 ) {
            searchCount = searchCountResult.value;
            searchCount = searchCount.substring ( 1, searchCount.length - 1 );
          }
          if ( searchCount > 0 ) {
            attributionDelete.useXpath().
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
            //Verify the Attributions menu in the CONTENT
            verify.containsText ( "//ul/li/a[ text( ) = 'Attributions' ]", "Attributions" ).
            pause ( 3000 ).
            //Click on the Attributions menu in the CONTENT
            click ( "//ul/li/a[ text( ) = 'Attributions' ]" ).
            useCss ( ).
            pause ( 3000 ).
            waitForElementVisible ( ".content-count>strong", 3000,false ).
            verify.visible ( ".content-count>strong" ).
            //Get Attributions total count in the Attributions listing page
            getText ( '.content-count > strong', function ( actualCountResult ) {
              if ( actualCountResult.status !== -1 ) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, ( actualCount.length - 1 ) );
                expectedCount = ( ( + addedCount ) - ( 1 ) );
                if ( actualCount == expectedCount ) {
                  //Write in the Excel for Pass Result and Reason
                  attributionDelete.writeToExcelPass ( 'boxxspring.xlsx', 'AttributionsDelete', ++rowCount, 4 );
                }
                else {
                  //Write in the Excel for Fail Result and Reason
                  attributionDelete.writeToExcelFail ( 'boxxspring.xlsx', 'AttributionsDelete', ++rowCount, 4, 5, "ActualResult: '"+ actualCount +"' in the Total Count After Delete Attribution. ExpectedResult: should be'"+ expectedCount +"' in the Total Count "  );
                }
              }
            } );
          }
          else {
            //Write in the Excel for Search Fail Result and Reason
            attributionDelete.writeToExcelFail ( 'boxxspring.xlsx', 'AttributionsDelete', ++rowCount, 4, 5, "Searched Result Count,'"+ searchCount +"'" );
          }
        } );
      }
    }
    else {
    }
    //End the Browser
    attributionDelete.end ( );
  }
};