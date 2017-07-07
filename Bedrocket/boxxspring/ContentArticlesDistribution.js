//This Function is check and Distribute the Articles from Boxxspring Destination
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'ContentArticlesDistribution' ];
var categoryTitle = [ ];
var categoryHeadline = [ ];
var distribSearch = [ ];
var result = [ ];
var currentCount;
var getData,convertData,getPostData,convertPostData;
var rowCount =1;
module.exports = {
  tags: [ 'contentArticlesDistribution' ],
  // Login the Portal Boxxspring
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Content Articles Distribution': function ( ArticlesDistribution ) {
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Articles Title
      if ( z.includes ( 'A' ) ) {
        categoryTitle.push ( worksheet[ z ].v );
      }
      //Read Articles Edit Title
      if ( z.includes ( 'B' ) ) {
        categoryHeadline.push ( worksheet[ z ].v );
      }
      //Read Search Destination
      if ( z.includes ( 'C' ) ) {
        distribSearch.push ( worksheet[ z ].v );
      }
    }
    if ( categoryTitle.length > 1 ) {
      ArticlesDistribution.pause ( 3000 ).useXpath ( ).
      //Verify the Articles Menu in the CONTENT
      verify.containsText ( "//ul/li/a[ text (  ) = 'Articles']", "Articles" ).
      pause ( 3000 ).
      //Click on the Articles Menu in the CONTENT
      click ( "//ul/li/a[ text (  ) = 'Articles']" ).
      useCss ( ).pause ( 3000 ).
      //Get the Current Totla Count in the Articles listing Page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
        }        
        for ( var getData = 1; getData < categoryTitle.length; getData++ ) {         
          ArticlesDistribution.pause ( 3000 ).
          //Wait for the List view option is visible in the Articles listing page
          waitForElementVisible ( ".list", 3000, false ).
          //Click on the List view option
          pause ( 3000 ).click ( ".list" ).pause ( 3000 ).
          //Wait for the Search field-input is visible in the Articles listing page
          waitForElementVisible ( ".search-field-input", 3000, false ).
          //Verify the Search field-input is visible in the Articles listing page
          verify.visible ( ".search-field-input" ).
          //Enter the Data in the Search field
          setValue ( ".search-field-input", categoryTitle[ getData ] ). 
          //Press the Enter key         
          keys ( ArticlesDistribution.Keys.ENTER ). // hold the control
          //Click on the Search button
          click ( ".search-field-input" ).
          //Release the Enter Key
          keys ( ArticlesDistribution.Keys.NULL ). // release the control
          pause ( 3000 ).
          waitForElementVisible ( ".content-count>strong", 3000,false ).
          verify.visible ( ".content-count>strong" ).
          //Get the Search Total Count in the Articles Listing Page
          getText ( '.content-count > strong', function ( searchCountResult ) {
            if ( searchCountResult.status !== -1 ) {
              searchCount = searchCountResult.value;
              searchCount = searchCount.substring ( 1, searchCount.length - 1 );
            }
            //Converting the getData in to convertData
            if ( getData >= categoryTitle.length ) {
              var convertData = getData - ( categoryTitle.length - 1 );
              getData++;
            }
            ArticlesDistribution.pause ( 3000 ).useXpath ( ).
            //Wait for the Article story Title is visible in the Articles Listing Page
            waitForElementVisible ( "(//h2[@class='ng-binding'])[1]", 3000, false ).
            pause ( 3000 ).
            //Verify the Article story Title is visible in the Articles Listing Page
            verify.visible ( "(//h2[@class='ng-binding'])[1]" ).
            pause ( 3000 ).
            //Click on the Article story Title in the Articles Listing Page
            click ( " (//h2[@class='ng-binding'])[1]" ).
            useCss ( ).pause ( 3000 ).
            //Verify the Content tab is visible
            verify.visible ( ".video-tabs > a[ href='#content']" ).
            pause ( 3000 ).
            //Click on the Content tab
            click ( ".video-tabs > a[ href='#content']" ).
            pause ( 3000 ).
            //Verify the Distribution Tab is visible
            verify.visible ( ".video-tabs a[href='#distribution']" ).
            pause ( 3000 ).
            //Click on the Distribution Tab
            click ( ".video-tabs a[href='#distribution']" ).
            pause ( 3000 ).
            //Wait for the Add Distribution button is visible
            waitForElementVisible ( ".distro-button", 3000, false ).
            pause ( 3000 ).
            //Click on the Add Distribution button is visible
            click ( ".distro-button" ).
            pause ( 3000 ).
            //Wait for the Distribution Dropdown option is visible
            waitForElementVisible ( "a.ng-binding[ng-click='toggleFilterDropdown( );']", 3000, false ).
            pause ( 3000 ).
            //Verify the Distribution Dropdown option is visible
            verify.visible ( "a.ng-binding[ng-click='toggleFilterDropdown( );']" ).
            pause ( 3000 ).
            //Click on the Distribution Dropdown option
            click ( "a.ng-binding[ng-click='toggleFilterDropdown( );']" ).
            pause ( 3000 ).useXpath ( ).
            //Wait to select the Boxxsoring Destination in the dropdown list is visible
            waitForElementVisible ( "//ul/li/a[contains(.,'boxxspring')]", 5000, false ).
            pause ( 3000 ).
            //Verify to select the Boxxsoring Destination in the dropdown list is visible
            verify.visible ( "//ul/li/a[contains(.,'boxxspring')]" ).
            pause ( 3000 ).
            //Click on the Boxxsoring Destination in the dropdown list
            click ( "//ul/li/a[contains(.,'boxxspring')]" )
            //Get the Data from Excel input for Multiple destinations
            var categoryTemp = distribSearch[ convertData ];
            //Split the Data from Excel input for Multiple destinations
            var categoryTemp_array = categoryTemp.split ( ',' );
            for ( var categoryCount = 0; categoryCount < categoryTemp_array.length; categoryCount++ ) {
              categoryTemp_array[categoryCount] = categoryTemp_array[ categoryCount ].replace ( /^\s*/,"" ).replace ( /\s*$/,"" );
              ArticlesDistribution.useCss ( ).pause ( 3000 ).
              //Wait for the Search Field-input is visible
              waitForElementVisible ( ".full-width-search-field-input", 30000, false ).
              pause ( 3000 ).
              //Verify the Search Field-input is visible
              verify.visible ( ".full-width-search-field-input" ).
              pause ( 3000 ).
              //Clear the Data in the Search Field-input
              clearValue ( ".full-width-search-field-input" ).
              pause ( 3000 ).
              //Enter the Data in the Search Field-input
              setValue ( ".full-width-search-field-input", categoryTemp_array[categoryCount] ).
              pause ( 3000 ).useXpath ( ).
              //Wait for Searched Destination is visible in the page
              waitForElementVisible ( "//label[@class='label-left ng-binding'][contains (.,'"+ categoryTemp_array[ categoryCount ] +"')]", 3000, false ).
              pause ( 3000 ).
              //Click on the Searched Destination in the page
              click ( "//label[@class='label-left ng-binding'][ contains(.,'"+ categoryTemp_array[ categoryCount ] +"')]" ).
              useCss ( ).pause ( 3000 )
            }
            ArticlesDistribution.pause ( 3000 ).
            //Wait for Next button is visible in the Distribution
            waitForElementVisible ( ".btn-next", 3000, false ).
            //Click on the Next button in the Distribution
            click ( ".btn-next" ).
            //Get and check the Text for Selected Destinations count
            getText ( "h3.distributions-title.ng-binding", function ( distributeCount ) {
              var distributeCountActual = distributeCount.value;
              var distributeCountExpect = "Selected Destinations " + categoryTemp_array.length;
              if ( distributeCountActual === distributeCountExpect ) {
                ArticlesDistribution.pause ( 3000 ).useCss ( ).
                //Verify the Cancel Distribution button is visible
                verify.visible ( ".cancel-distribution" ).
                pause ( 3000 ).
                //Verify the Post Distribution button is visible
                verify.visible ( "a.btn-next:nth-child( 2 )" ).
                pause ( 3000 ).
                //Click on the Post All button
                click ( "a.btn-next:nth-child( 2 )" ).
                pause ( 3000 )
                for ( var getPostData = 3; getPostData < categoryTemp_array.length + 3; getPostData++ ) {
                  //Get the valuse for Distributed Post
                  ArticlesDistribution.getValue ( "ul.post-list li>.ng-scope", function ( allPost ) {
                    if ( allPost.value === true ) {
                      if ( getPostData >= categoryTemp_array.length + 3 ) {
                        convertPostData = getPostData - ( categoryTemp_array.length );
                        getPostData++;
                      }
                      //Wait for the Distributed Post is visible
                      ArticlesDistribution.pause ( 3000 ).useCss ( ).waitForElementVisible ( "li.completed:nth-child("+ convertPostData +")>span>ng-include>div.description>a", 9000, false, function ( result ) {
                        if ( result.value === true ) {
                          ArticlesDistribution.useXpath ( ).pause ( 3000 ).
                          getText ( "//div/a[@class='ng-binding ng-scope']", function ( urlResult ) {
                          } );
                          //Write the Excel details: PASS Result
                          ArticlesDistribution.writeToExcelPass ( 'boxxspring.xlsx', 'ContentArticlesDistribution', ++rowCount, 5 );
                        }
                        else {
                          //Write the Excel details: FAIL Result and Reason
                          ArticlesDistribution.writeToExcelFail ( 'boxxspring.xlsx', 'ContentArticlesDistribution', ++rowCount, 5, 6, "Distribution of the Content Articles is Failed " );
                        }                        
                      } );
                    }
                    else {
                    }
                  } );
                }
              }
            } );
            ArticlesDistribution.pause ( 3000 ).useXpath ( ).
            //Verify the Articles Menu in the CONTENT is visible
            verify.containsText ( "//ul/li/a[text ( ) = 'Articles']", "Articles" ).
            pause ( 3000 ).
            //Click on the Articles Menu in the CONTENT
            click ( "//ul/li/a[text ( ) = 'Articles']" ).
            useCss ( )
          } );
        }
      } );
    }
    //End the Browser
    ArticlesDistribution.end ( );
  }
};