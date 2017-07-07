var xlsx = require ('xlsx');
var fs = require ('fs');
var Excel = require ('exceljs');
var workbook1 = new Excel.Workbook();
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile('boxxspring.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets [ 'deleteContents' ];
var menuSelection = [ ];
var storyTitle = [ ];
var storyEditTitle = [ ];
var storyShortDesc = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
var addedCount;
var searchCount;
var i,j=0;


module.exports = {
  tags: ['deletearticles'],
  before: function ( browser ) {
    var profile = browser.globals.profile;
    browser.resizeWindow ( 1600, 900 );
    browser.maximizeWindow();
    browser.login ( profile.portalUri,profile.username,profile.password );  },

'Create Authors in CONTENT': function ( client ) {

    for ( z in worksheet ) {
        if ( z[ 0 ] === '!' ) continue;
            //Read authors Title
            if ( z.includes ( 'A' ) ) {
                menuSelection.push ( worksheet[ z ].v );
                console.log ( worksheet[ z ].v );
            }
            //Read story title
            if ( z.includes ( 'B' ) ) {
                storyTitle.push ( worksheet[ z ].v );
                console.log ( worksheet[ z ].v );
            }
            //Read Short Title
            if ( z.includes ( 'C' ) ) {
                storyEditTitle.push ( worksheet [ z ].v );
                console.log ( worksheet[ z ].v );
            }
            //Read Short Description
            if ( z.includes ( 'D' ) ) {
                storyShortDesc.push ( worksheet [ z ].v );
                console.log ( worksheet[ z ].v );
            }
            
                       
            
}

    if ( storyTitle.length > 0 ) {
      console.log("Length:",+storyTitle.length)
            
                client.pause ( 9000 ).
                
               useXpath().
               pause(7000).
               verify.containsText ( "//ul/li/a[ text() = 'Articles']","Articles").
               pause(3000).
click ( "//ul/li/a[ text() = 'Articles']" ).
useCss().


//verify.containsText ( "//ul/li/a[ contains(.,'"+menuSelection[i]+"')]",+menuSelection[i]).
              // pause(3000).
///click ( "//ul/li/a[ contains(.,'"+menuSelection[i]+"')]" ).
                   //click ( "ng-transclude > div .sidenav > li:nth-child( 6 ) > a" ).    
                   pause(9000).       
                     
               getText ( '.content-count > strong', function ( currentCountResult ) {
                    if ( currentCountResult.status !== -1 ) {
                        currentCount = currentCountResult.value;
                        currentCount =currentCount.substring (1, currentCount.length-1);
                        console.log ( 'Count - Before adding an Articles: ' +currentCount );
                    }});
                for ( var i=0;i<storyTitle.length;i++ ) { 
                  client.waitForElementVisible ( ".btn-add", 9000,false ).
            pause(10000).
            click (".btn-add").
               
                pause(9000).  
                //Check and click Template
            waitForElementVisible ( ".asc", 9000 ).
            click ( ".asc" )
            console.log ( 'Count - I: ' +i );
          client.pause(9000). 
          verify.visible(".video-tabs > a[ href='#content']").
  click(".video-tabs > a[ href='#content']").
  pause(9000).
            //Check and Enter authors Title
            waitForElementVisible ( ".text-input-headline", 9000,false ).
            setValue ( ".text-input-headline", storyTitle [ i ] ).
            pause ( 9000 ).
            
                        
            //Check and click Save button
            waitForElementVisible ( '.btn-active', 9000,false ).
            verify.visible ( ".btn-active" ).
            pause ( 9000 ).
            click ( ".btn-active" ).
            pause ( 10000 ).     
verify.visible(".video-tabs > a[ href='#properties']").
  click(".video-tabs > a[ href='#properties']").
  pause(7000).
            verify.visible("textarea[ ng-model='artifact.shortDescription']").
  clearValue("textarea[ ng-model='artifact.shortDescription']").
  setValue("textarea[ ng-model='artifact.shortDescription']", storyShortDesc[i]).
  pause(9000)



       
  //Check and click save button
  client.verify.visible(".btn-active").
  click(".btn-active").
  pause(12000).
  useXpath().
               verify.containsText ( "//ul/li/a[ text() = 'Articles']","Articles").
               pause(7000).
click ( "//ul/li/a[ text() = 'Articles']" ).
useCss().
pause(9000).
                  pause(10000).
      waitForElementVisible(".content-count>strong",5000).
   verify.visible(".content-count>strong").
       getText ( '.content-count > strong', function ( currentCountResult ) {
                    if ( currentCountResult.status !== -1 ) {
                        addedCount = currentCountResult.value;
                        addedCount =addedCount.substring (1, addedCount.length-1);
                        console.log ( 'Count - After adding an Articles: ' +addedCount );
                    }});
                
     
client.pause(9000).waitForElementVisible(".search-field-input",5000).
     assert.visible(".search-field-input").

    setValue(".search-field-input",storyTitle[i]).
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
                        console.log ( 'Searched Article Count: ' +searchCount );
                    }
                    if ( searchCount > 0 ) {

                        console.log ( 'After If Statement Searched Article Count: ' +searchCount );

client.waitForElementVisible ( ".btn-pullout", 9000,false ).
moveToElement(".btn-pullout",0,0).
            pause(9000).
            click (".btn-pullout").
            pause(7000).
            
verify.visible(".video-tabs > a[ href='#content']").
  click(".video-tabs > a[ href='#content']").
  pause(9000).
            //Check and Enter authors Title
            waitForElementVisible ( ".text-input-headline", 9000,false ).
                        clearValue ( ".text-input-headline" ).
            pause ( 9000 ).

            setValue ( ".text-input-headline", storyEditTitle [ i ] ).
            pause ( 9000 ).
            
                        
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
               verify.containsText ( "//ul/li/a[ text() = 'Articles']","Articles" ).
               pause(9000).
click ( "//ul/li/a[ text() = 'Articles']" ).
useCss().

pause(9000).
      waitForElementVisible( ".content-count>strong", 9000 ).
      assert.visible(".content-count>strong").
       getText ( '.content-count > strong', function ( actualCountResult ) {
              if ( actualCountResult.status !== -1 ) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                console.log( 'Count - After adding an Authors: ' + actualCount );
                console.log ( 'Count - incemented by 1 in Authors: ' + currentCount );
                
                if ( actualCount == currentCount ) {
                  console.log ( "Actual and Expected counts are equal" );
                  client.writeToExcelPass ( 'boxxspring.xlsx', 'deleteContents', ++j, 7,8 );
                 
                }
                else {
                  console.log ( "if Failed" );
                  client.writeToExcelFail ( 'boxxspring.xlsx', 'deleteContents', ++j, 7,8, actualCount, currentCount );
                }

              }
            });
            
     }
     else{
console.log ( 'Count - Search Result : ' + searchCount )
   client.writeToExcelFailSearch ( 'boxxspring.xlsx', 'deleteContents', ++j, 7,8,searchCount );
     }
});
  }
            }               
     
                
//client.pause ( 5000 ).
        //sendMail(result);
        client.end();
  }
};