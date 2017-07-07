var xlsx = require ('xlsx');
var fs = require ('fs');
var Excel = require ('exceljs');
var workbook1 = new Excel.Workbook();
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile('boxxspring.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets [ 'attributions' ];
var attributionTitle = [ ];
var attributionUrl = [ ];
var attributionDescription = [ ];
var attributionShortTitle = [ ];
var attributionShortDesc = [ ];
var attributionCategoryName = [ ];
var attributionNote = [ ];
var attributionImg = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;



module.exports = {
  tags: ['attributions'],
  before: function ( browser ) {
    var profile = browser.globals.profile;
   // browser.resizeWindow ( 1600, 900 );
    //browser.maximizeWindow();
    browser.login ( profile.portalUri,profile.username,profile.password );
  },

'Links': function ( client ) {

    for ( z in worksheet ) {
        if ( z[ 1 ] === '!' ) continue;
            //Read authors Title
            if ( z.includes ( 'A' ) ) {
                attributionTitle.push ( worksheet[ z ].v );
            }
            //Read authors Description
            if ( z.includes ( 'B' ) ) {
                attributionUrl.push ( worksheet[ z ].v );
            }
            if ( z.includes ( 'C' ) ) {
                attributionDescription.push ( worksheet[ z ].v );
            }
            //Read Short Title
            if ( z.includes ( 'D' ) ) {
                attributionShortTitle.push ( worksheet [ z ].v );
            }
            //Read Short Description
            if ( z.includes ( 'E' ) ) {
                attributionShortDesc.push ( worksheet [ z ].v );
            }
            //Read authors category Name
            if ( z.includes ( 'F' ) ) {
                attributionCategoryName.push ( worksheet [ z ].v );
            }
           
            //Read authors Note
            if ( z.includes ( 'G' ) ) {
                attributionNote.push ( worksheet [ z ].v) ;
            }
            //Read authors Image
            if ( z.includes ( 'H' ) ) {
                attributionImg.push ( worksheet [ z ].v );
            }
            
            
}

    if ( attributionTitle.length > 1 ) {
    	console.log("Length:",+attributionTitle.length)
            
                var j=1;
                client.pause ( 9000 ).
                
               useXpath().
               verify.containsText ( "//ul/li/a[ text() = 'Links']","Links" ).
               pause(3000).
click ( "//ul/li/a[ text() = 'Links']" ).
useCss().
                   //click ( "ng-transclude > div .sidenav > li:nth-child( 6 ) > a" ).    
                   pause(9000).         
                     
               getText ( '.content-count > strong', function ( currentCountResult ) {
                    if ( currentCountResult.status !== -1 ) {
                        currentCount = currentCountResult.value;
                        currentCount =currentCount.substring (1, currentCount.length-1);
                        console.log ( 'Count - Before adding an Links: ' +currentCount );
                    }
                for ( var i=1;i<attributionTitle.length;i++ ) { 
                	client.waitForElementVisible ( ".btn-add", 9000,false ).
            pause(10000).
            click (".btn-add").
               
                pause(9000)          
          	console.log ( 'Count - I: ' +i );
          client.pause(9000). 
          verify.visible(".video-tabs > a[ href='#content']").
  click(".video-tabs > a[ href='#content']").
  pause(9000).
            //Check and Enter attribution Title
            waitForElementVisible ( ".text-input-headline", 9000,false ).
            setValue ( ".text-input-headline", attributionTitle [ i ] ).
            pause ( 9000 ).
            
            //Check and Enter attribution Text Description
            waitForElementVisible ( ".wmd-input", 9000,false ).
            clearValue ( ".wmd-input" ).
            setValue ( ".wmd-input", attributionDescription [ i ] ).
            pause ( 9000 ).
            //Check and Enter attribution URL

            waitForElementVisible ( "#attribution_provider_url", 9000,false ).
            setValue ( "#attribution_provider_url", attributionUrl [ i ] ).
            pause ( 9000 ).
            
            //Check and click Save button
            waitForElementVisible ( '.btn-active', 9000,false ).
            verify.visible ( ".btn-active" ).
            pause ( 9000 ).
            click ( ".btn-active" ).
            pause ( 10000 ).            
            authorsproperties ( attributionShortTitle[ i ], attributionShortDesc[ i ],attributionCategoryName[ i ], attributionNote[ i ],attributionImg[ i ], currentCount ).
            pause(9000).
            useXpath().
            verify.containsText ( "//ul/li/a[ text() = 'Links']","Links" ).
            pause(3000).
            click ( "//ul/li/a[ text() = 'Links']" ).
            useCss().
            pause(9000).
            getText ( '.content-count > strong', function ( actualCountResult ) {
              if ( actualCountResult.status !== -1 ) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                console.log( 'Count - After adding an Links: ' + actualCount );
                expectedCount = ( ( +currentCount ) + ( +1 ) );
                console.log ( 'Count - incemented by 1 in Links: ' + expectedCount );               
                if ( actualCount == expectedCount ) {
                  console.log ( "Actual and Expected counts are equal" );
                  client.writeToExcelPass ( 'boxxspring.xlsx', 'attributions', ++j, 10,11 );                  
                }
                else {
                  console.log ( "if Failed" );
                  client.writeToExcelFail ( 'boxxspring.xlsx', 'attributions', ++j, 10,11, actualCount, expectedCount );
                }

              }
            });
            
                
                 if ( i < attributionTitle.length - 1 ) {
              client.getText ( '.content-count > strong', function ( currentCountResult ) {
                if ( currentCountResult.status !== -1 ) {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring ( 1, currentCount.length - 1 );
                  console.log ( 'Count - New Links : ' + currentCount )
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