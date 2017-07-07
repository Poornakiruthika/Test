//this function is for check and add properties in categories 
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var result = [];
exports.command = function ( categoryShortTitle , categoryShortDesc , categoryName , categoryNote , categoryImg , currentCount ) {
  this.pause ( 3000 ). 
  //Verify the properties tab is visible
  verify.visible ( ".video-tabs > a[ href='#properties']" ).
  //Click on the Properties Tab
  click ( ".video-tabs > a[ href='#properties']" ).
  pause ( 3000 ).
  //Verify Short Title is visible
  verify.visible ( "textarea[ ng-model='artifact.shortName']" ).
  //Clear the Short Title
  clearValue ( "textarea[ ng-model='artifact.shortName']" ).
  //Enter the Short Title
  setValue ( "textarea[ ng-model='artifact.shortName']", categoryShortTitle ).
  //Verify the short description is visible
  verify.visible ( "textarea[ ng-model='artifact.shortDescription']" ).
  //Clear the Short Description
  clearValue ( "textarea[ ng-model='artifact.shortDescription']" ).
  //Enter the Short Description
  setValue ( "textarea[ ng-model='artifact.shortDescription']", categoryShortDesc ).
  pause ( 3000 ).
  //Wait and Verify categories Field is visible
  waitForElementVisible ( '.collections-widget', 3000,false ).
  verify.visible ( ".collections-widget" ).
  pause ( 3000 ).
  //clear the categories Name in the field
  clearValue ( ".collections-widget > input" ).
  //Enetr the categories Name
  setValue ( ".collections-widget > input" , categoryName ).
  pause ( 3000 ). 
  //Verify categories Field is visible
  verify.visible ( ".suggestion-list-wrap > div:nth-child( 1 ) > div:nth-child( 1 ) > span:nth-child( 1 )" ).
  //click on the categories name in list
  click ( ".suggestion-list-wrap > div:nth-child( 1 ) > div:nth-child( 1 ) > span:nth-child( 1 )" ).
  pause ( 3000 ).  
  //Clear the Short Notes
  clearValue ( "textarea[ ng-model='artifact.note']" ).
  //Enter the short Notes
  setValue ( "textarea[ ng-model='artifact.note']", categoryNote ).
  pause ( 3000 ).
  //Check Thumbnail ADD and Delete  
  setValue ( 'span.hidden-input:nth-child( 1 ) > input:nth-child( 1 )', require ( 'path' ).resolve ( dragImg ) ).
  pause ( 7000 ).
  //Check Thumbnail ADD and Delete
  waitForElementVisible ( ".uploaded-image-container", 9000, false ).
  pause ( 4000 ).
  getAttribute ( ".uploaded-image", "src", function ( imageCheck ) {
    var imageValue = imageCheck.value;
    var imageStatus = imageCheck.status;
    if ( imageStatus === 0 ) {
      this.pause ( 4000 ).
      verify.visible ( " .content-menu > li:nth-child( 3 ) > a:nth-child( 1 )" ).
      pause ( 4000 ).
      click ( ".content-menu > li:nth-child( 3 ) > a:nth-child( 1 )" ).
      pause ( 4000 ).
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
  click ( "a.btn-active" ).
  pause ( 3000 ).  
  //Check and click Distribution Tab
  verify.visible ( ".video-tabs a[ href='#distribution']" ).
  //click on the distribution tab
  click ( ".video-tabs a[ href='#distribution']" ).
  pause ( 3000 )
  return this;
};