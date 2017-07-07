//this function is for check and add properties in Edit videos 
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
var result = [ ];
var rowCount = 1;
exports.command = function ( videoTitle , shortTitle , shortDesc , author , attribution , categoryName , shortNote , dragImg , currentCount ) {
  this.pause ( 3000 ).
  waitForElementVisible ( ".text-input-headline", 3000, false ).
  //Clear the Video Title in the field
  clearValue ( ".text-input-headline" ).
  //Enter the Video Title
  setValue ( ".text-input-headline", videoTitle ).
  pause ( 3000 ).
  //Verify the Properties Tab
  verify.visible ( ".video-tabs > a[ href='#properties' ]" ).
  //Click on the Properties Tab
  click ( ".video-tabs > a[ href='#properties']" ).
  pause ( 3000 ).
  //Check the Short Title
  clearValue ( "text-field[ ng-model='artifact.shortName' ]" ).
  setValue ( "text-field[ ng-model='artifact.shortName' ]", shortTitle ).
  pause ( 3000 ).
  //Verify the short description
  verify.visible ( "textarea[ ng-model='artifact.shortDescription' ]" ).
  //Clear the Short Description
  clearValue ( "textarea[ ng-model='artifact.shortDescription' ]" ).
  //Enter the Short Description
  setValue ( "textarea[ ng-model='artifact.shortDescription' ]", shortDesc ).
  pause ( 3000 ).
  //Select Author in the searched list
  verify.visible ( ".attribution-container >a[ng-click='showAddAuthor()']" ).
  //Click on the Author Field
  click ( ".attribution-container >a[ng-click='showAddAuthor()']" ).
  pause ( 3000 ).useXpath ( ).
  //Enter the Author Name in the search field
  setValue ( '//input[@placeholder ="Search authors"]',author.trim() ).
  pause ( 3000 ).  
  //Click on the Searched Author Name
  click ( "//ul/li/a/span[ contains(.,'"+ author.trim( ) +"') ]" ).
  pause ( 3000 ).
  useCss ( ).
  //Select Attribution in the list
  getValue ( ".attribution-container > p.name.ng-binding", function ( attributeValue ) {
    var attributeValueset = attributeValue.value;
    if ( attributeValueset === null ) {
      this.verify.visible ( ".attribution-container > a[ng-click='showAddAttribution()']" ).
      click ( ".attribution-container > a[ng-click='showAddAttribution()']" ).
      pause ( 3000 ).useXpath ( ).
      setValue ( '//input[@placeholder ="Search attributions"]', attribution.trim( ) ).
      pause ( 3000 ).      
      click ( "//ul/li/a/span[contains(.,'"+ attribution.trim( ) +"')]" ).
      pause ( 3000 ).
      useCss ( )
    }
    else {      
      workbook1.xlsx.readFile ( 'boxxspring.xlsx', {
          cellStyles: true
        } )
        .then ( function (  ) {
          var worksheet1 = workbook1.getWorksheet ( 'VideourlEdit' );
          var row = worksheet1.getRow ( ++rowCount );
          row.getCell ( 15 ).font = {
            bold: true,
            color: {
              argb: '1B29F3'
            }
          };
          row.alignment = {
            wrapText: true
          }
          row.getCell ( 15 ).value = "Case Passed: Attribution is already Exists";
          result.push ( 'Case Passed' );
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
  //Wait and Verify the categories Name
  this.waitForElementVisible ( '.collections-widget', 3000, false ).
  verify.visible ( ".collections-widget" ).
  pause ( 3000 ).
  //Clear the Categories Name
  clearValue ( ".collections-widget > input" ).
  //Enter the Categories Name
  setValue ( ".collections-widget > input", categoryName.trim ( ) ).
  pause ( 3000 ).  
  //Verify the Categories Name list
  verify.visible ( ".suggestion-list-wrap > div:nth-child( 1 ) > div:nth-child( 1 ) > span:nth-child( 1 )" ).
  //Click on the Categories Name in the list
  click ( ".suggestion-list-wrap > div:nth-child( 1 ) > div:nth-child( 1 ) > span:nth-child( 1 )" ). 
  //Verify the add notes
  verify.visible ( "textarea[ ng-model='artifact.note']" ).
  //Clear the Short Notes
  clearValue ( "textarea[ ng-model='artifact.note']" ).
  //Enter the Short Notes
  setValue ( "textarea[ ng-model='artifact.note']", shortNote ).
  pause ( 3000 ).
  setValue ( 'span.hidden-input:nth-child( 1 ) > input:nth-child( 1 )', require ( 'path' ).resolve ( dragImg ) ).
  pause ( 12000 ).
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
  this.pause ( 3000 ).
  //Verify the save button
  verify.visible ( "a.btn-active" ).
  pause ( 3000 ).
  //Click on the Save Button
  click ( "a.btn-active" ).
  pause ( 3000 )
  return this;
};