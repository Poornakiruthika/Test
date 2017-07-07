var xlsx = require ('xlsx');
var fs = require ('fs');
var Excel = require ('exceljs');
var workbook1 = new Excel.Workbook();
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile('boxxspring.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets [ 'deleteauthors' ];
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
var i,j=1;


module.exports = {
  tags: ['deleteauthors'],
  before: function ( browser ) {
    var profile = browser.globals.profile;
    //browser.resizeWindow ( 1600, 900 );
    //browser.maximizeWindow();
    browser.login ( profile.portalUri,profile.username,profile.password );  },

'Delete Authors in CONTENT': function ( client ) {

    for ( z in worksheet ) {
        if ( z[ 1 ] === '!' ) continue;
            
            //Read story title
            if ( z.includes ( 'A' ) ) {
                authorTitle.push ( worksheet[ z ].v );
                console.log ( worksheet[ z ].v );
            }
            //Read Short Edit Title
            if ( z.includes ( 'B' ) ) {
                authorEditTitle.push ( worksheet [ z ].v );
                console.log ( worksheet[ z ].v );
            }
            //Read Short Description
            if ( z.includes ( 'C' ) ) {
                storyShortDesc.push ( worksheet [ z ].v );
                console.log ( worksheet[ z ].v );
            }
            
                       
            
}

    if ( authorTitle.length > 1 ) {
      console.log("Length:",+authorTitle.length)
            
                client.pause ( 9000 ).
                
               useXpath().
               pause(7000).
               verify.containsText ( "//ul/li/a[ text() = 'Authors']","Authors").
               pause(3000).
click ( "//ul/li/a[ text() = 'Authors']" ). useCss().
pause(12000).
waitForElementVisible(".content-count>strong",9000,false).
pause(7000).
   verify.visible(".content-count>strong").
       getText ( '.content-count > strong', function ( currentCountResult ) {
                    if ( currentCountResult.status !== -1 ) {
                        currentCount = currentCountResult.value;
                        currentCount =currentCount.substring (1, currentCount.length-1);
                        console.log ( 'first Authors Count: ' +currentCount );
                    }});
                for ( var i=1;i<authorTitle.length;i++ ) { 
                  client.pause(9000).
                  useCss().
waitForElementVisible ( ".btn-add", 9000,false ).
            pause(10000).
            click(".btn-add").
            //moveToElement (".btn-add", 0 , 0 ).
            //pause(9000).
           //Check and click Add categories Button
           /*useXpath().                                               
           click("//ul[@class='dropdown-submenu']//a[contains(.,'"+authorType[i].trim()+"')]").     
           useCss().*/

           pause(10000)
                           console.log ( "Count - I: " +i );
          client.pause(12000). 
          //Check and Enter Authors Title               
verify.visible(".video-tabs > a[ href='#properties']").
  click(".video-tabs > a[ href='#properties']").
  pause(9000).
  verify.visible(".text-input-headline").
  clearValue(".text-input-headline").
  pause(7000).
  setValue(".text-input-headline", authorTitle[i]).
  pause(9000).
            verify.visible("textarea[ ng-model='artifact.shortDescription']").
  clearValue("textarea[ ng-model='artifact.shortDescription']").
  setValue("textarea[ ng-model='artifact.shortDescription']", storyShortDesc[i]).
  pause(9000).

      
  //Check and click save button
  verify.visible(".btn-active").
  click(".btn-active").
  pause(12000).
  useXpath().
               verify.containsText ( "//ul/li/a[ text() = 'Authors']","Authors").
               pause(7000).
click ( "//ul/li/a[ text() = 'Authors']" ).
useCss().
 pause(10000).
      waitForElementVisible(".content-count>strong",9000,false).
      verify.visible(".content-count>strong").
  pause(9000).
       getText ( '.content-count > strong', function ( currentCountResult ) {
                    if ( currentCountResult.status !== -1 ) {
                        addedCount = currentCountResult.value;
                        addedCount =addedCount.substring (1, addedCount.length-1);
                        console.log ( 'Count - After adding an Authors: ' +addedCount );
                    }});
                
     
client.pause(9000).
waitForElementVisible(".search-field-input",5000).
     assert.visible(".search-field-input").

    setValue(".search-field-input",authorTitle[i]).
//input[type=text]:-ms-clear {
   // display: none;}
    keys(client.Keys.ENTER). // hold the control
   click(".search-field-input").
   keys(client.Keys.NULL). // release the control
   pause(10000).
      waitForElementVisible(".content-count>strong",5000).
   verify.visible(".content-count>strong").
       getText ( '.content-count > strong', function ( currentCountResult ) {
                    if ( currentCountResult.status !== -1 ) {
                        searchCount = currentCountResult.value;
                        searchCount =searchCount.substring (1, searchCount.length-1);
                        console.log ( 'Searched Categories Count: ' +searchCount );
                    }
                    if ( searchCount > 0 ) {

console.log ( 'After If Statement Searched Authors Count: ' +searchCount );
client.waitForElementVisible ( " li.content-container:nth-child(1) > ng-include:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > a:nth-child(1) > h2:nth-child(1)", 9000,false ).
//moveToElement("li.content-container:nth-child(1) > ng-include:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1) > span:nth-child(2)",0,0).
            pause(9000).
            click ("li.content-container:nth-child(1) > ng-include:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > a:nth-child(1) > h2:nth-child(1)").
            pause(10000).
            //Check and Enter Category Title
            waitForElementVisible ( ".video-tabs > a[ href='#properties']", 9000,false ).
            verify.visible(".video-tabs > a[ href='#properties']").
            pause(7000).
  click(".video-tabs > a[ href='#properties']").
  pause(9000).
            verify.visible(".text-input-headline").
  clearValue(".text-input-headline").
  pause(7000).
  setValue(".text-input-headline", authorEditTitle[i]).
  pause(9000).
        
                        
            //Check and click Save button
            waitForElementVisible ( '.btn-active', 9000,false ).
            verify.visible ( ".btn-active" ).
            pause ( 9000 ).
            click ( ".btn-active" ).
            pause ( 10000 ).
             //Check and Click Delete Button.
  verify.visible(".btn-delete  > span[ ng-click='showDeleteVerification();']").
  click(".btn-delete  > span[ ng-click='showDeleteVerification();']").
  pause(5000).
  //Check the existance of delete confirmation dialog
  verify.visible("dialog[ name=deleteVerification ]").
  pause(5000).
  //Click Cancel Button in Delete Dialog
  verify.visible(".link-secondary").
  click(".link-secondary").
  pause(5000).   
  verify.visible(".btn-delete  > span[ ng-click='showDeleteVerification();']").
  click(".btn-delete  > span[ ng-click='showDeleteVerification();']").
  pause(7000).
  //Check the existance of delete confirmation to delete
  verify.visible("dialog[ name=deleteVerification ]").
verify.visible("button.btn:nth-child(2)").pause(7000).
  click("button.btn:nth-child(2)").

pause(10000).
useXpath().
               verify.containsText ( "//ul/li/a[ text() = 'Authors']","Authors" ).
               pause(9000).
click ( "//ul/li/a[ text() = 'Authors']" ).
useCss().

pause(9000).
      waitForElementVisible( ".content-count>strong", 9000 ).
      assert.visible(".content-count>strong").
       getText ( '.content-count > strong', function ( actualCountResult ) {
              if ( actualCountResult.status !== -1 ) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                console.log( 'Count - After adding an Videos: ' + actualCount );
                 expectedCount = ( ( +addedCount ) - ( 1 ) );
                console.log ( 'Count - incemented by 1 in Videos: ' + expectedCount );
                
                if ( actualCount == expectedCount ) {
                  console.log ( "Actual and Expected counts are equal" );
                  client.writeToExcelPass ( 'boxxspring.xlsx', 'deleteCategories', ++j, 5,6 );
                 
                }
                else {
                  console.log ( "if Failed" );
                  client.writeToExcelFail ( 'boxxspring.xlsx', 'deleteauthors', ++j, 5,6, actualCount, expectedCount );
                }

              }
            });
   }         
     else{
console.log ( 'Count - Search Result : ' + searchCount )
   client.writeToExcelFailSearch ( 'boxxspring.xlsx', 'deleteauthors', ++j, 5,6,searchCount );
     }
});
  }
            }             
     else{
                  console.log ( "Ovaer all Failed not entered" );


     }
         //client.pause ( 5000 ).
      //sendMail(result);
            

        client.end();
  }
};