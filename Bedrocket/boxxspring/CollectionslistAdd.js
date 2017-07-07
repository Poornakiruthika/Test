//this function is for check and Add the Collections list 
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var currentCount;
var worksheet = workbook.Sheets[ 'CollectionslistAdd' ];
var collectionTitle = [ ];
var contentTitle = [ ];
var searchContentTitle = [ ];
var result = [ ];
var expectedCount;
var actualCount;
var getData,getFirstData,rowCount,convertData = 1;
module.exports = {
  tags: [ 'collectionslistAdd' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;   
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Collectionslist Add': function ( CollectionsListAdd ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Search Collection Title
      if ( z.includes ( 'A' ) ) {
        collectionTitle.push ( worksheet[ z ].v );
      }
      //Read Content Title
      if ( z.includes ( 'B' ) ) {
        contentTitle.push ( worksheet[ z ].v );
      }
      //Read Search Collection Title
      if ( z.includes ( 'C' ) ) {
        searchContentTitle.push ( worksheet[ z ].v );
      }
    }
    if ( collectionTitle.length > 1 ) {
      var getFirstData = 1;
      CollectionsListAdd.pause ( 3000 ).useXpath ( ).
      //Verify the Collection Title in the menu is visible
      verify.containsText ( "//ul/li/a[ text( ) = '"+ collectionTitle[ getFirstData ] +"']", collectionTitle[ getFirstData ] ).
      pause ( 3000 ).
      //Click on the Collections Title in the menu
      click ( "//ul/li/a[ text( ) = '"+ collectionTitle[ getFirstData ] +"']" ).
      pause ( 3000 ).
      useCss ( )
      for ( var getData = 1; getData < collectionTitle.length; getData++ ) {
        //Get the Current Total count in the Collections listing page
        CollectionsListAdd.getText ( '.content-count > strong', function ( currentCountResult ) {
          if ( currentCountResult.status !== -1 ) {
            currentCount = currentCountResult.value;
            currentCount = currentCount.substring ( 1, currentCount.length - 1 );
          }
          //Coverting data from getData to convertData
          if ( getData >= ( collectionTitle.length - 1 ) ) {
            var convertData = ( getData - ( collectionTitle.length - 1 ) );
            getData++;
          }
          CollectionsListAdd.pause ( 3000 ).useXpath ( ).
          //Verify the Collection Title is visible
          verify.containsText ( "//ul/li/a[ text( ) = '"+ contentTitle[ convertData ] +"']", contentTitle[ convertData ] ).
          pause ( 3000 ).
          //Click on the Collection Title
          click ( "//ul/li/a[ text( ) = '"+ contentTitle[ convertData ] +"']" ).
          pause ( 3000 ).useCss ( ).
          //Wait for Search input field is visible
          waitForElementVisible ( ".search-field-input", 3000,false ).
          //Verify the Search input field is visible
          verify.visible ( ".search-field-input" ).
          //Enter the search data in the field
          setValue ( ".search-field-input", searchContentTitle[ convertData ] ).
          keys ( CollectionsListAdd.Keys.ENTER ). // hold the control
          click ( ".search-field-input" ).
          keys ( CollectionsListAdd.Keys.NULL ). // release the control
          pause ( 3000 ).
          //Wait for collections list is visible
          waitForElementVisible ( "ul.content-menu > li:nth-child( 2 )", 3000, false ).
          pause ( 3000 ).
          //Verify the collections list is visible
          verify.visible ( "ul.content-menu > li:nth-child( 2 )" ).
          pause ( 3000 ).
          //Click on the Collections list
          click ( "ul.content-menu > li:nth-child( 2 )" ).
          pause ( 3000 ).
          //Wait for dialog box collections list is visible
          waitForElementVisible ( "dialog.dialog-small:nth-child( 1 )", 3000,false ).
          pause ( 3000 ).
          //Verify the dialog box collections list is visible
          verify.visible ( "dialog.dialog-small:nth-child( 1 )" ).
          pause ( 3000 ).
          useXpath ( ).
          //Verify the collections Title field is visible
          verify.containsText ( "//label[text ( )='"+ collectionTitle[ convertData ] +"']", collectionTitle[ convertData ] ).
          pause ( 3000 ).
          //Click on the Collections Title
          click ( "//label[text ( )='"+ collectionTitle[ convertData ] +"']" ).
          pause ( 3000 ).useCss ( ).
          //Wait for the Primary button is visible
          waitForElementVisible ( "button.btn-primary:nth-child( 2 )", 3000, false ).
          pause ( 3000 ).
          //Click on the Primary button
          click ( "button.btn-primary:nth-child( 2 )" ).
          pause ( 3000 ).
          useXpath ( ).
          //Verify the collections Title is visible
          verify.containsText ( "//ul/li/a[ text( ) = '"+ collectionTitle[ convertData ] +"']", collectionTitle[ convertData ] ).
          pause ( 3000 ).
          //Click on the collections Title is visible
          click ( "//ul/li/a[ text( ) = '"+ collectionTitle[ convertData ] +"']" ).
          pause ( 3000 ).
          useCss ( ).
          //Get the Actual Total count in the Collections listing page
          getText ( '.content-count > strong', function ( actualCountResult ) {
            if ( actualCountResult.status !== -1 ) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring ( 1, actualCount.length - 1 );
              expectedCount = ( ( +currentCount ) + ( +1 ) );
              if ( actualCount == expectedCount ) {                
                CollectionsListAdd.useXpath ( ).
                waitForElementVisible ( "//h2[contains ( .,'"+ searchContentTitle[ convertData ] +"')]", 3000, false ).
                getText ( "//h2[contains ( .,' "+ searchContentTitle[ convertData ] +"')]", function ( titleCheck ) {
                  if ( convertData > 0 ) {
                    var rowCount = convertData + 1;
                  }
                  var titleChecked = titleCheck.value;
                  CollectionsListAdd.useCss ( )
                  var collectionz = searchContentTitle[ convertData ]
                  if ( titleChecked === collectionz ) {
                    //Write in the Excel:PASS Result and Result
                    CollectionsListAdd.writeToExcelPass ( 'boxxspring.xlsx', 'CollectionslistAdd', rowCount, 5 );
                  }
                  else {
                    //Write in the Excel:FAIL Result and Result
                    CollectionsListAdd.writeToExcelFail ( 'boxxspring.xlsx', 'CollectionslistAdd', rowCount, 5, 6, "ActualResult: '"+ titleChecked +"' and ExpectedResult: should be'"+ collectionz +"' in the Search Content " );
                  }
                } );
              }
              else {
                //Write in the Excel:FAIL Result and Result
                CollectionsListAdd.writeToExcelFail ( 'boxxspring.xlsx', 'CollectionslistAdd', rowCount, 5, 6,  "ActualResult: '"+ actualCount +"' in the Total Count After Added New Collections List. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
              }
            }
          } );
          CollectionsListAdd.useXpath ( ).pause ( 3000 ).
          //Verify the collections Title is visible
          verify.containsText ( "//ul/li/a[ text( ) = '"+ collectionTitle[ convertData ] +"']", collectionTitle[ convertData ] ).
          pause ( 3000 ).
          //Click on the collections Title
          click ( "//ul/li/a[ text( ) = '"+ collectionTitle[ convertData ] +"']" ).
          pause ( 3000 ).
          useCss ( )
        } );
      }
    }
    //End the Browser
    CollectionsListAdd.end ( );
  }
}