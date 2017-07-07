var xlsx = require ( 'xlsx' );
var fs = require ( 'fs');
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook();
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile('boxxspring.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets [ 'articles' ];
var articleTitle = [ ];
var articleEmbed = [ ];
var articleUrl = [ ];
var articleTitle1 = [ ];
var articleHeadline = [ ];
var articleSectionHeadline = [ ];
var articleSectionText = [ ];
var articleTextDescrip = [ ];
var articleHeadlines = [ ];
var articleShortTitle = [ ];
var articleShortDesc = [ ];
var articleAuthor = [ ];
var articleCategoryName = [ ];
var articleCategoryType = [ ];
var articleNote = [ ];
var result = [ ];

module.exports = {
  tags: ['articles'],
  before: function ( browser ) {
    var profile = browser.globals.profile;
    browser.resizeWindow ( 1024, 1024 );
    browser.maximizeWindow();
    browser.login ( profile.portalUri,profile.username,profile.password );
  },

'Uploading an Article': function ( client ) {

    for ( z in worksheet ) {
        if ( z[ 0 ] === '!' ) continue;
            //Read Article Title
            if ( z.includes ( 'A' ) ) {
                articleTitle.push ( worksheet[ z ].v );
            }
            //Read Article Embed Code
            if ( z.includes ( 'B' ) ) {
                articleEmbed.push ( worksheet[ z ].v );
            }
            //Read Article Url 
            if ( z.includes ( 'C' ) ) {
                articleUrl.push ( worksheet [ z ].v );
            }
            //Read Article Rewrite-Title
            if ( z.includes ( 'D' ) ) {
                articleTitle1.push ( worksheet [ z ].v );
            }
            //Read Article Headline
            if ( z.includes ( 'E' ) ) {
                articleHeadline.push ( worksheet [ z ].v );
            }
            //Read Article Section Headline
            if ( z.includes ( 'F' ) ) {
                articleSectionHeadline.push ( worksheet [ z ].v );
            }
            //Read Article Text Description
            if ( z.includes ( 'G' ) ) {
                articleSectionText.push ( worksheet [ z ].v) ;
            }
            //Read Article Section Text Description
            if ( z.includes ( 'H' ) ) {
                articleTextDescrip.push ( worksheet [ z ].v );
            }
            //Read Article   Headlines
            if ( z.includes ( 'I' ) ) {
                articleHeadlines.push ( worksheet [ z ].v );
            }
            //Read Article ShortTitle

            if ( z.includes ( 'J' ) ) {
                articleShortTitle.push ( worksheet [ z ].v );
            }
            //Read Article ShortDescription

            if ( z.includes ( 'K' ) ) {
                articleShortDesc.push ( worksheet [ z ].v );
            }
            //Read Article Author
            if ( z.includes ( 'L' ) ) {
                articleAuthor.push ( worksheet [ z ].v );
            }
            //Read Article Category Name
            if ( z.includes ( 'M' ) ) {

                articleCategoryName.push ( worksheet [ z ].v );
            }
            //Read Article Category Type
            if ( z.includes ( 'N' ) ) {

                articleCategoryType.push ( worksheet [ z ].v );
            }
            //Read Article Notes
            if ( z.includes ( 'O' ) ) {

                articleNote.push ( worksheet [ z ].v );
    }
}

    if ( articleTitle.length > 0 ) {
            for ( var i in articleTitle ) {
                var j=0;
                client.pause ( 9000 ).
                //Check and click Article menu
                useXpath().
               verify.containsText ( "//ul/li/a[ text() = 'Articles']","Articles" ).
               pause(7000).
click ( "//ul/li/a[ text() = 'Articles']" ).
useCss().
                pause ( 6000 ).
                getText ( '.content-count > strong', function ( result ) {
                    if ( result.status !== -1 ) {
                        countBeforeAdd = result.value;
                        countBeforeAdd =countBeforeAdd.substring (1, countBeforeAdd.length-1);
                        console.log ( 'Count - Before adding an article: ' +countBeforeAdd );
                    }
                });
            client.pause(5000).
            //Check and click Add Article Button
            waitForElementVisible ( ".btn-add", 9000,false ).
            click ( ".btn-add" ).
            pause ( 5000 ).
            //Check and click Template
            waitForElementVisible ( ".asc", 9000,false ).
            click ( ".asc" ).
            pause ( 6000 ).
            //Check and Enter Article Title
            waitForElementVisible ( ".text-input-headline", 9000,false ).
            setValue ( ".text-input-headline", articleTitle [ i ] ).
            pause ( 5000 ).
            //Check and Enter Article Title
            clearValue ( ".text-input-headline" ).
            setValue ( ".text-input-headline", articleTitle1 [ i ] ).
            pause ( 5000 ).
            //Check and Enter Article Text Description
            waitForElementVisible ( "#wmd-input-0", 9000,false ).
            clearValue ( "#wmd-input-0" ).
            setValue ( "#wmd-input-0", articleTextDescrip [ i ] ).
            pause ( 6000 ).
            //Check and click Add section
            waitForElementVisible ( ".plus-icon", 9000,false ).
            pause ( 5000 );
            client.waitForElementVisible ( ".tip-text", 9000,false ).
            click ( ".tip-text" ).
            pause ( 9000 ).
            //Check and Enter the Article Headline
           // waitForElementVisible ( "div.field-input > text-field:nth-child(1) > textarea:nth-child(1)", 9000,false ).
            //pause ( 9000 ).
           // setValue ( "div.field-input > text-field:nth-child(1) > textarea:nth-child(1)", articleHeadline [ i ] ).
            pause ( 15000 ).
            //Check the add button and Enter the Article Section Headline
            moveToElement ('.add-btn > i:nth-child(1)', 0 , 0 ).
            pause ( 9000 ).
            waitForElementVisible ( ".headline-btn > i:nth-child( 1 )", 9000,false ).
            pause ( 9000 ).
            click ( ".headline-btn > i:nth-child( 1 ) " ).
            pause ( 7000 ).
            waitForElementVisible ( "textarea.last", 9000,false ).
            pause ( 9000 ).
            setValue ( "textarea.last", articleSectionHeadline [ i ] ).
            pause(10000).
            //Check and Enter the Article Section Text description
            moveToElement ( 'div.section-add-chrome:nth-child(2) > a:nth-child(1) > i:nth-child(1)', 0 , 0 ).
            pause ( 10000 ).
            waitForElementVisible ( 'div.section-add-chrome:nth-child(2) > a:nth-child(3) > i:nth-child(1)', 9000,false ).
            pause(9000).
            click('div.section-add-chrome:nth-child(2) > a:nth-child(3) > i:nth-child(1)').
            waitForElementVisible ( '#wmd-input-1', 9000,false ).
            setValue ( '#wmd-input-1', articleSectionText [ i ] ).
            pause ( 9000 ).
            //Check and Enter the Embed code
            moveToElement ( 'div.section-add-chrome:nth-child(1) > a:nth-child(1) > i:nth-child(1)' , 0 , 0 ).
            pause ( 10000 ).
            waitForElementVisible ( "div.section-add-chrome:nth-child(1) > a:nth-child(6) > i:nth-child(1) ", 9000,false ).
            click ( "div.section-add-chrome:nth-child(1) > a:nth-child(6) > i:nth-child(1)" ).
            pause ( 9000 ).
            //waitForElementVisible ( ".component-field > div:nth-child( 1 ) ", 9000 ).
            waitForElementVisible ( "div.field-input:nth-child(3) > input:nth-child(1) ", 9000 ,false).
            //.component-field > div:nth-child( 1 )  > div:nth-child( 3 ) > input:nth-child( 1 )
            pause ( 9000 ).
            setValue ( "div.field-input:nth-child(3) > input:nth-child(1) ", articleEmbed [ i ] );
            //Check the valid URL from given URL
            //client.waitForElementVisible ( ".component-field > div:nth-child( 1 ) > div:nth-child( 3 ) > input:nth-child( 1 ) ", 9000, false, function ( ){
            //client.url ( function ( test1 )
            //{
            //console.log ( "Given Second URL:", articleEmbed [ i ] );

                if ( articleEmbed [ i ].match( /www.dailymotion.com/g ) ) {
                    console.log ( "Dailymotion url is passed" );
                } 
                else if ( articleEmbed [ i ].match ( /www.youtube.com/g ) ) {
                    console.log ( "Youtube Embed is passed" );
                } 
                else if ( articleEmbed [ i ].match ( /widgets.staging.boxxspring.com/g ) ) {
                    console.log ( "Boxxspring Embed code is passed" );
                } 
                else if ( articleEmbed [ i ].match ( /www.facebook.com/g ) ) {
                    console.log ( "FaceBook Embed code is passed" );
                } 
                else if ( articleEmbed [ i ] .match ( /platform.instagram.com/g ) ) {
                    console.log ( "Instagram Embed Code is passed" );
                } 
                else if ( articleEmbed [ i ] .match( /platform.twitter.com/g ) ) {
                    console.log ( "twitter is passed" );
                } 
                else if ( articleEmbed [ i ] .match ( /www.wufoo.com/g ) ) {
                    console.log ( "Wufoo Embed Code is passed" );
                } 
                else if ( articleEmbed [ i ] .match ( /www.ustream.tv/g ) ) {
                    console.log ( "Ustream Embed Code is passed" );
                } 
                else if ( articleEmbed [ i ] .match ( /www.snappytv.com/g ) ) {
                    console.log ( "SnappyTv Embed code is passed" );
                } 
                else if ( articleEmbed [ i ] .match ( /soundcloud.com/g ) ) {
                    console.log ( "Soundcloud Embed code is passed" );
                } 
                else if ( articleEmbed [ i ] .match ( /vine.co/g ) ) {
                    console.log ( "Vine Embed Code is passed" );
                } 
                else if ( articleEmbed [ i ] .match ( /ooyala.com/g ) ) {
                    console.log ( "ooyala Embed Code is passed" );
                } 
                else 
                {
                    console.log ( "Invalid url :Failed" );
                    client.waitForElementVisible ( '.field-error', 15000, false, function ( urlErrorMsgEmbed ) {
                      this.assert.fail ( undefined, undefined, "Invalid url" )
                    });
            //client.waitForElementVisible ( '.field-error', 15000 ).
            //verify.visible ( ".field-error" )
                }
            client.pause ( 7000 ).
            //Check and Enter the URL
            //waitForElementVisible(".plus-icon", 9000).
            moveToElement ( 'div.section-add-chrome:nth-child(2) > a:nth-child(1) > i:nth-child(1)', 0 , 0 ).
            //function( lookvideo ){
            //pause ( 9000 ).
            //waitForElementVisible ( "div.section-add-chrome:nth-child(2) > a:nth-child(5) > i:nth-child(1)", 9000 , false ).
            pause(9000).
            click ( "div.section-add-chrome:nth-child(2) > a:nth-child(5) > i:nth-child(1)" ).
            pause ( 7000 ).
            waitForElementVisible ( "div.field-input:nth-child(2) > div:nth-child(1)", 9000 ).
            pause ( 5000 ).
            waitForElementVisible ( ".choose-source > .field-input > input", 15000 )
            //waitForElementVisible("div.list-item-card:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > input:nth-child(1)",9000)
            var geturl = articleUrl [ i ];
            //var geturl = 'https://www.youtube.com/watch?v=PiF5HHkHvX0';
            //var geturl ='https://facebook.com/';
            client.setValue ( ".choose-source > .field-input > input", articleUrl [ i ] )
            //Check the valid URL from given URL input.ng-dirty
            //url( function ( test )
            //{
            //console.log("Given URL:", articleUrl [ i ] );

                if ( articleUrl [ i ].match ( /www.dailymotion.com/g ) ) {
                    console.log ( "Dailymotion url is passed" );
                }
                else if ( articleUrl [ i ].match ( /www.youtube.com/g ) ) {
                    console.log ( "Youtube url is passed" );
                }
                else if ( articleUrl [ i ].match ( /vimeo.com/g ) ) {
                    console.log ( "Vimeo url is passed" );
                }
                else {
                    console.log ( "Invalid url :Failed" );
                    client.waitForElementVisible ( '.field-error', 15000, false, function ( urlErrorMsg ) {
                      this.assert.fail ( undefined, undefined, "Invalid url" )
                    });
            //client.waitForElementVisible ( '.field-error', 15000 ).
            //verify.visible ( ".field-error" )
                }

            client.pause ( 8000 ).
            //Check and click Save button
            waitForElementVisible ( '.btn-active', 6000 ).
            verify.visible ( ".btn-active" ).
            pause ( 5000 ).
            click ( ".btn-active" ).
            pause ( 10000 ).
            //Check and click properties tab
            verify.containsText ( ".video-tabs > a:nth-child( 2 ) ", "PROPERTIES" ).
            pause ( 5000 ).
            click ( ".video-tabs > a:nth-child( 2 )" ).
            pause ( 5000 ).
            //Check and Enter short name
            waitForElementVisible ( "textarea[ ng-model= 'artifact.shortName' ] ", 10000 ).
            verify.visible ( "textarea[ ng-model= 'artifact.shortName' ] " ).
            pause ( 5000 ).
            setValue ( "textarea[ ng-model= 'artifact.shortName' ] ", articleShortTitle [ i ] ).
            pause ( 5000 ).
            //Check and Enter short description
            verify.visible ( "textarea[ ng-model= 'artifact.shortDescription' ] " ).
            pause ( 5000 ).
            setValue ( "textarea[ ng-model='artifact.shortDescription' ] ", articleShortDesc [ i ] ).
            pause ( 5000 ).
            //Select Author
            verify.visible ( ".attribution-container > a[ ng-click='showAddAuthor()' ]" ).
            click ( ".attribution-container > a[ ng-click='showAddAuthor()' ]" ).
            pause ( 5000 ).
            setValue ( ".search-form", articleAuthor [ i ] ).
            pause ( 10000 ).
            useXpath ( ).
            click ( "//ul/li/a/span[ text() = '" + articleAuthor [ i ] + "' ] " ).
            pause ( 5000 ).
            useCss ( ).
            //Check Categories and select Categories
            waitForElementVisible ( '.collections-widget', 10000 ).
            verify.visible ( ".collections-widget" ).
            pause ( 5000 ).
            setValue ( ".collections-widget > input", articleCategoryName [ i ] ).
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
            pause ( 5000 ).
            setValue ( "textarea[ ng-model = 'artifact.note' ] ", articleNote [ i ] ).
            pause ( 5000 ).
            verify.visible ( ".image-upload" ).
            pause ( 5000 ).
            //Check and Click Save Button
            verify.visible ( ".btn-active" ).
            click ( ".btn-active" ).
            pause ( 9000 ).
            //Search for Articles Menu
            useXpath().
               verify.containsText ( "//ul/li/a[ text() = 'Articles']","Articles" ).
               pause(9000).
click ( "//ul/li/a[ text() = 'Articles']" ).
useCss().
pause(9000)
            //Get no of Articles

            var countAfterAdd;
            var countBeforeAdd1;
            var countBeforeAdd;

            client.getText ( '.content-count > strong', function ( countResult ) {
            if ( countResult.status !== -1 ) {      
                countAfterAdd = countResult.value;
                countAfterAdd = countAfterAdd.substring (1, countAfterAdd.length-1);
                console.log ( 'Count - After adding an article: ' + countAfterAdd );
                countBeforeAdd1 =  (( +countBeforeAdd ) +  ( +1 ));
                console.log ( 'Count - incemented in article: ' + countBeforeAdd1 );

                if ( countAfterAdd == countBeforeAdd1 ) {
                    console.log("if passed");
                    workbook1.xlsx.readFile('boxxspring.xlsx', { cellStyles: true })
                    .then(function() {
                        var worksheet1 = workbook1.getWorksheet( 'articles' );
                        var row = worksheet1.getRow(++j);
                        row.getCell(16).font = { bold: true, color: { argb: 'FF6BD92E' } }; 
                        row.alignment= { wrapText: true } 
                        row.getCell(16).value = 'PASS';
                        result.push ( 'PASS' );  
                        row.hidden = false;
                        worksheet1.getColumn(j).hidden = false;              
                        workbook1.xlsx.writeFile( 'boxxspring.xlsx' );    
                        row.commit();       
                    });

                }
                else {
                    workbook1.xlsx.readFile('boxxspring.xlsx', { cellStyles: true })
                    .then(function() {
                        var worksheet1 = workbook1.getWorksheet( 'articles' );
                        var row = worksheet1.getRow(++j);
                        row.getCell(16).font = { bold: true, color:{ argb: 'FFFF0000' } }; 
                        row.alignment= { wrapText: true } 
                        row.getCell(16).value = 'FAIL';  
                        row.getCell(17).font = { color:{ argb: 'FFFF0000'} };
                        row.alignment= { wrapText: true } 
                        row.getCell(17).value = "ActualResult: '" + countAfterAdd + "' in the Article Count After Added New. ExpectedResult: should be'" + countBeforeAdd1 + "' in the Article Count "; 
                        result.push ( 'FAIL' );              
                        row.hidden = false;
                        worksheet1.getColumn(j).hidden = false; 
                        workbook1.xlsx.writeFile( 'boxxspring.xlsx' );
                        row.commit(); 
                    }); 


                }
            }
            });


            }
        client.pause ( 5000 ).
        sendMail(result);
        }
            client.end();
    }
}