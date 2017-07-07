var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if  ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets['deleteVideos'];
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
var getData, rowCount = 1;
module.exports = {
  tags: [ 'deletevideo' ],
  //Login in to Application
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'DeleteVideos': function ( videoDelete ) {
    for  ( z in worksheet ) {
      if  ( z[ 1 ] === '!' ) continue;
      //Read Videos Title
      if  ( z.includes ( 'A' ) ) {
        videoUrl.push ( worksheet[ z ].v );
      }
      //Read story title
      if  ( z.includes ( 'B' ) ) {
        storyTitle.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if  ( z.includes ( 'C' ) ) {
        storyEditTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if  ( z.includes ( 'D' ) ) {
        storyShortDesc.push ( worksheet[ z ].v );
      }
    }
    if  ( storyTitle.length > 1 ) {
      videoDelete.pause ( 5000 ).
      useXpath ( ).
      pause ( 5000 ).
      verify.containsText ( "//ul/li/a[text( ) = 'Videos' ] ", "Videos" ).
      pause ( 3000 ).
      click ( "//ul/li/a[text( ) = 'Videos' ] " ).
      useCss ( ).
      pause ( 5000 ).
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if  ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, currentCount.length - 1 );
        }
      } );
      for  ( var getData = 1; getData < storyTitle.length; getData++ ) {
        videoDelete.waitForElementVisible ( ".btn-add", 5000, false ).
        pause ( 5000 ).
        //Click Add video button
        click ( ".btn-add" )
        videoDelete.pause ( 5000 ).
        waitForElementVisible ( "#video_url", 5000, false ).
        pause ( 5000 ).
        //Verify the Video Text field
        verify.visible ( "#video_url" ).
        pause ( 5000 ).
        setValue ( "#video_url", videoUrl[ getData ].trim( ) ).
        pause ( 10000 ).
        waitForElementVisible ( "button.pull-right", 5000, false ).
        pause ( 6000 ).
        //click on the continue button
        click ( "button.pull-right" ).
        pause ( 5000 ).
        //Check and Enter Videos Title
        waitForElementVisible ( ".text-input-headline", 5000, false ).
        pause ( 5000 ).
        //Clear the Story Title
        clearValue ( ".text-input-headline" ).
        pause ( 5000 ).
        //Enter the Story Title
        setValue ( ".text-input-headline", storyTitle[ getData ] ).
        pause ( 5000 ).
        //Check and verify the Save button
        waitForElementVisible ( '.btn-active', 5000, false ).
        verify.visible ( ".btn-active" ).
        pause ( 5000 ).
        //Click on the Save Button
        click ( ".btn-active" ).
        pause ( 5000 ).
        //Verify the Properties Tab
        verify.visible ( ".video-tabs > a[ href='#properties' ] " ).
        //Click on the Properties Tab
        click ( ".video-tabs > a[ href='#properties' ] " ).
        pause ( 5000 ).
        verify.visible ( "textarea[  ng-model='artifact.shortDescription' ] " ).
        //Clear Short Description
        clearValue ( "textarea[  ng-model='artifact.shortDescription' ] " ).
        //Enter the Short Description
        setValue ( "textarea[  ng-model='artifact.shortDescription' ] ", storyShortDesc[ getData ] ).
        pause ( 5000 ).
        //Verify the save button
        verify.visible ( ".btn-active" ).
        //Click on the save button
        click ( ".btn-active" ).
        pause ( 5000 ).
        useXpath ( ).
        verify.containsText ( "//ul/li/a[ text( ) = 'Videos'] " , "Videos" ).
        pause ( 5000 ).
        click ( "//ul/li/a[ text( ) = 'Videos'] " ).
        useCss ( ).
        pause ( 5000 ).
        waitForElementVisible ( ".content-count>strong" , 5000 ).
        verify.visible ( ".content-count>strong" ).
        getText ( '.content-count > strong', function ( currentCountResult ) {
          if  ( currentCountResult.status !== -1 ) {
            addedCount = currentCountResult.value;
            addedCount = addedCount.substring ( 1, addedCount.length - 1 );
          }
        } );
        videoDelete.pause ( 5000 ).
        waitForElementVisible ( ".search-field-input", 5000 , false ).
        verify.visible ( ".search-field-input" ).
        setValue ( ".search-field-input", storyTitle[ getData ] ).
        keys ( videoDelete.Keys.ENTER ). // hold the control
        //Click on the Searched field
        click ( ".search-field-input" ).
        keys ( videoDelete.Keys.NULL ). // release the control
        pause ( 5000 ).
        waitForElementVisible ( ".content-count>strong", 5000 , false ).
        var convertData = 0;
        videoDelete.getText ( '.content-count > strong', function ( currentCountResult ) {
          if  ( getData >= storyTitle.length ) {
            convertData = getData - storyTitle.length;
            getData++;
          }
          if  ( currentCountResult.status !== -1 ) {
            searchCount = currentCountResult.value;
            searchCount = searchCount.substring ( 1, searchCount.length - 1 );
          }
          if  ( searchCount > 0 ) {
            videoDelete.pause ( 5000 ).
            //Verify the Edit pull button
            waitForElementVisible ( ".btn-pullout", 5000 , false ).
            //Move on the Edit button
            moveToElement ( ".btn-pullout", 0, 0 ).
            pause ( 5000 ).
            //Click on edit pull button
            click ( ".btn-pullout" ).
            pause ( 5000 ).
            //Verify the Content Tab
            verify.visible ( ".video-tabs > a[href='#content'] " ).
            //Click on Content Tab
            click ( ".video-tabs > a[href='#content'] " ).
            pause ( 5000 ).
            //Check and Enter Videos Title
            waitForElementVisible ( ".text-input-headline", 5000 , false ).
            //Clear the Story Title
            clearValue ( ".text-input-headline" ).
            pause ( 5000 ).
            //Enter the Story Title
            setValue ( ".text-input-headline", storyEditTitle[ convertData ] ).
            pause ( 5000 ).
            //Verify the Save button
            waitForElementVisible ( '.btn-active', 5000, false ).
            verify.visible ( ".btn-active" ).
            pause ( 5000 ).
            //click on Save button
            click ( ".btn-active" ).
            pause ( 5000 ).
            //Check and Click Delete Button.
            verify.visible ( ".btn-delete >span[ng-click='showDeleteVerification();'] " ).
            //Click on the Delete button in the portal
            click ( ".btn-delete >span[ng-click='showDeleteVerification();'] " ).
            pause ( 5000 ).
            //Check the existance of delete confirmation dialog
            verify.visible ( "dialog[name=deleteVerification] " ).
            pause ( 5000 ).
            //Click Cancel Button in Delete Dialog
            verify.visible ( ".link-secondary" ).
            //Click on the Cancel button in the pop-up window
            click ( ".link-secondary" ).
            pause ( 5000 ).
            verify.visible ( ".btn-delete > span[ ng-click='showDeleteVerification();'] " ).
            //Click on the Delete button in the portal
            click ( ".btn-delete > span[ ng-click='showDeleteVerification();'] " ).
            pause ( 5000 ).
            //Check the existance of delete confirmation to delete
            verify.visible ( "dialog[ name=deleteVerification ]" ).
            verify.visible ( "button.btn:nth-child(2)" ).
            pause ( 5000 ).
            //Click on the Delete button in the pop-up window
            click ( "button.btn:nth-child(2)" ).
            pause ( 5000 ).
            useXpath ( ).
            verify.containsText ( "//ul/li/a[text( ) = 'Videos'] ", "Videos" ).
            pause ( 5000 ).
            click ( "//ul/li/a[ text( ) = 'Videos']" ).
            useCss ( ).
            pause ( 5000 ).
            waitForElementVisible ( ".content-count>strong", 5000, false ).
            verify.visible ( ".content-count>strong" ).
            //get Actual count in the videos list page
            getText ( '.content-count > strong', function ( actualCountResult ) {
              if  ( actualCountResult.status !== -1 ) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                expectedCount =  (  ( + addedCount ) -  ( 1 ) );
                if  ( actualCount == expectedCount ) {
                  //Write in the spreadsheet: Pass Result and Reason
                  videoDelete.writeToExcelPass ( 'boxxspring.xlsx', 'deleteVideos', ++rowCount, 6, 7 );
                }
                else {
                  //Write in the spreadsheet: Fail Result and Reason
                  videoDelete.writeToExcelFail ( 'boxxspring.xlsx', 'deleteVideos', ++rowCount, 6, 7, actualCount, currentCount );
                }
              }
            } );
          }
          else {
            //Write in the spreadsheet: Searched Fail Result and Reason
            videoDelete.writeToExcelFailSearch ( 'boxxspring.xlsx', 'deleteVideos', ++rowCount, 6, 7, searchCount );
          }
        } );
      }
    }
    videoDelete.end ( );
  }
};