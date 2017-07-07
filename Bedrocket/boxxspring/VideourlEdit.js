//this function is for check and Edit the Videos URL
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'VideourlEdit' ];
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
var result = [ ];
var rowCount,convertData,rowCount = 1;
var actualCount,searchCount;
var currentCount;
module.exports = {
  tags: [ 'videourlEdit' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Videourl Edit': function ( videoEdit ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z [ 1 ] === '!' ) continue;
      //Read Video Title
      if ( z.includes ( 'A' ) ) {
        videoTitle.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if ( z.includes ( 'B' ) ) {
        shortTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if ( z.includes ( 'C' ) ) {
        shortDesc.push ( worksheet[ z ].v );
      }
      //Read Author Name
      if ( z.includes ( 'D' ) ) {
        author.push ( worksheet[ z ].v );
      }
      //Read Attribution Name
      if ( z.includes ( 'E' ) ) {
        attribution.push ( worksheet[ z ].v );
      }
      //Read Category Name
      if ( z.includes ( 'F' ) ) {
        categoryName.push ( worksheet[ z ].v );
      }
      //Read Short Notes
      if ( z.includes ( 'G' ) ) {
        shortNote.push ( worksheet[ z ].v );
      }
      //Read Thumbnail Image
      if ( z.includes ( 'H' ) ) {
        dragImg.push ( worksheet[ z ].v );
      }      
    }
    if ( videoTitle.length > 1 ) {      
      videoEdit.pause ( 3000 ).useXpath ( ).
      //Verify the videos menu in content is visible
      verify.containsText ( "//ul/li/a[ text( ) = 'Videos'] ", "Videos" ).
      pause ( 3000 ).
      //Click on videos menu in content
      click ( "//ul/li/a[ text( ) = 'Videos'] " ).
      useCss ( ).pause ( 3000 ).      
      //Get the Current Total Count  in videos listing page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
          console.log ( 'Count - Before adding video: ', + currentCount )
        }
        for ( var getData = 1,rowCount = 1; getData < videoTitle.length; getData++ ) {
          //Wait for the Saerch input field is visible
          videoEdit.pause ( 3000 ).waitForElementVisible ( ".search-field-input", 3000, false ).
          //Verify the Search input field is visible
          verify.visible ( ".search-field-input" ).
          //Enter the Data in search input field
          setValue ( ".search-field-input", videoTitle[ getData ] )
          videoEdit.keys ( videoEdit.Keys.ENTER ). // hold the control
          //Click on the Search field input
          click ( ".search-field-input" ).
          keys ( videoEdit.Keys.NULL ). // release the control
          pause ( 3000 ).
          waitForElementVisible ( ".content-count>strong", 3000, false ).
          //Get the searched data Total Count  in videos listing page
          getText ( '.content-count > strong', function ( searchCountResult ) {
            if ( getData >= videoTitle.length ) {
              convertData = getData - ( videoTitle.length - 1 );
              getData++;
            }
            if ( searchCountResult.status !== -1 ) {
              searchCount = searchCountResult.value;
              searchCount = searchCount.substring ( 1, ( searchCount.length - 1 ) );
            }
            //Check IF Searched Video Count is greater than zero,it will continue in the statement or it will be move else part
            if ( searchCount > 0 ) {
              videoEdit.pause ( 3000 ).
              //Wait for the List visbile
              waitForElementVisible ( ".list", 3000, false ).
              pause(3000).
              //Click on the List option in the Video listing page
              click(".list").
              pause(3000).useXpath().
              //Wait for the Edit pullout button in the video listing page
              waitForElementVisible ( "(//h2[@class='ng-binding'])[1]", 3000, false ).
              pause ( 3000 ).
              //Click on the Edit pullout button in the video listing page
              click ( "(//h2[@class='ng-binding'])[1]" ).
              pause ( 12000 ).useCss().
              //Verify the Content tab is visible
              verify.visible ( ".video-tabs > a[ href='#content' ]" ).
              //Click on the Content Tab in Videos page
              click ( ".video-tabs > a[ href='#content' ]" ).
              pause ( 3000 ).
              //Check and Enter Valid input in the Properties Tab
              editproperties ( videoTitle[ convertData ], shortTitle[ convertData ], shortDesc[ convertData ], author[ convertData ], attribution[ convertData ], categoryName[ convertData ], shortNote[ convertData ], dragImg[ convertData ], currentCount ).
              //Search for videos content menu
              useXpath ( ).
              pause ( 3000 ).
              //Verify the Videos in the CONTENT menu
              verify.containsText ( "//ul/li/a[ text( ) = 'Videos' ] ", "Videos" ).
              pause ( 3000 ).
              //Click on the Videos in CONTENT Menu
              click ( "//ul/li/a[text( ) = 'Videos' ] " ).
              useCss ( ).
              pause ( 3000 ).
              //Get Actual count in the total Videos count after edited
              getText ( '.content-count > strong', function ( actualCountResult ) {
                if ( actualCountResult.status !== -1 ) {
                  actualCount = actualCountResult.value;
                  actualCount = actualCount.substring ( 1, ( actualCount.length - 1 ) );
                 
                  if ( actualCount == currentCount ) {
                    //Write in the spreadsheet: PASS Result and Reason
                    videoEdit.writeToExcelPass ( 'boxxspring.xlsx', 'VideourlEdit', ++rowCount, 11 );
                  }
                  else {
                    //Write in the spreadsheet: FAIL Result and Reason
                    videoEdit.writeToExcelFail ( 'boxxspring.xlsx', 'VideourlEdit', ++rowCount, 11, 12,  "ActualResult: '"+ actualCount +"' in the Total Count After Videos URL Edit. ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
                  }
                }
              } );
            }
            else {
              //Write in the spreadsheet: FAIL Result and Reason
              videoEdit.writeToExcelFail ( 'boxxspring.xlsx', 'VideourlEdit', ++rowCount, 11, 12, "Searched Result Count,'"+ searchCount +"'" );
            }
            if ( getData < videoTitle.length - 1 ) {
              videoEdit.getText ( '.content-count > strong', function ( currentCountResult ) {
                if ( currentCountResult.status !== -1 ) {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
                }
              } );
            }
          } );
        }
      } );
    }
    //End the Browser
    videoEdit.end ( );
  }
}