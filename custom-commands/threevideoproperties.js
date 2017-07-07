//this function is for check and add properties in 360videos 
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var result = [ ];
exports.command = function ( videoTitle , shortTitle , shortDesc , categoryName , shortNote , dragImg , currentCount ) {
  this.pause ( 3000 ).
  //wait for Edit the title is visible
  waitForElementVisible ( '.container-head > text-field > input', 3000, false ).
  //Verify Edit the title is visible
  verify.visible ( ".container-head > text-field > input" ).
  //Clear the video title
  clearValue ( '.container-head > text-field > input' ).
  //Enter the video title
  setValue ( '.container-head > text-field > input', videoTitle ).
  //Check the description display
  verify.visible ( ".wmd-input" ).
  //Verify the properties tab
  verify.visible ( ".video-tabs > a[ href='#properties']" ).
  //VerifyClick the properties tab
  click ( ".video-tabs > a[ href='#properties']" ).
  pause ( 3000 ).
  //Check and enter short name
  verify.visible ( "textarea[ ng-model='artifact.shortName']" ).
  //Clear the short Title
  clearValue ( "textarea[ ng-model='artifact.shortName']" ).
  //Enter the short Title
  setValue ( "textarea[ ng-model='artifact.shortName']", shortTitle ).
  //Check and enter short description
  verify.visible ( "textarea[ ng-model='artifact.shortDescription']" ).
  //Clear the short Description
  clearValue ( "textarea[ ng-model='artifact.shortDescription']" ).
  //Enter the short Description
  setValue ( "textarea[ ng-model='artifact.shortDescription']", shortDesc ).
  pause ( 3000 ).
  //Check categories
  waitForElementVisible ( '.collections-widget', 3000,false ).
  verify.visible ( ".collections-widget" ).
  pause ( 3000 ).
  //Clear Categories Name in the Field
  clearValue ( ".collections-widget > input" ).
  //Enter categories Name
  setValue ( ".collections-widget > input", categoryName ).
  pause ( 3000 ).  
  verify.visible ( ".suggestion-list-wrap > div:nth-child( 1 ) > div:nth-child( 1 ) > span:nth-child( 1 )" ).
  //click on the categories name in the list
  click ( ".suggestion-list-wrap > div:nth-child( 1 ) > div:nth-child( 1 ) > span:nth-child( 1 )" ).
  pause ( 3000 ).
  //Clear the short Note
  clearValue ( "textarea[ ng-model='artifact.note']" ).
  //Enter the short Note
  setValue ( "textarea[ ng-model='artifact.note']", shortNote ).
  pause ( 3000 ).
    verify.visible ( "a.btn-active" ).
    pause ( 3000 ).
    //Click on the Save button
    click ( "a.btn-active" ).
    pause ( 3000 ).
  //Check Thumbnail ADD and Delete
  waitForElementVisible ( ".uploaded-image-container", 9000, false ).
  pause ( 4000 ).
  getAttribute ( ".uploaded-image", "src", function ( imageCheck ) {
    var imageValue = imageCheck.value;
    var imageStatus = imageCheck.status;
    if ( imageStatus === 0 ) {
      this.pause ( 3000 ).
      verify.visible ( " .content-menu > li:nth-child( 3 ) > a:nth-child( 1 )" ).
      pause ( 3000 ).
      click ( ".content-menu > li:nth-child( 3 ) > a:nth-child( 1 )" ).
      pause ( 3000 ).
      waitForElementNotPresent ( ".uploaded-image-container", 9000, false ).
      pause ( 3000 ).
      setValue ( 'span.hidden-input:nth-child( 1 ) > input:nth-child( 1 )', require ( 'path' ).resolve ( dragImg ) ).
      pause ( 3000 )
    }    
    else {
    }
  } );
  //Check and click save button
  this.verify.visible ( "a.btn-active" ).
  //click on the save button
  click ( "a.btn-active" ).
  pause ( 3000 ).  
  //Check and click Distribution Tab
  verify.visible ( ".video-tabs a[ href='#distribution']" ).
  //click on the distribution tab
  click ( ".video-tabs a[ href='#distribution']" ).
  pause ( 3000 ).
  //Search for videos link
  useXpath ( ).
  verify.containsText ( "//ul/li/a[ text( ) = '360videos']", "360videos" ).
  pause ( 3000 ).
  //click on the 360 videos menu in CONTENT
  click ( "//ul/li/a[ text( ) = '360videos']" ).
  useCss ( ).
  pause ( 3000 ) 
  return this;
};