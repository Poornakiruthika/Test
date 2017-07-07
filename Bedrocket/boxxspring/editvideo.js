var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if  ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'editvideo' ];
var videoTitle = [ ];
var shortTitle = [ ];
var shortDesc = [ ];
var author = [ ];
var attribution = [ ];
var categoryName = [ ];
var categoryType = [ ];
var shortNote = [ ];
var description = [ ];
var dragImg = [ ];
var videoTitleSearch = [ ];
var result = [ ];
var rowCount = 1;
var convertData = 1;
var currentCount;
var actualCount;
module.exports = {
  tags: [ 'editvideo' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'EditVideo': function ( videoEdit ) {
    //Read values from excel
    for  ( z in worksheet ) {
      if  ( z [ 1 ] === '!' ) continue;
      //Read Video Title
      if  ( z.includes ( 'A' ) ) {
        videoTitle.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if  ( z.includes ( 'B' ) ) {
        shortTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if  ( z.includes ( 'C' ) ) {
        shortDesc.push ( worksheet[ z ].v );
      }
      //Read Author Name
      if  ( z.includes ( 'D' ) ) {
        author.push ( worksheet[ z ].v );
      }
      //Read Attribution Name
      if  ( z.includes ( 'E' ) ) {
        attribution.push ( worksheet[ z ].v );
      }
      //Read Category Name
      if  ( z.includes ( 'F' ) ) {
        categoryName.push ( worksheet[ z ].v );
      }
      //Read Short Notes
      if  ( z.includes ( 'G' ) ) {
        shortNote.push ( worksheet[ z ].v );
      }
      //Read Thumbnail Image
      if  ( z.includes ( 'H' ) ) {
        dragImg.push ( worksheet[ z ].v );
      }
      //Read Search Videos Title
      if  ( z.includes ( 'I' ) ) {
        videoTitleSearch.push ( worksheet[ z ].v );
      }
    }
    if  ( videoTitle.length > 1 ) {
      //Verify and click on videos menu in content
      videoEdit.pause ( 5000 ).
      useXpath (  ).
      verify.containsText ( "//ul/li/a[ text( ) = 'Videos'] ", "Videos" ).
      pause ( 5000 ).
      click ( "//ul/li/a[ text( ) = 'Videos'] " ).
      useCss ( ).
      pause ( 5000 ).      
      //Check the Total Video Count before edited
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if  ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, currentCount.length - 1 );
          console.log ( 'Count - Before adding video: ', + currentCount )
        }
        for  ( var getData = 1; getData < videoTitle.length; getData++ ) {
          videoEdit.pause ( 9000 ).waitForElementVisible ( ".search-field-input", 5000 ).
          verify.visible ( ".search-field-input" ).
          setValue ( ".search-field-input", videoTitle[ getData ] )
          videoEdit.keys ( videoEdit.Keys.ENTER ). // hold the control
          //Click on the Search field input
          click ( ".search-field-input" ).
          keys ( videoEdit.Keys.NULL ). // release the control
          pause ( 5000 ).
          waitForElementVisible ( ".content-count>strong", 5000, false ).
          var convertData = 0;
          //Check the Searched Video Count
          videoEdit.getText ( '.content-count > strong', function ( currentCountResult ) {
            if  ( getData >= videoTitle.length ) {
              convertData = getData - videoTitle.length;
              getData++;
            }
            if  ( currentCountResult.status !== -1 ) {
              searchCount = currentCountResult.value;
              searchCount = searchCount.substring ( 1, searchCount.length - 1 );
            }
            //Check IF Searched Video Count is greater than zero,it will continue in the statement or it will be move else part
            if  ( searchCount > 0 ) {
              videoEdit.pause ( 5000 ).
              waitForElementVisible ( ".list", 5000, false ).
              pause(3000).
              click(".list").
              pause(3000).
              waitForElementVisible ( ".btn-pullout", 5000, false ).
              pause ( 5000 ).
              moveToElement ( ".btn-pullout", 0, 0 ).
              pause ( 5000 ).
              click ( ".btn-pullout" ).
              pause ( 5000 )
              videoEdit.pause ( 5000 ).
              verify.visible ( ".video-tabs > a[ href='#content' ]" ).
              //Click on the Content Tab in Videos page
              click ( ".video-tabs > a[ href='#content' ]" ).
              pause ( 5000 ).
              //Check and Enter Valid input in the Properties Tab
              editproperties ( videoTitle[ convertData ], shortTitle[ convertData ], shortDesc[ convertData ], author[ convertData ], attribution[ convertData ], categoryName[ convertData ], shortNote[ convertData ], dragImg[ convertData ], currentCount ).
              //Search for videos content menu
              useXpath ( ).
              pause ( 5000 ).
              verify.containsText ( "//ul/li/a[ text( ) = 'Videos' ] ", "Videos" ).
              pause ( 5000 ).
              click ( "//ul/li/a[text( ) = 'Videos' ] " ).
              useCss ( ).
              pause ( 5000 ).
              //Get Actual count in the total Videos count after edited
              getText ( '.content-count > strong', function ( actualCountResult ) {
                if  ( actualCountResult.status !== -1 ) {
                  actualCount = actualCountResult.value;
                  actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                  rowCount = 0;
                  if  ( actualCount == currentCount ) {
                    //Write in the spreadsheet: Pass Result and Reason
                    videoEdit.writeToExcelPass ( 'boxxspring.xlsx', 'editvideo', ++rowCount, 11, 12 );
                  }
                  else {
                    //Write in the spreadsheet: Fail Result and Reason
                    videoEdit.writeToExcelFail ( 'boxxspring.xlsx', 'editvideo', ++rowCount, 11, 12, actualCount, currentCount );
                  }
                }
              } );
            }
            else {
              //Write in the spreadsheet: Fail Result and Reason
              videoEdit.writeToExcelFailSearch ( 'boxxspring.xlsx', 'editvideo', ++rowCount, 11, 12, searchCount );
            }
            if  ( getData < videoTitle.length - 1 ) {
              videoEdit.getText ( '.content-count > strong', function ( currentCountResult ) {
                if  ( currentCountResult.status !== -1 ) {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring ( 1, currentCount.length - 1 );
                }
              } );
            }
          } );
        }
      } );
    }
    videoEdit.end ( );
  }
}