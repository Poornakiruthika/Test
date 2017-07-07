//this function is for check and Delete the Videos 
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'VideosDelete' ];
var videoUrl = [ ];
var storyTitle = [ ];
var storyEditTitle = [ ];
var storyShortDesc = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
var addedCount;
var searchCount;
var getData,rowCount,convertData = 1;
module.exports = {
  tags: [ 'videosDelete' ],
  //Login in to Application
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Video Delete': function ( videoDelete ) {
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Videos Title
      if ( z.includes ( 'A' ) ) {
        videoUrl.push ( worksheet[ z ].v );
      }
      //Read story title
      if ( z.includes ( 'B' ) ) {
        storyTitle.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if ( z.includes ( 'C' ) ) {
        storyEditTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if ( z.includes ( 'D' ) ) {
        storyShortDesc.push ( worksheet[ z ].v );
      }
    }
    if ( storyTitle.length > 1 ) {
      videoDelete.pause ( 3000 ).useXpath ( ).
      //Verify the Videos Menu in CONTENT is visible
      verify.containsText ( "//ul/li/a[text( ) = 'Videos' ] ", "Videos" ).
      pause ( 3000 ).
      //Click on the Videos Menu in CONTENT
      click ( "//ul/li/a[text( ) = 'Videos' ] " ).
      useCss ( ).pause ( 3000 ).
      //Get the Current Total Count in the Video listing page before adding story 
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
        }
      } );
      for ( var getData = 1,rowCount = 1; getData < storyTitle.length; getData++ ) {
        videoDelete.waitForElementVisible ( ".btn-add", 3000, false ).
        pause ( 3000 ).
        //Click Add video button
        click ( ".btn-add" ).
        pause ( 3000 ).
        //Wait for Video url field is visible
        waitForElementVisible ( "#video_url", 3000, false ).
        pause ( 3000 ).
        //Verify the Video Text field
        verify.visible ( "#video_url" ).
        pause ( 3000 ).
        //Enter the Video url in the Field
        setValue ( "#video_url", videoUrl[ getData ].trim( ) ).
        pause ( 12000 ).
        //Wait for Continue button is visible
        waitForElementVisible ( "button.pull-right", 3000, false ).
        pause ( 3000 ).
        //Click on the continue button
        click ( "button.pull-right" ).
        pause ( 9000 ).
        //Check and Enter Videos Title
        waitForElementVisible ( ".text-input-headline", 3000, false ).
        pause ( 3000 ).
        //Clear the Story Title
        clearValue ( ".text-input-headline" ).
        pause ( 3000 ).
        //Enter the Story Title
        setValue ( ".text-input-headline", storyTitle[ getData ] ).
        pause ( 3000 ).
        //Wait for visible the Save button
        waitForElementVisible ( '.btn-active', 3000, false ).
        //Verify the Save button is Visible
        verify.visible ( ".btn-active" ).
        pause ( 3000 ).
        //Click on the Save Button
        click ( ".btn-active" ).
        pause ( 3000 ).
        //Verify the Properties Tab
        verify.visible ( ".video-tabs > a[ href='#properties' ]" ).
        //Click on the Properties Tab
        click ( ".video-tabs > a[ href='#properties' ]" ).
        pause ( 3000 ).
        //Verify the Short description field is Visible
        verify.visible ( "textarea[  ng-model='artifact.shortDescription' ]" ).
        //Clear Short Description
        clearValue ( "textarea[  ng-model='artifact.shortDescription' ]" ).
        //Enter the Short Description
        setValue ( "textarea[  ng-model='artifact.shortDescription' ]", storyShortDesc[ getData ] ).
        pause ( 3000 ).
        //Verify the save button
        verify.visible ( ".btn-active" ).
        //Click on the save button
        click ( ".btn-active" ).
        pause ( 3000 ).
        useXpath ( ).
        //Verify the Videos in CONTNET Menu
        verify.containsText ( "//ul/li/a[ text( ) = 'Videos']" , "Videos" ).
        pause ( 3000 ).
        //Click on the Videos in CONTENT Menu
        click ( "//ul/li/a[ text( ) = 'Videos']" ).
        useCss ( ).
        pause ( 3000 ).
        waitForElementVisible ( ".content-count>strong" , 3000, false ).
        verify.visible ( ".content-count>strong" ).
        //Get the Actual Total Count in the Video listing page after added story 
        getText ( '.content-count > strong', function ( actualCountResult ) {
          if ( actualCountResult.status !== -1 ) {
            addedCount = actualCountResult.value;
            addedCount = addedCount.substring ( 1, ( addedCount.length - 1 ) );
          }
        } );
        videoDelete.pause ( 3000 ).
        //Wait for visible the Search input field
        waitForElementVisible ( ".search-field-input", 3000, false ).
        //Verify the Search input field is visible
        verify.visible ( ".search-field-input" ).
        //Enter the Data in Search input field
        setValue ( ".search-field-input", storyTitle[ getData ] ).
        keys ( videoDelete.Keys.ENTER ). // hold the control
        //Click on the Searched field
        click ( ".search-field-input" ).
        keys ( videoDelete.Keys.NULL ). // release the control
        pause ( 3000 ).
        waitForElementVisible ( ".content-count>strong", 3000, false ).
        pause ( 3000 ).
        //Get the Saerch Total count in the Video listing page
        getText ( '.content-count > strong', function ( searchCountResult ) {
          if ( getData >= storyTitle.length ) {
            convertData = getData - ( storyTitle.length - 1 );
            getData++;
          }
          if ( searchCountResult.status !== -1 ) {
            searchCount = searchCountResult.value;
            searchCount = searchCount.substring ( 1, ( searchCount.length - 1 ) );
          }
          if ( searchCount > 0 ) {
            videoDelete.pause ( 3000 ).useXpath().
            //Verify the Edit pull button
            waitForElementVisible ( "(//h2[@class='ng-binding'])[ 1 ]", 3000 , false ).
            pause ( 3000 ).
            //Click on edit pull button
            click ( "(//h2[@class='ng-binding'])[ 1 ]" ).
            pause ( 3000 ).useCss().
            //Verify the Content Tab
            verify.visible ( ".video-tabs > a[href='#content'] " ).
            //Click on Content Tab
            click ( ".video-tabs > a[href='#content'] " ).
            pause ( 3000 ).
            //Check and Enter Videos Title
            waitForElementVisible ( ".text-input-headline", 3000 , false ).
            //Clear the Story Title
            clearValue ( ".text-input-headline" ).
            pause ( 3000 ).
            //Enter the Story Title
            setValue ( ".text-input-headline", storyEditTitle[ convertData ] ).
            pause ( 3000 ).
            //Verify the Save button
            waitForElementVisible ( '.btn-active', 3000, false ).
            verify.visible ( ".btn-active" ).
            pause ( 3000 ).
            //click on Save button
            click ( ".btn-active" ).
            pause ( 3000 ).
            //Check and Click Delete Button.
            verify.visible ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
            //Click on the Delete button in the portal
            click ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
            pause ( 3000 ).
            //Check the existance of delete confirmation dialog
            verify.visible ( "dialog[name=deleteVerification] " ).
            pause ( 3000 ).
            //Click Cancel Button in Delete Dialog
            verify.visible ( ".link-secondary" ).
            //Click on the Cancel button in the pop-up window
            click ( ".link-secondary" ).
            pause ( 3000 ).
            verify.visible ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
            //Click on the Delete button in the portal
            click ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
            pause ( 3000 ).
            //Check the existance of delete confirmation to delete
            verify.visible ( "dialog[ name=deleteVerification ]" ).
            verify.visible ( "button.btn:nth-child( 2 )" ).
            pause ( 3000 ).
            //Click on the Delete button in the pop-up window
            click ( "button.btn:nth-child(2)" ).
            pause ( 3000 ).
            useXpath ( ).
            verify.containsText ( "//ul/li/a[text( ) = 'Videos'] ", "Videos" ).
            pause ( 3000 ).
            click ( "//ul/li/a[ text( ) = 'Videos']" ).
            useCss ( ).
            pause ( 3000 ).
            waitForElementVisible ( ".content-count>strong", 3000, false ).
            verify.visible ( ".content-count>strong" ).
            //get Actual count in the videos list page
            getText ( '.content-count > strong', function ( actualCountResult ) {
              if ( actualCountResult.status !== -1 ) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, ( actualCount.length - 1 ) );
                expectedCount = ( ( + addedCount ) - ( 1 ) );
                if ( actualCount == expectedCount ) {
                  //Write in the Excel: Pass Result
                  videoDelete.writeToExcelPass ( 'boxxspring.xlsx', 'VideosDelete', ++rowCount, 6 );
                }
                else {
                  //Write in the Excel: Fail Result and Reason
                  videoDelete.writeToExcelFail ( 'boxxspring.xlsx', 'VideosDelete', ++rowCount, 6, 7, "ActualResult: '"+ actualCount +"' in the Total Count After Deleted Videos. ExpectedResult: should be'"+ expectedCount +"' in the Total Count "  );
                }
              }
            } );
          }
          else {
            //Write in the Excel: Searched Fail Result and Reason
            videoDelete.writeToExcelFail ( 'boxxspring.xlsx', 'VideosDelete', ++rowCount, 6, 7, "Searched Result Count,'"+ searchCount +"'" );
          }
        } );
      }
    }
    //End the Browser
    videoDelete.end ( );
  }
};