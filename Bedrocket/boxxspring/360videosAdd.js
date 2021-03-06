//this function is for check and add 360 videos
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ '360videosAdd' ];
var dragUrl = [ ];
var videoTitle = [ ];
var shortTitle = [ ];
var shortDesc = [ ];
var author = [ ];
var attribution = [ ];
var categoryName = [ ];
var shortNote = [ ];
var dragImg = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
var getData,rowCount,convertData = 1;
module.exports = {
  tags: [ '360videosAdd' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  '360videos Add': function ( videoThreeSixty ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read video URL
      if ( z.includes ( 'A' ) ) {
        dragUrl.push ( worksheet[ z ].v );
      }
      //Read Video Title
      if ( z.includes ( 'B' ) ) {
        videoTitle.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if ( z.includes ( 'C' ) ) {
        shortTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if ( z.includes ( 'D' ) ) {
        shortDesc.push ( worksheet[ z ].v );
      }
      //Read Author Name
      if ( z.includes ( 'E' ) ) {
        author.push ( worksheet[ z ].v );
      }
      //Read Attribution Name
      if ( z.includes ( 'F' ) ) {
        attribution.push ( worksheet[ z ].v );
      }
      //Read Category Name
      if ( z.includes ( 'G' ) ) {
        categoryName.push ( worksheet[ z ].v );
      }
      //Read Short Notes
      if ( z.includes ( 'H' ) ) {
        shortNote.push ( worksheet[ z ].v );
      }
      if ( z.includes ( 'I' ) ) {
        dragImg.push ( worksheet[ z ].v );
      }
    }
    if ( dragUrl.length > 1 ) {
      console.log ( dragUrl.length );  
      videoThreeSixty.pause ( 3000 ).
      useXpath ( ).
      //Verify the 360videos in CONTENT menu is visible
      verify.containsText ( "//ul/li/a[ text( ) = '360videos' ] ", "360videos" ).
      pause ( 3000 ).
      //Click on the 360videos in the CONTNET menu
      click ( "//ul/li/a[ text( ) = '360videos' ] " ).
      useCss ( ).
      pause ( 3000 ).
      //Get the Current Total count in the 360videos listing page before adding the story
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
        }
        for ( var getData = 1,rowCount = 1; getData < dragUrl.length; getData++ ) {
          videoThreeSixty.pause ( 3000 ).
          //Wait for the Add 360videos button is visible
          waitForElementVisible ( ".btn.btn-primary.btn-add", 3000, false ).
          pause ( 3000 ).
          //Verify the Add 360videos button is visible
          verify.visible ( ".btn.btn-primary.btn-add" ).
          pause ( 3000 ).
          //Click on the Add 360videos button in the listing page
          click ( ".btn.btn-primary.btn-add" ).
          pause ( 3000 ).
          //Set the 360video path and upload in the field
          setValue ( '.hidden-input > input:nth-child(1) ', require ( 'path' ).resolve ( dragUrl[ getData ] ) ).
          pause ( 17000 ).
          //Get the text for Error meassage for upload url
          getText ( '.unimatrix-video-controls', function ( uploaderror ) {
            if ( getData >= ( dragUrl.length - 1 ) ) {
              convertData = ( getData - ( dragUrl.length - 1 ) );
              getData++;
            }
            uploadErrorMsg = uploaderror.status;
            if ( uploaderror.status === -1 ) {
              uploadCount = uploaderror.value;
            }
            //Check the Given input condition should be match with in the expected conditions
            if ( ( uploadErrorMsg !== -1 ) && ( ( dragUrl[ convertData ].match ( /mpeg\b/g ) ) || ( dragUrl[ convertData ].match ( /mp4\b/g ) ) || ( dragUrl[ convertData ].match ( /wmv\b/g ) ) || ( dragUrl[ convertData ].match ( /mts\b/g ) ) || ( dragUrl[ convertData ].match ( /m2ts\b/g ) ) || ( dragUrl[ convertData ].match ( /mov\b/g ) ) ) ) {
              videoThreeSixty.pause ( 7000 ).
              //Check Video Preview
              verify.visible ( ".uploaded-image" ).
              //Check Video Title
              verify.visible ( ".wmd-input" ).
              pause ( 3000 ).
              //Verify the Delete Button
              verify.visible ( ".btn-delete" ).
              threevideoproperties ( videoTitle[ convertData ], shortTitle[ convertData ], shortDesc[ convertData ], categoryName[ convertData ], shortNote[ convertData ], dragImg[ convertData ], currentCount ).
              pause ( 3000 ).
              getText ( '.content-count > strong', function ( actualCountResult ) {
                if ( actualCountResult.status !== -1 ) {
                  var actualCount = actualCountResult.value;
                  actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                  var expectedCount = ( ( + currentCount ) + ( + 1 ) );
                  if ( actualCount == expectedCount ) {
                    //Write the Excel:PASS Result and Reason
                    videoThreeSixty.writeToExcelPass ( 'boxxspring.xlsx', '360videosAdd', ++rowCount, 11 );
                  }
                  else {
                    //Write the Excel:FAIL Result and Reason
                    videoThreeSixty.writeToExcelFail ( 'boxxspring.xlsx', '360videosAdd', ++rowCount, 11, 12,"ActualResult: '"+ actualCount +"' in the Total Count After Added New Categories. ExpectedResult: should be'"+ expectedCount +"' in the Total Count "  );
                  }
                }
              } );
            }
            else {
              //Check the Error message for Invalid url
              videoThreeSixty.waitForElementVisible ( '.field-error > span:nth-child(1) > span:nth-child(2) > span:nth-child(1) ', 5000, false ).
              //Get the Url Error message
              getText ( '.field-error > span:nth-child(1) > span:nth-child(2) > span:nth-child(1) ', function ( urlErrorMsg ) {
              	var errmsg = urlErrorMsg.value;
                var expectedmsg = "Invalid file type";
                if ( urlErrorMsg.status !== -1 ) {                  
                  if ( expectedmsg == errmsg ) {                    
                       videoThreeSixty.writeToExcelPass ( 'boxxspring.xlsx', '360videosAdd', ++rowCount, 11 );
                  }
                  else {
                    //Write the Excel:FAIL Result and Reason
                  videoThreeSixty.writeToExcelFail ( 'boxxspring.xlsx', '360videosAdd', ++rowCount, 11, 12, "ActualResult: '"+ errmsg +"' in the Total Count After Added 360video. ExpectedResult: should be'"+ expectedmsg +"' in the Total Count " );
                  }
                }
                else {
                  //Write the Excel:FAIL Result and Reason
                  videoThreeSixty.writeToExcelFail ( 'boxxspring.xlsx', '360videosAdd', ++rowCount, 11, 12, "Unsupported files are uploading in the 360videos Add page " );
                }
              } );
            }
            videoThreeSixty.useXpath ( ).
            pause ( 3000 ).
            //Verify the 360videos menu in the CONTENT is visible
            verify.containsText ( "//ul/li/a[ text( ) = '360videos' ] ", "360videos" ).
            pause ( 3000 ).
            //Click on the 360videos in the CONTENT menu
            click ( "//ul/li/a[ text( )  = '360videos' ] " ).
            useCss ( ).
            pause ( 3000 )
            if ( getData < dragUrl.length - 1 ) {
              videoThreeSixty.getText ( '.content-count > strong', function ( currentCountResult ) {
                if ( currentCountResult.status !== -1 ) {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
                }
                videoThreeSixty.pause ( 3000 ).
                //Wait for the Add button is visible
                waitForElementVisible ( ".btn.btn-primary.btn-add", 5000 , false ).
                //Verify the Add button in the 360videos listing page
                verify.visible ( ".btn.btn-primary.btn-add" ).
                //Click on the Add button in the 360videos listing page
                click ( ".btn.btn-primary.btn-add" )
              } );
            }
          } );
        }
      } );
    }
    //End the Browser
    videoThreeSixty.end ( );
  }
}