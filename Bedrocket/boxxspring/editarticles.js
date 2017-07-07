var xlsx = require ( 'xlsx' );
var fs = require ( 'fs');
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook();
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile('boxxspring.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets [ 'Testarticles' ];

var articleEditTitle = [ ];
var articleEditEmbed = [ ];
var articleEditUrl = [ ];
var articleEditTitle1 = [ ];
var articleEditHeadline = [ ];
var articleEditSectionHeadline = [ ];
var articleEditSectionText = [ ];
var articleEditTextDescrip = [ ];
var articleEditHeadlines = [ ];
var articleEditShortTitle = [ ];
var articleEditShortDesc = [ ];
var articleEditAuthor = [ ];
var articleEditCategoryName = [ ];
var articleEditCategoryType = [ ];
var articleEditNote = [ ];
var dragEditImg = [ ];
var articleTitle = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
var i=0;
var j=0;
module.exports = {

  tags: ['editarticles'],
  before: function ( browser ) {
    var profile = browser.globals.profile;
    browser.resizeWindow ( 1600, 900 );
    browser.maximizeWindow();
    browser.login ( profile.portalUri,profile.username,profile.password );
  },

'Edit an Article': function ( client ) {

    for ( z in worksheet ) {
        if ( z[ 0 ] === '!' ) continue;
           
            //Read Edit Article Title
            if ( z.includes ( 'A' ) ) {
                articleEditTitle.push ( worksheet[ z ].v );
            }
            //Read  Edit Article Embed Code
            if ( z.includes ( 'B' ) ) {
                articleEditEmbed.push ( worksheet[ z ].v );
            }
            //Read Edit Article Url 
            if ( z.includes ( 'C' ) ) {
                articleEditUrl.push ( worksheet [ z ].v );
            }
            //Read Edit Article Rewrite-Title
            if ( z.includes ( 'D' ) ) {
                articleEditTitle1.push ( worksheet [ z ].v );
            }
            //Read Edit Article Headline
            if ( z.includes ( 'E' ) ) {
                articleEditHeadline.push ( worksheet [ z ].v );
            }
            //Read Edit Article Section Headline
            if ( z.includes ( 'F' ) ) {
                articleEditSectionHeadline.push ( worksheet [ z ].v );
            }
            //Read Edit Article Text Description
            if ( z.includes ( 'G' ) ) {
                articleEditSectionText.push ( worksheet [ z ].v) ;
            }
            //Read Edit Article Section Text Description
            if ( z.includes ( 'H' ) ) {
                articleEditTextDescrip.push ( worksheet [ z ].v );
            }
            //Read Edit Article Headlines
            if ( z.includes ( 'I' ) ) {
                articleEditHeadlines.push ( worksheet [ z ].v );
            }
            //Read Edit Article ShortTitle

            if ( z.includes ( 'J' ) ) {
                articleEditShortTitle.push ( worksheet [ z ].v );
            }
            //Read Edit Article ShortDescription

            if ( z.includes ( 'K' ) ) {
                articleEditShortDesc.push ( worksheet [ z ].v );
            }
            //Read Edit Article Author
            if ( z.includes ( 'L' ) ) {
                articleEditAuthor.push ( worksheet [ z ].v );
            }
            //Read Edit Article Category Name
            if ( z.includes ( 'M' ) ) {

                articleEditCategoryName.push ( worksheet [ z ].v );
            }
            //Read Edit Article Category Type
            if ( z.includes ( 'N' ) ) {

                articleEditCategoryType.push ( worksheet [ z ].v );
            }
            //Read Edit Article Notes
            if ( z.includes ( 'O' ) ) {

                articleEditNote.push ( worksheet [ z ].v );
            }
            if ( z.includes ( 'P' ) ) {

                dragEditImg.push ( worksheet [ z ].v );
            }
            
            if ( z.includes ( 'Q' ) ) {

                articleTitle.push ( worksheet [ z ].v );
            }

}


    if ( articleEditTitle.length > 0 ) {
           for ( var i in articleTitle ) {
                client.pause(7000).
                useXpath().
                waitForElementVisible("//ul/li/a[ text() = 'Articles']",9000,false).
pause(9000).
 verify.containsText ( "//ul/li/a[ text() = 'Articles']","Articles" ).
               pause(9000).
click ( "//ul/li/a[ text() = 'Articles']" ).
useCss().
                pause ( 10000 ).
                getText ( '.content-count > strong', function ( currentCountResult ) {
                    if ( currentCountResult.status !== -1 ) {
                        currentCount = currentCountResult.value;
                        currentCount =currentCount.substring (1, currentCount.length-1);
                        console.log ( 'Count - Before adding an article: ' +currentCount );
                    }
                });
client.pause(9000).
waitForElementVisible(".search-field-input",5000).
     verify.visible(".search-field-input").

    setValue(".search-field-input",articleTitle[i]).
    keys(client.Keys.ENTER). // hold the control
   click(".search-field-input").
   keys(client.Keys.NULL). // release the control
   pause(10000).
     waitForElementVisible(".content-count>strong",5000).
   verify.visible(".content-count>strong").
       getText ( '.content-count > strong', function ( searchResultCount ) {
                    if ( searchResultCount.status !== -1 ) {
                        var searchCount = searchResultCount.value;
                        searchCount =searchCount.substring (1, searchCount.length-1);
                        console.log ( 'Searched Videos Count: ' +searchCount );
                    }});
            client.pause(9000).
              //Check and click Edit Article Button
waitForElementVisible(".btn-pullout",9000,false).
pause(7000).
moveToElement(".btn-pullout",0,0).
pause(7000).
click(".btn-pullout").
pause(9000).       
          
            //Check and Enter Article Title
           waitForElementVisible ( ".text-input-headline", 9000,false ).
            setValue ( ".text-input-headline", articleEditTitle[i] ).
            pause ( 9000 ).
            //Check and Enter Article Title
            clearValue ( ".text-input-headline" ).
            setValue ( ".text-input-headline", articleEditTitle1[i] ).
            pause ( 7000 ).
            //Check and Enter Article Text Description
            waitForElementVisible ( "#wmd-input-0", 9000,false ).
            clearValue ( "#wmd-input-0" ).
            setValue ( "#wmd-input-0", articleEditTextDescrip[i] ).
            pause ( 7000 ).
            //Check and click Add section
            waitForElementVisible ( ".plus-icon", 9000,false).
            pause ( 7000 ).
            //Check and Enter the Article Headline
            //waitForElementVisible ( "div.field-input > text-field:nth-child(1) > textarea:nth-child(1)", 9000,false ).
           // pause(9000).
           // clearValue("div.field-input > text-field:nth-child(1) > textarea:nth-child(1)").
           // pause(9000).
           // setValue ( "div.field-input > text-field:nth-child(1) > textarea:nth-child(1)", articleEditHeadline[i] ).
            pause ( 15000 ).
           
           /* waitForElementVisible ( "textarea.last", 9000,false ).pause(7000).
            clearValue("textarea.last").
            pause(7000).
            setValue ( "textarea.last", articleEditSectionHeadline[i] ).
            pause(9000).*/
            //Check and Enter the Article Section Text description
            
            waitForElementVisible ( '#wmd-input-1', 9000,false ).
            pause(7000).
            clearValue('#wmd-input-1').
            pause(7000).
            setValue ( '#wmd-input-1', articleEditSectionText[i] ).
            pause ( 5000 ).
            waitForElementVisible("div.delete-chrome:nth-child(2) > span:nth-child(1) > i:nth-child(1)",9000,false).
            pause(7000).
            click("div.delete-chrome:nth-child(2) > span:nth-child(1) > i:nth-child(1)").
//Check and Enter the Embed code
            moveToElement ( 'div.section-add-chrome:nth-child(1) > a:nth-child(1) > i:nth-child(1)' , 0 , 0 ).
            //waitForElementVisible ( "div.section-add-chrome:nth-child(1) > a:nth-child(6) > i:nth-child(1) ", 9000,false ).
            //click ( "div.section-add-chrome:nth-child(1) > a:nth-child(6) > i:nth-child(1)" ).
            waitForElementVisible ( ".embed-btn", 9000,false ).
            pause(9000).
            click(".embed-btn").
            pause ( 9000 ).
            //waitForElementVisible ( ".component-field > div:nth-child( 1 ) ", 9000 ).
            waitForElementVisible ( "div.field-input:nth-child(3) > input:nth-child(1) ", 9000 ,false).
            //.component-field > div:nth-child( 1 )  > div:nth-child( 3 ) > input:nth-child( 1 )
            pause(5000).

            setValue ( "div.field-input:nth-child(3) > input:nth-child(1) ", articleEditEmbed[i] ).
            pause(15000)

            
                if ( (articleEditEmbed[i].match( /www.dailymotion.com/g)) || (articleEditEmbed[i].match ( /www.youtube.com/g) || (articleEditEmbed[i].match ( /widgets.staging.boxxspring.com/g ) || ( articleEditEmbed[i].match ( /www.facebook.com/g ) ) || (articleEditEmbed[i].match ( /platform.instagram.com/g )) || (articleEditEmbed[i].match( /platform.twitter.com/g )) || (articleEditEmbed[i].match ( /www.wufoo.com/g )) ||  (articleEditEmbed[i].match ( /www.ustream.tv/g )) || (articleEditEmbed[i].match ( /www.snappytv.com/g )) || (articleEditEmbed[i].match ( /soundcloud.com/g )) || (articleEditEmbed[i].match ( /vine.co/g )) || (articleEditEmbed[i].match ( /ooyala.com/g )) )) ) {
                    console.log ( "Embed Code is passed" );
                    client.pause(9000)
                } 
                                      
              else 
                {
                    console.log ( "Invalid url :Failed" );
                    //this.waitForElementVisible ( '.field-error', 15000, false, function ( urlErrorMsgEmbed ) {
                     // this.assert.fail ( undefined, undefined, "Invalid url" )
                   // });
           
                }
            /*client.pause ( 7000 ).
            waitForElementVisible("div.delete-chrome:nth-child(7) > span:nth-child(1) > i:nth-child(1)",9000,false).
            pause(7000).
            click("div.delete-chrome:nth-child(7) > span:nth-child(1) > i:nth-child(1)").
            //Check and Enter the URL 
            moveToElement ( 'div.section-add-chrome:nth-child(2) > a:nth-child(1) > i:nth-child(1)', 0 , 0 ).
            //function( lookvideo ){
            pause ( 5000 ).
            waitForElementVisible ( "div.section-add-chrome:nth-child(2) > a:nth-child(5) > i:nth-child(1)", 9000 , false ).
            click ( "div.section-add-chrome:nth-child(2) > a:nth-child(5) > i:nth-child(1)" ).
            pause ( 7000 ).
            waitForElementVisible ( "div.field-input:nth-child(2) > div:nth-child(1)", 9000 ).
            pause ( 5000 ).
            waitForElementVisible ( ".choose-source > .field-input > input", 15000 )
                        
            client.setValue ( ".choose-source > .field-input > input", articleEditUrl[i] )
            
                if ( articleEditUrl[i].match ( /www.dailymotion.com/g ) || (articleEditUrl[i].match ( /www.youtube.com/g ))  || (articleEditUrl[i].match ( /vimeo.com/g )) ) {
                    console.log ( "URL is passed" );
                }
                
                else {
                    console.log ( "Invalid url :Failed" );
                    //this.waitForElementVisible ( '.field-error', 15000, false, function ( urlErrorMsg ) {
                      //this.assert.fail ( undefined, undefined, "Invalid url" )
                   //});
            
                }*/

            client.pause ( 8000 ).
            //Check and click Save button
            waitForElementVisible ( '.btn-active', 6000 ).
            verify.visible ( ".btn-active" ).
            pause ( 10000 ).
            click ( ".btn-active" ).
            pause ( 10000 ).
            //Check and click properties tab
            waitForElementVisible ( ".video-tabs > a:nth-child( 2 )", 9000,false ).
            pause ( 9000 ).
            verify.containsText ( ".video-tabs > a:nth-child(2)", "PROPERTIES" ).
            pause ( 9000 ).
            click ( ".video-tabs > a:nth-child(2)" ).
            pause ( 10000 ).
            //Check and Enter short name
            waitForElementVisible ( "textarea[ ng-model= 'artifact.shortName' ] ", 10000,false ).
            pause ( 9000 ).
            verify.visible ( "textarea[ ng-model= 'artifact.shortName' ] " ).
            pause ( 9000 ).
            clearValue("textarea[ ng-model= 'artifact.shortName' ]").
            pause(9000).
            setValue ( "textarea[ ng-model= 'artifact.shortName' ] ", articleEditShortTitle[i] ).
            pause ( 9000 ).
            //Check and Enter short description
            verify.visible ( "textarea[ ng-model= 'artifact.shortDescription' ] " ).
            pause ( 9000 ).
            clearValue("textarea[ ng-model='artifact.shortDescription' ] ").
            pause(9000).
            setValue ( "textarea[ ng-model='artifact.shortDescription' ] ", articleEditShortDesc[i] ).
            pause ( 9000 ).
            //Select Author
            verify.visible ( ".attribution-container > a[ ng-click='showAddAuthor()' ]" ).
            click ( ".attribution-container > a[ ng-click='showAddAuthor()' ]" ).
            pause ( 9000 ).
            clearValue(".search-form").
            pause(9000).
            setValue ( ".search-form", articleEditAuthor[i] ).
            pause ( 10000 ).
            useXpath ( ).
            click ( "//ul/li/a/span[ text() = '" + articleEditAuthor[i] + "' ] " ).
            pause ( 9000 ).
            useCss ( ).
            //Check Categories and select Categories
            waitForElementVisible ( '.collections-widget', 10000 ).
            verify.visible ( ".collections-widget" ).
            pause ( 9000 ).
            clearValue(".collections-widget > input").
            pause(9000).
            setValue ( ".collections-widget > input", articleEditCategoryName[i] ).
            pause ( 10000 ).
            //click ( ".new-category-type  > img [ ng-click='toggleopenAddOptions ( )' ] " ).
            //pause ( 5000 ).
            //useXpath ( ).
            //click ( "//ul/li/a[ text ( ) = '" + articleCategoryType [ i ] + "' ] " ).
            //useCss ( ).
            verify.visible ( ".suggestion-list-wrap > div:nth-child(1) > div:nth-child(1)" ).
            click(".suggestion-list-wrap > div:nth-child(1) > div:nth-child(1)").
            //Check and Add notes
            verify.visible ( "textarea[ ng-model = 'artifact.note' ] " ).
            pause ( 7000 ).
            clearValue("textarea[ ng-model = 'artifact.note' ] ").
            pause(7000).
            setValue ( "textarea[ ng-model = 'artifact.note' ] ", articleEditNote[i] ).
            pause ( 9000 ).
            //verify.visible ( ".image-upload" ).
            setValue ( 'span.hidden-input:nth-child(1) > input:nth-child(1)', require ( 'path' ).resolve ( dragEditImg[i] ) ).

            pause ( 15000 ).
           
            //Get no of Articles
            getAttribute ( ".uploaded-image", "src", function ( imageCheck ) {
            var imageValue = imageCheck.value;
            var imageStatus = imageCheck.status;
            console.log ( "Current Image Value:" + imageValue );
            console.log ( "Current Image Status:" + imageStatus );
            if ( imageStatus === 0 ) {
              console.log ( "Image available in the field" );
              client.pause ( 7000 ).
              verify.visible ( " .content-menu > li:nth-child(3) > a:nth-child(1)" ).
              click ( ".content-menu > li:nth-child(3) > a:nth-child(1)" ).
              pause ( 9000 ).
              getAttribute ( ".uploaded-image", "src", function ( imgDeleteStatus ) {
                console.log ( "After Deleted Image Status :" + imgDeleteStatus.status );
                client.pause( 10000 )
                
              });
            }
            else if ( imageStatus !== 0 ) {
              console.log( "In the Dropdown box Image is not available" );
              client.pause ( 10000 ).
              waitForElementVisible ( "section.field-input > div:nth-child(1)", 9000, false ).
              pause(7000).
              setValue ( 'span.hidden-input:nth-child(1) > input:nth-child(1)', require ( 'path' ).resolve ( dragEditImg[i] ) ).
              pause ( 25000 )
            }
            else {
              console.log ( "Failed Images" );
            }
          });
                        //Check and Click Save Button

            client.pause(9000).
            verify.visible ( ".btn-active" ).
            click ( ".btn-active" ).
            pause ( 7000 ).
            //Search for Articles Menu
             useXpath().
                waitForElementVisible("//ul/li/a[ text() = 'Articles']",9000,false).
pause(9000).
 verify.containsText ( "//ul/li/a[ text() = 'Articles']","Articles" ).
               pause(9000).
click ( "//ul/li/a[ text() = 'Articles']" ).
useCss().
            pause ( 9000 ).
              getText ( '.content-count > strong', function ( addcountResult ) {
            if ( addcountResult.status !== -1 ) {      
                actualCount = addcountResult.value;
                actualCount = actualCount.substring (1, actualCount.length-1);
                console.log ( 'Count - After adding an article: ' + actualCount );
                expectedCount =  currentCount;
                console.log ( 'Count - incemented in article: ' + expectedCount );
                if ( actualCount == expectedCount ) {
                    console.log("if passed");
                    client.writeToExcelPass('boxxspring.xlsx', 'Testarticles', ++j, 17,18);

                }
                else {
                     console.log("if Failed");
                    client.writeToExcelFail('boxxspring.xlsx', 'Testarticles', ++j, 17, 18, actualCount, expectedCount);


                }
            }
            });

 }}
            client.end();
    }
}
