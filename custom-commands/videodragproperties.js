//this function is for check and add properties in Video Drag&Drop 
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var result = [ ];
exports.command = function ( videoTitle, shortTitle, shortDesc, author, attribution, categoryName, shortNote, dragImg, currentCount ) {
  this.pause ( 3000 ).  
  //Wait for Edit the title is visible
  waitForElementVisible ( '.container-head > text-field > input', 3000, false ).
  //Verify the Video Title field is visible
  verify.visible ( ".container-head > text-field > input" ).
  //Clear the Video Title data in the field
  clearValue ( '.container-head > text-field > input' ).
  //Enter the Video Title data in the field
  setValue ( '.container-head > text-field > input', videoTitle ).
  //Check the description display
  verify.visible ( "#wmd-input-0" ).
  //Verify the properties tab is visible
  verify.visible ( ".video-tabs > a[  href='#properties']" ).
  //Click the properties tab
  click ( ".video-tabs > a[ href='#properties']" ).
  pause ( 3000 ).
  //Check and enter short name
  verify.visible ( "textarea[ ng-model='artifact.shortName']" ).
  //Clear the Shortname data in the field
  clearValue ( "textarea[ ng-model='artifact.shortName']" ).
  //Enter the Shortname data in the field
  setValue ( "textarea[ ng-model='artifact.shortName']", shortTitle ).
  //Check and enter short description
  verify.visible ( "textarea[ ng-model='artifact.shortDescription']" ).
  //Clear the Short description data in the field
  clearValue ( "textarea[ ng-model='artifact.shortDescription']" ).
  //Enter the Short description data in the field
  setValue ( "textarea[ ng-model='artifact.shortDescription']", shortDesc ).
  pause ( 3000 ).
  //Select Author name
  verify.visible ( ".attribution-container>a[ng-click='showAddAuthor()']" ).
  //Click on the Authors dropdown option
  click ( ".attribution-container>a[ng-click='showAddAuthor()']" ).
  pause ( 3000 ).useXpath ( ).
  //Enter the search data in the field
  setValue (  '//input[@placeholder ="Search authors"]',author.trim() )
  this.pause ( 3000 ).
  //click on the searched Author
  click ( "//ul/li/a/span[ text( ) = '"+ author.trim() +"']" ).
  pause ( 3000 ).useCss ( ).
  //Get the Attribution values
  getValue ( ".add-icon", function ( attributeExist ) {
    var attributeExistValuse = attributeExist.value;
    if ( attributeExistValuse === true ) {
      //Verify the Attribution field is visible
      this.verify.visible ( ".attribution-container>a[ng-click='showAddAttribution()']" ).
      //Click on the Attribution dropdown option
      click ( ".attribution-container>a[ng-click='showAddAttribution()']" ).
      pause ( 3000 ).useXpath ( ).
      //Enter the Attribution name in the field
      setValue ( '//input[@placeholder ="Search attributions"]',attribution.trim( ) ).
      pause ( 3000 ).
      //click on the searched Attribution
      click ( "//ul/li/a/span[contains(.,'"+ attribution.trim( ) +"')]" ).
      pause ( 3000 ).useCss ( )
    }
    else {    
    }
  });
    //Wait for categories name field is visible
    this.waitForElementVisible ( '.collections-widget', 3000,false ).
    //Verify categories name field is visible
    verify.visible ( ".collections-widget" ).
    pause ( 3000 ).
    //clear the text in the category field
    clearValue ( ".collections-widget > input" ).
    //Enter the categories name
    setValue ( ".collections-widget > input", categoryName ).
    pause ( 3000 ).    
    verify.visible ( ".suggestion-list-wrap > div:nth-child( 1 ) > div:nth-child( 1 ) > span:nth-child( 1 )" ).
    //click on the category name from the list
    click ( ".suggestion-list-wrap > div:nth-child( 1 ) > div:nth-child( 1 ) > span:nth-child( 1 )" ).
    pause ( 3000 ).    
    //Clear the Short Note data in the field
    clearValue ( "textarea[  ng-model='artifact.note' ]" ).
    //Click on the Short Note data in the field
    setValue ( "textarea[  ng-model='artifact.note' ]", shortNote ).
    pause ( 3000 ).
    verify.visible ( "a.btn-active" ).
    pause ( 3000 ).
    //Click on the Save button
    click ( "a.btn-active" ).
    pause ( 3000 ).
  //Check Thumbnail ADD and Delete    
  waitForElementVisible ( ".uploaded-image-container", 9000, false ).
  pause ( 3000 ).
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
  pause ( 3000 ).
  //Click on the Save button
  click ( "a.btn-active" ).
  pause ( 3000 ).
  //Check and click Distribution Tab
  verify.visible ( ".video-tabs a[ href='#distribution']" ).
  pause ( 3000 ).
  //click on the distribution tab
  click ( ".video-tabs a[ href='#distribution']" ).
  pause ( 3000 ).useXpath ( ).  
  //verify and click on the videoe menu in CONTENT
  verify.containsText ( "//ul/li/a[ text( ) = 'Videos']" , "Videos" ).
  pause ( 3000 ).
  //Click on the videos menu in CONTENT
  click ( "//ul/li/a[ text( ) = 'Videos']" ).
  useCss ( ).pause ( 3000 )  
  return this;
};