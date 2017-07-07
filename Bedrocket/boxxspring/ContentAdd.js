//this function is for check and Add the Contentlist
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var currentCount;
var worksheet = workbook.Sheets[ 'ContentAdd' ];
var contentTitle = [ ];
var categoryType = [ ];
var providerType = [ ];
var alignment = [ ];
var result = [ ];
var expectedCount;
var getData, rowCount = 1;
var actualCount;
module.exports = {
  tags: [ 'contentAdd' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Content Add': function ( addContent ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Content Title
      if ( z.includes ( 'A' ) ) {
        contentTitle.push ( worksheet[ z ].v );
      }
      //Read Content Type
      if ( z.includes ( 'B' ) ) {
        categoryType.push ( worksheet[ z ].v );
      }
      //Read Provider Title
      if ( z.includes ( 'C' ) ) {
        providerType.push ( worksheet[ z ].v );
      }
      //Read alignment
      if ( z.includes ( 'D' ) ) {
        alignment.push ( worksheet[ z ].v );
      }
    }
    if ( contentTitle.length > 1 ) {
      addContent.pause ( 3000 ).
      useXpath ( ).
      //Wait and Verify the ALL Menu in CONTENT
      waitForElementVisible ( "//a[ @href='/properties/81/smart_collections' ][ text( ) ='All' ] ", 3000, false ).
      pause ( 3000 ).
      //Click on the ALL Menu in CONTENT
      click ( "//a[  @href='/properties/81/smart_collections' ][ text( ) ='All' ] " ).
      pause ( 3000 ).
      useCss ( ).
      //Get the Current count in the Content page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
        }
        for ( var getData = 1, rowCount = 1; getData < contentTitle.length; getData++ ) {
          addContent.
          pause ( 3000 ).
          //Wait for the Content Menu Visible
          waitForElementVisible ( "div.content:nth-child( 1 ) > a:nth-child( 2 ) ", 3000, false ).
          pause ( 3000 ).
          //Verify the Content Menu Visible
          verify.containsText ( "div.content:nth-child( 1 ) > a:nth-child( 2 ) ", "CONTENT" ).
          pause ( 3000 ).
          //Wait for the Content Add Button
          waitForElementVisible ( "div.content:nth-child( 1 ) > span:nth-child( 3 ) > a:nth-child( 1 ) > img:nth-child( 1 ) ", 3000, false ).
          //Verify for the Content Add Button
          verify.visible ( "div.content:nth-child( 1 ) > span:nth-child( 3 ) > a:nth-child( 1 ) > img:nth-child( 1 ) " ).
          pause ( 3000 ).
          //Click on the Content Add Button
          click ( "div.content:nth-child( 1 ) > span:nth-child( 3 ) > a:nth-child( 1 ) > img:nth-child( 1 ) " ).
          pause ( 3000 ).
          //Wait for the Headline visible
          waitForElementVisible ( ".text-input-headline", 3000, false ).
          pause ( 3000 ).
          //Verify the Headline visible
          verify.visible ( ".text-input-headline" ).
          pause ( 3000 ).
          //Enter the Headline in the Field
          setValue ( ".text-input-headline", contentTitle[ getData ] ).
          //Check the valid URL from given URL          
          useXpath ( ).
          //Verify the Contains in the Category Type
          verify.containsText ( "//label[ text(  ) ='"+ categoryType[ getData ].trim( ) +"']", categoryType[ getData ].trim( ) ).
          pause ( 3000 ).
          //Click on the Contains in the Category Type
          click ( "//label[ text( ) ='"+ categoryType[ getData ].trim( ) +"']" ).
          pause ( 3000 ).
          //Verify the Contains in the Provider Type
          verify.containsText ( "//label[ text( ) ='"+ providerType[ getData ].trim( ) +"']", providerType[ getData ].trim( ) ).
          pause ( 3000 ).
          //Click on the Contains in the Provider Type
          click ( "//label[ text( ) ='"+ providerType[ getData ].trim( ) +"'] " ).
          useCss ( ).
          //Wait for the alignment visible
          waitForElementVisible ( ".presentation", 3000, false ).
          pause ( 3000 )
          //Check the condition for Grid in the alignment
          if ( alignment[ getData ] === "Grid" ) {
            addContent.waitForElementVisible ( ".grid", 3000, false ).
            pause ( 3000 ).
            click ( ".grid" ).
            pause ( 3000 )
          }
          //Check the condition for List in the alignment
          else if ( alignment[ getData ] === "List" ) {
            addContent.waitForElementVisible ( ".list", 3000, false ).
            pause ( 3000 ).
            click ( ".list" ).
            pause ( 3000 )
          }
          else {
          }
          //Wait for Save button visible
          addContent.waitForElementVisible ( ".btn-active", 3000, false ).
          pause ( 3000 ).
          //Click on the Save Button
          click ( ".btn-active" ).
          pause ( 3000 ).
          useXpath ( ).
          //Wait for ALL button is Visible
          waitForElementVisible ( "//a[ @href='/properties/81/smart_collections' ][text( ) ='All' ] ", 3000, false ).
          pause ( 3000 ).
          //Click on the ALL Button in CONTENT
          click ( "//a[ @href='/properties/81/smart_collections' ][text( ) ='All' ] " ).
          pause ( 3000 ).
          useCss ( ).
          //Get Actual Total Count after created in the Content 
          getText ( '.content-count > strong', function ( actualCountResult ) {
            if ( actualCountResult.status !== -1 ) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring ( 1, actualCount.length - 1 );
              expectedCount = ( ( +currentCount ) + ( +1 ) );
              if ( actualCount == expectedCount ) {
                //Write the Excel to PASS Result and Reason
                addContent.writeToExcelPass ( 'boxxspring.xlsx', 'ContentAdd', ++rowCount, 6 );
              }
              else {
                //Write the Excel to FAIL Result and Reason
                addContent.writeToExcelFail ( 'boxxspring.xlsx', 'ContentAdd', ++rowCount, 6, 7, "ActualResult: '"+ actualCount +"' in the Total Count After Added New Content. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
              }
            }
          } );
          if ( getData < contentTitle.length - 1 ) {
            addContent.getText ( '.content-count > strong', function ( currentCountResult ) {
              if ( currentCountResult.status !== -1 ) {
                currentCount = currentCountResult.value;
                currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
              }
              addContent.useXpath ( ).
              //Wait for ALL button is Visible
              waitForElementVisible ( "//a[ @href='/properties/81/smart_collections' ][ text( ) ='All' ] ", 5000, false ).
              pause ( 3000 ).
              //Click on the ALL Button in CONTENT
              click ( "//a[ @href='/properties/81/smart_collections' ][ text( ) ='All' ] " ).
              pause ( 3000 ).
              useCss ( ).
              getText ( '.content-count > strong', function ( currentCountResult ) {
                if ( currentCountResult.status !== -1 ) {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
                }
              } );
            } );
          }
        }
      } );
    }
    //End the Browser
    addContent.end ( );
  }
}