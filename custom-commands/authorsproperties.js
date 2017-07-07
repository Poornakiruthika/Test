//this function is for check and add properties in Authors,Attributions
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var result = [ ];
exports.command = function ( ShortTitle, ShortDesc, CategoryName, contentNote, dragImg ) {  
  //Verify the properties tab
  this.verify.visible ( ".video-tabs > a[ href='#properties']" ).
  pause ( 3000 ).
  //Click on the Properties Tab
  click ( ".video-tabs > a[ href='#properties']" ).
  pause ( 3000 ).
  //Verify the short Title
  verify.visible ( "textarea[ ng-model='artifact.shortName']" ).
  pause ( 3000 ).
  //Clear the Short Title in the field
  clearValue ( "textarea[ ng-model='artifact.shortName']" ).
  pause ( 3000 ).
  //Enter the Short Tile in the Field
  setValue ( "textarea[ ng-model='artifact.shortName']", ShortTitle ).
  pause ( 3000 ).
  //Verify the Short Description
  verify.visible ( "textarea[ ng-model='artifact.shortDescription']" ).
  pause ( 3000 ).
  //Clear the Short Description in the Filed
  clearValue ( "textarea[ ng-model='artifact.shortDescription']" ).
  pause ( 3000 ).
  //Enter the Short Description 
  setValue ( "textarea[ ng-model='artifact.shortDescription']", ShortDesc ).
  pause ( 3000 ).
  //Wait and verify the Categories field
  waitForElementVisible ( '.collections-widget', 3000, false ).
  pause ( 3000 ).
  verify.visible ( ".collections-widget" ).
  pause ( 3000 ).
  //Clear the Categories in the field
  clearValue ( ".collections-widget > input" ).
  pause ( 3000 ).
  //Enter the Categories in the field
  setValue ( ".collections-widget > input", CategoryName ).
  pause ( 3000 ). 
  //Enter key the Categories list 
  keys ( this.Keys.ENTER ).
  pause ( 3000 ).  
  //Clear the Short Notes
  clearValue ( "textarea[ ng-model='artifact.note']" ).
  pause ( 3000 ).
  //Enter the Short Notes
  setValue ( "textarea[ ng-model='artifact.note']", contentNote ).
  pause ( 3000 ).
  setValue ( 'span.hidden-input:nth-child( 1 ) > input:nth-child( 1 )', require ( 'path' ).resolve ( dragImg ) ).
  pause ( 7000 ).
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
  pause ( 3000 ).
  //Click on the Save Button
  click ( "a.btn-active" ).
  pause ( 3000 ).
  //Verify the Distribution Tab
  verify.visible ( ".video-tabs a[ href='#distribution']" ).
  pause ( 3000 ).
  //Click on the Distribution Tab
  click ( ".video-tabs a[ href='#distribution']" ).
  pause ( 3000 )
  return this;
};