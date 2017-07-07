var xlsx = require ('xlsx');
var fs = require ('fs');
var Excel = require ('exceljs');
var workbook1 = new Excel.Workbook();
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile('boxxspring.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets [ 'authors' ];
var authorTitle = [ ];
var authorDescription = [ ];
var authorShortTitle = [ ];
var authorShortDesc = [ ];
var authorCategoryName = [ ];
var authorNote = [ ];
var authorImg = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;



module.exports = {
tags: ['authors'],
  before: function ( browser ) {
    var profile = browser.globals.profile;
    //browser.resizeWindow ( 1600, 900 );
    //browser.maximizeWindow();
    browser.login ( profile.portalUri,profile.username,profile.password );
  },

'Create Authors in CONTENT': function ( client ) {

    for ( z in worksheet ) {
        if ( z[ 1 ] === '!' ) continue;
            //Read authors Title
            if ( z.includes ( 'A' ) ) {
                authorTitle.push ( worksheet[ z ].v );
            }
            //Read authors Description
            if ( z.includes ( 'B' ) ) {
                authorDescription.push ( worksheet[ z ].v );
            }
            //Read Short Title
            if ( z.includes ( 'C' ) ) {
                authorShortTitle.push ( worksheet [ z ].v );
            }
            //Read Short Description
            if ( z.includes ( 'D' ) ) {
                authorShortDesc.push ( worksheet [ z ].v );
            }
            //Read authors category Name
            if ( z.includes ( 'E' ) ) {
                authorCategoryName.push ( worksheet [ z ].v );
            }
            //Read authors Note
            if ( z.includes ( 'F' ) ) {
                authorNote.push ( worksheet [ z ].v) ;
            }
            //Read authors Image
            if ( z.includes ( 'G' ) ) {
                authorImg.push ( worksheet [ z ].v );
            }
            
            
}

    if ( authorTitle.length > 1 ) {
    	console.log("Length:",+authorTitle.length)
            
                var j=1;
                client.pause ( 9000 ).
                
               useXpath().
               verify.containsText ( "//ul/li/a[ text() = 'Authors']","Authors" ).
               pause(3000).
click ( "//ul/li/a[ text() = 'Authors']" ).
useCss().
                   //click ( "ng-transclude > div .sidenav > li:nth-child( 6 ) > a" ).    
                   pause(9000).         
                     
               getText ( '.content-count > strong', function ( currentCountResult ) {
                    if ( currentCountResult.status !== -1 ) {
                        currentCount = currentCountResult.value;
                        currentCount =currentCount.substring (1, currentCount.length-1);
                        console.log ( 'Count - Before adding an Authors: ' +currentCount );
                    }
                for ( var i=1;i<authorTitle.length;i++ ) { 
                	client.waitForElementVisible ( ".btn-add", 9000,false ).
            pause(10000).
            click (".btn-add").
               
                pause(9000)          
          	console.log ( 'Count - I: ' +i );
          client.pause(9000). 
          verify.visible(".video-tabs > a[ href='#content']").
  click(".video-tabs > a[ href='#content']").
  pause(9000).
            //Check and Enter authors Title
            waitForElementVisible ( ".text-input-headline", 9000,false ).
            setValue ( ".text-input-headline", authorTitle [ i ] ).
            pause ( 9000 ).
            
            //Check and Enter authors Text Description
            waitForElementVisible ( ".wmd-input", 9000,false ).
            clearValue ( ".wmd-input" ).
            setValue ( ".wmd-input", authorDescription [ i ] ).
            pause ( 9000 ).
            
            //Check and click Save button
            waitForElementVisible ( '.btn-active', 9000,false ).
            verify.visible ( ".btn-active" ).
            pause ( 9000 ).
            click ( ".btn-active" ).
            pause ( 10000 ).            
            authorsproperties ( authorShortTitle[ i ], authorShortDesc[ i ],authorCategoryName[ i ], authorNote[ i ],authorImg[ i ], currentCount ).
            pause(9000).
       useXpath().
               verify.containsText ( "//ul/li/a[ text() = 'Authors']","Authors" ).
               pause(3000).
click ( "//ul/li/a[ text() = 'Authors']" ).
useCss().
pause(9000).
            getText ( '.content-count > strong', function ( actualCountResult ) {
              if ( actualCountResult.status !== -1 ) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                console.log( 'Count - After adding an Authors: ' + actualCount );
                expectedCount = ( ( +currentCount ) + ( +1 ) );
                console.log ( 'Count - incemented by 1 in Authors: ' + expectedCount );
                  if ( actualCount == expectedCount ) {
                  console.log ( "Actual and Expected counts are equal" );
                  client.writeToExcelPass ( 'boxxspring.xlsx', 'authors', ++j, 9,10 );
            
                }
                else {
                  console.log ( "if Failed" );
                  client.writeToExcelFail ( 'boxxspring.xlsx', 'authors', ++j, 9,10, actualCount, expectedCount );
                }

              }
            });
            
                
                 if ( i < authorTitle.length - 1 ) {
              client.getText ( '.content-count > strong', function ( currentCountResult ) {
                if ( currentCountResult.status !== -1 ) {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring ( 1, currentCount.length - 1 );
                  console.log ( 'Count - New Authors : ' + currentCount )
                }
                
              });
            }
       


             }
        });
     }
            client.end();
    
//client.pause ( 5000 ).
        //sendMail(result);
  }
};