var xlsx = require ('xlsx');
var fs = require ('fs');
var Excel = require ('exceljs');
var workbook1 = new Excel.Workbook();
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile('boxxspring.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets [ 'categories_annotation' ];
var categoryTitle = [ ];
var categoryDescription = [ ];
var categoryShortTitle = [ ];
var categoryShortDesc = [ ];
var categoryCategoryName = [ ];
var categoryNote = [ ];
var categoryImg = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;



module.exports = {
  tags: ['annotation'],
  before: function ( browser ) {
    var profile = browser.globals.profile;
   // browser.resizeWindow ( 1600, 900 );
    //browser.maximizeWindow();
    browser.login ( profile.portalUri,profile.username,profile.password );
  },

'Create Categories-Annotation in CONTENT': function ( client ) {

    for ( z in worksheet ) {
        if ( z[ 1 ] === '!' ) continue;
            //Read Category Title
            if ( z.includes ( 'A' ) ) {
                categoryTitle.push ( worksheet[ z ].v );
            }
            //Read Category Description
            if ( z.includes ( 'B' ) ) {
                categoryDescription.push ( worksheet[ z ].v );
            }
            //Read Short Title
            if ( z.includes ( 'C' ) ) {
                categoryShortTitle.push ( worksheet [ z ].v );
            }
            //Read Short Description
            if ( z.includes ( 'D' ) ) {
                categoryShortDesc.push ( worksheet [ z ].v );
            }
            //Read Category Name
            if ( z.includes ( 'E' ) ) {
                categoryCategoryName.push ( worksheet [ z ].v );
            }
            
            //Read Category Note
            if ( z.includes ( 'F' ) ) {
                categoryNote.push ( worksheet [ z ].v) ;
            }
            //Read category Image
            if ( z.includes ( 'G' ) ) {
                categoryImg.push ( worksheet [ z ].v );
            }
            
            
}

    if ( categoryTitle.length > 1 ) {
    	console.log("Length:",+categoryTitle.length)
            //for ( var i in categoryTitle ) {
                var j=1;
                client.pause ( 9000 ).
                //span.ng-isolate-scope:nth-child(4) > span:nth-child(1) > ng-transclude:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(6) > a:nth-child(1)
                //Check and click Article menu
                //verify.containsText ( "ng-transclude > div .sidenav > li:nth-child( 6 ) >a","Categories" ).
               useXpath().
               verify.containsText ( "//ul/li/a[ text() = 'Categories']","Categories" ).
               pause(3000).
click ( "//ul/li/a[ text() = 'Categories']" ).
useCss().
                   //click ( "ng-transclude > div .sidenav > li:nth-child( 6 ) > a" ).    
                   pause(9000).         
                     
               getText ( '.content-count > strong', function ( currentCountResult ) {
                    if ( currentCountResult.status !== -1 ) {
                        currentCount = currentCountResult.value;
                        currentCount =currentCount.substring (1, currentCount.length-1);
                        console.log ( 'Count - Before adding an Categories: ' +currentCount );
                    }
                for ( var i=0;i<categoryTitle.length;i++ ) { 
                	client.waitForElementVisible ( ".btn-add", 9000,false ).
            pause(10000).
            moveToElement (".btn-add", 0 , 0 ).
            pause(9000).
           waitForElementVisible ( ".dropdown-submenu > li:nth-child(3) > a:nth-child(1)", 9000,false ).
            //waitForElementVisible ( "(//div[@class='hover-dropdown'])//*[ text() = 'Tag']", 9000,false ).
                        pause(9000).
                          //Check and click Add categories Button
                         // useXpath().
                                                    //waitForElementVisible("//ul[@class="dropdown-submenu"]//a[text()='Tag']",9000,false).

                          //click("//ul[@class='dropdown-menu']//ul[@class='dropdown-submenu'])//ul[@class='ng-scope'])//a[contains(.,'Tag')]").                          useCss().
            click ( ".dropdown-submenu > li:nth-child(3) > a:nth-child(1)" ).
                pause(9000)          
          	console.log ( 'Count - I: ' +i );
          client.pause(9000). 
          verify.visible(".video-tabs > a[ href='#content']").
  click(".video-tabs > a[ href='#content']").
  pause(9000).
            //Check and Enter Categories Title
            waitForElementVisible ( ".text-input-headline", 9000,false ).
            setValue ( ".text-input-headline", categoryTitle [ i ] ).
            pause ( 9000 ).
            
            //Check and Enter Categories Text Description
            waitForElementVisible ( ".wmd-input", 9000,false ).
            clearValue ( ".wmd-input" ).
            setValue ( ".wmd-input", categoryDescription [ i ] ).
            pause ( 9000 ).
            
            //Check and click Save button
            waitForElementVisible ( '.btn-active', 9000,false ).
            verify.visible ( ".btn-active" ).
            pause ( 9000 ).
            click ( ".btn-active" ).
            pause ( 10000 ).            
            allproperties ( categoryShortTitle[ i ], categoryShortDesc[ i ],categoryCategoryName[ i ], categoryNote[ i ],categoryImg[ i ], currentCount ).
            pause(9000).
       useXpath().
               verify.containsText ( "//ul/li/a[ text() = 'Categories']","Categories" ).
               pause(3000).
click ( "//ul/li/a[ text() = 'Categories']" ).
useCss().
pause(9000).
            getText ( '.content-count > strong', function ( actualCountResult ) {
              if ( actualCountResult.status !== -1 ) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                console.log( 'Count - After adding an categories: ' + actualCount );
                expectedCount = ( ( +currentCount ) + ( +1 ) );
                console.log ( 'Count - incemented by 1 in categories: ' + expectedCount );
                console.log ( "j value:", j );
                if ( actualCount == expectedCount ) {
                  console.log ( "Actual and Expected counts are equal" );
                  client.writeToExcelPass ( 'boxxspring.xlsx', 'categories_annotation', ++j, 9,10 );
                  console.log ( "j after value:", j );
                }
                else {
                  console.log ( "if Failed" );
                  client.writeToExcelFail ( 'boxxspring.xlsx', 'categories_annotation', ++j, 9,10, actualCount, expectedCount );
                }

              }
            });
            
                
                 if ( i < categoryTitle.length - 1 ) {
              client.getText ( '.content-count > strong', function ( currentCountResult ) {
                if ( currentCountResult.status !== -1 ) {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring ( 1, currentCount.length - 1 );
                  console.log ( 'Count - New categories : ' + currentCount )
                }
                
              });
            }
       


             }
        });
//client.pause ( 5000 ).
      //sendMail(result);
     }
            client.end();
    

  }
};