//this function is for check and add properties in Video URL
var Excel = require ( 'exceljs-rtl' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' )  XLSX = require ( 'xlsx' );
var result = [];
exports.command = function ( videoTitle , shortTitle , shortDesc , author , attribution , categoryName , shortNote , dragImg , currentCount )  {
  this.pause ( 3000 ).
  click ( ".edit-form > div >.btn-primary" ).
  pause ( 3000 ).
  //Edit the title
  waitForElementVisible ( '.container-head > text-field > input' , 3000 , false ) 
  this.pause ( 3000 ).
  //Verify the Video title field is visbile
  verify.visible ( ".container-head > text-field > input" ).
  //Clear the Video title data in field
  clearValue ( '.container-head > text-field > input' ).
  //Enter the Video title data in field
  setValue ( '.container-head > text-field > input' , videoTitle ).
  //Check video player
  waitForElementVisible ( '.player-container >.preview-embed' , 3000 , false ).
  pause ( 3000 ).
  //Verify the Preview embed field is visbile
  verify.visible ( ".player-container >.preview-embed" ).
  //Check the title display is visible
  verify.visible ( ".edit-form > section >.input-headline-min" ).
  //Check the description display is visible
  verify.visible ( ".edit-form > section >.input-description-min" ).
  //Verify the properties tab is visible
  verify.visible ( ".video-tabs > a[ href='#properties']" ).
  pause ( 3000 ).
  //Click the properties tab
  click ( ".video-tabs > a[ href='#properties']" ).
  pause ( 3000 ).
  //Check and enter short name
  verify.visible ( "textarea[ ng-model='artifact.shortName']" ).
  //Clear the Short Name data in field
  clearValue ( "textarea[ ng-model='artifact.shortName']" ).
  //Enter the Short Name data in field
  setValue ( "textarea[ ng-model='artifact.shortName']", shortTitle ).
  //Check and enter short description
  verify.visible ( "textarea[ ng-model='artifact.shortDescription']" ).
  //Clear the Short description data in field
  clearValue ( "textarea[ ng-model='artifact.shortDescription']" ).
  //Enter the Short description data in field
  setValue ( "textarea[ ng-model='artifact.shortDescription']", shortDesc ).
  pause ( 3000 ).
  //Check the Authors field is visible
  verify.visible ( ".attribution-container>a[ng-click='showAddAuthor()']" ).
  //Click on the Authors dropdown
  click ( ".attribution-container>a[ng-click='showAddAuthor()']" ).
  pause ( 3000 ).useXpath( ).
  //verify.visible ( ".container > dialog-include:nth-child( 3 ) > dialog:nth-child( 1 ) > section:nth-child( 1 ) > form:nth-child( 2 ) > fieldset:nth-child( 1 ) > input:nth-child( 1 )" ).
  verify.visible('//input[@placeholder ="Search authors"]').
  pause ( 3000 ).
  //Enter the author name in the search field
  //setValue ( ".container > dialog-include:nth-child( 3 ) > dialog:nth-child( 1 ) > section:nth-child( 1 ) > form:nth-child( 2 ) > fieldset:nth-child( 1 ) > input:nth-child( 1 )" , author.trim() ).
  setValue('//input[@placeholder ="Search authors"]',author.trim()).
  pause ( 3000 ).useXpath ( ).
  //Click on the Authors dropdown option
  click ( "//ul/li/a/span[ text ( ) = '"+ author.trim() +"']" ).
  pause ( 3000 ).useCss ( ).
  //Select Attribution
  getValue ( ".add-icon > i:nth-child( 1 )", function ( attributeValue )  {
    var attributeValueset = attributeValue.value;
    if ( attributeValueset === null )  {
      this.pause ( 3000 ).
      //Check the attribution field is visible
      verify.visible ( ".attribution-container>a[ng-click='showAddAttribution()']" ).
      //Click on the attribution dropdown option
      click ( ".attribution-container>a[ng-click='showAddAttribution()']" ).
      pause ( 3000 ).useXpath ( ).
      //Enter the attribution name in the search field
       setValue('//input[@placeholder ="Search attributions"]',attribution.trim( )).
      //setValue ( ".container > dialog-include:nth-child( 3 ) > dialog:nth-child( 1 ) > section:nth-child( 1 ) > form:nth-child( 2 ) > fieldset:nth-child( 1 ) > input:nth-child( 1 )" , attribution.trim() ).
      pause ( 3000 ).      
      //Click on the attribution dropdown option
      click ( "//ul/li/a/span[contains(.,'"+ attribution.trim( ) +"')]" ).
      pause ( 3000 ).useCss ( ) 
    }
    else {
      console.log ( "Attribution is already Exists" );
      workbook1.xlsx.readFile ( 'boxxspring.xlsx' , {
          cellStyles: true
        } ) 
       .then ( function ( )  {
          var worksheet1 = workbook1.getWorksheet ( 'VideourlEdit' );
          var row = worksheet1.getRow ( excelColumnn );
          row.getCell ( 14 ).font = {
            bold: true,
            color: {
              argb: '1B29F3'
            }
          };
          row.alignment = {
            wrapText: true
          }
          row.getCell ( 14 ).value = "Attribution is already Exists";
          result.push ( 'PASS' );
          for ( var col = 1; col < 50; col++ )  {
            worksheet1.getColumn ( col ).hidden = false;
            for ( var rows = 1; rows < 50; rows++ )  {
              worksheet1.getRow ( rows ).hidden = false;
            }
          }
          workbook1.xlsx.writeFile ( 'boxxspring.xlsx' );
          row.commit ( );
        } );
    }
  } );
    //Check categories
    this.waitForElementVisible ( '.collections-widget', 5000,false ).
    verify.visible ( ".collections-widget" ).
    pause ( 3000 ).
    clearValue ( ".collections-widget > input" ).
    setValue ( ".collections-widget > input", categoryName ).
    pause ( 3000 ).    
    verify.visible ( ".suggestion-list-wrap > div:nth-child( 1 )  > div:nth-child( 1 ) " ).
    click ( ".suggestion-list-wrap > div:nth-child( 1 )  > div:nth-child( 1 ) " ).    
    //Check and add note
    verify.visible ( "textarea[ ng-model='artifact.note']" ).
    pause ( 7000 ).
    clearValue ( "textarea[ ng-model='artifact.note']" ).
    setValue ( "textarea[ ng-model='artifact.note']" , shortNote ).
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
      pause ( 7000 )
    }    
    else {
    }
  } );  
  //Check and click save button
  this.verify.visible ( "a.btn-active" ).
  click ( "a.btn-active" ).
  pause ( 3000 ).useXpath ( ).  
  //Verify the Videos menu in CONTENT is visible
  verify.containsText ( "//ul/li/a[ text( ) = 'Videos']" , "Videos" ).
  pause ( 3000 ).
  //Click on the Videos menu in CONTENT is visible
  click ( "//ul/li/a[ text( ) = 'Videos']" ).
  useCss ( ).pause ( 3000 ) 
  return this;
};