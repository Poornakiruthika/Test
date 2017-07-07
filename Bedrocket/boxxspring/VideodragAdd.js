//this function is for check and Add the Video Drag & Drop
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'VideodragAdd' ];
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
var getData,convertData,rowCount = 1;
module.exports = {
  tags: [ 'videodragAdd'],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;    
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Videodrag Add': function ( dragVideos ) {
    //Read values from excel
    for ( z in worksheet ) {
      if ( z [ 1 ] === '!' ) continue;
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
      //Read Thumbnail Image
      if ( z.includes ( 'I' ) ) {
        dragImg.push ( worksheet[ z ].v );
      }
    }
    if ( dragUrl.length > 1 ) {
      dragVideos.pause ( 3000 ).useXpath ( ).
      //Verify the Videos Menu in CONTENT is visible
      verify.containsText ( "//ul/li/a[ text( ) = 'Videos' ]" , "Videos" ).
      pause ( 3000 ).
      //Click on the Videos Menu in CONTENT
      click ( "//ul/li/a[ text( ) = 'Videos' ]" ).
      useCss ( ).pause ( 3000 ).
      //Get the Current Total Count in the Videos listing page
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
        }
        for ( var getData = 1,rowCount = 1; getData < dragUrl.length; getData++ ) {
          dragVideos.pause ( 3000 ).
          //Wait for the Add Video button is visible
          waitForElementVisible ( ".btn.btn-primary.btn-add" , 3000, false ).
          pause ( 3000 ).
          //Verift the Add Video button is visible
          verify.visible ( ".btn.btn-primary.btn-add" ).
          pause ( 3000 ).
          //Click on the Add Video button
          click ( ".btn.btn-primary.btn-add" ).
          pause ( 3000 ).
          //Check the Valid Input from spreadsheet
          setValue ( '.hidden-input > input:nth-child( 1 ) ' , require ( 'path' ).resolve ( dragUrl[ getData ] ) ).
          pause ( 200000 ).          
          getText ( '.unimatrix-video-controls', function ( uploaderror ) {
            if ( getData >= ( dragUrl.length - 1 ) ) {
              convertData = getData - ( dragUrl.length - 1 );
              getData++;
            }
            uploadErrorMsg = uploaderror.status;
            if ( uploaderror.status !== 0 ) {
              uploadCount = uploaderror.value;
            }
            if ( ( uploadErrorMsg === 0 ) && ( ( dragUrl[ convertData ].match ( /mpeg\b/g ) ) || ( dragUrl[ convertData ].match ( /mp4\b/g ) ) || ( dragUrl[ convertData ].match ( /wmv\b/g ) ) || ( dragUrl[ convertData ].match ( /mts\b/g ) ) || ( dragUrl[ convertData ].match ( /m2ts\b/g ) ) || ( dragUrl[ convertData ].match ( /mov\b/g ) ) ) ) {
              dragVideos.pause ( 5000 ).
              //Verify Video Preview
              verify.visible ( ".uploaded-image" ).
              //Verify Video Title
              verify.visible ( ".wmd-input" ).
              pause ( 3000 ).
              //Verify - delete Button
              verify.visible ( ".btn-delete" ).
              //Check and Enter the valid details in the Properties Tab:
              videodragproperties ( videoTitle[ convertData ], shortTitle[ convertData ], shortDesc[ convertData ], author[ convertData ], attribution[ convertData ], categoryName[ convertData ], shortNote[ convertData ], dragImg[ convertData ], currentCount ).
              pause ( 3000 ).
              //Check the Actual Count in the Total video count:
              getText ( '.content-count > strong', function ( actualCountResult ) {
                if ( actualCountResult.status !== -1 ) {
                  actualCount = actualCountResult.value;
                  actualCount = actualCount.substring ( 1, ( actualCount.length - 1 ) );
                  expectedCount = ( ( + currentCount ) + ( + 1 ) );
                  if ( actualCount == expectedCount ) {
                    //Write in the Spreadsheet: Pass Result:
                    dragVideos.writeToExcelPass ( 'boxxspring.xlsx' , 'VideodragAdd' , ++rowCount , 11 );
                  }
                  else {
                    //Write in the Spreadsheet: Fail Result:
                    dragVideos.writeToExcelFail ( 'boxxspring.xlsx' , 'VideodragAdd' , ++rowCount , 11 , 12 , "ActualResult: '"+ actualCount +"' in the Total Count After Added New Videos(Drag&Drop). ExpectedResult: should be'"+ expectedCount +"' in the Total Count "  );
                  }
                }
              } );
            }
            else {
              dragVideos.waitForElementVisible ( '.field-error > span:nth-child( 1 )  > span:nth-child( 2 )  > span:nth-child( 1 ) ', 3000, false ).
              getText ( '.field-error > span:nth-child( 1 )  > span:nth-child( 2 )  > span:nth-child( 1 ) ', function ( urlErrorMsg ) {
                if ( urlErrorMsg.status !== -1 ) {
                  var errmsg = urlErrorMsg.value;
                  var expectedmsg = "Invalid file type";
                  if ( expectedmsg == errmsg ) {
                    workbook1.xlsx.readFile ( 'boxxspring.xlsx', {
                        cellStyles: true
                      } )
                      .then ( function (  ) {
                        var worksheet1 = workbook1.getWorksheet ( 'VideodragAdd' );
                        var row = worksheet1.getRow ( ++rowCount );
                        row.getCell ( 11 ).font = {
                          bold: true,
                          color: {
                            argb: '0c891e'
                          }
                        };
                        row.alignment = {
                          wrapText: true
                        }
                        //Write in the Spreadsheet: Invalid - Input Pass Result:
                        row.getCell ( 11 ).value = 'PASS';
                        row.hidden = false;
                        row.getCell ( 12 ).font = {
                          color: {
                            argb: '0c891e'
                          }
                        };
                        row.alignment = {
                          wrapText: true
                        }
                        //Write in the Spreadsheet: Invalid - Input Pass Reason:
                        row.getCell ( 12 ).value = " Invalid URL is not accepted in the field ";
                        result.push ( 'Invalid-input-passed' );
                        for ( var col = 1; col < 50; col++ )  {
                        worksheet1.getColumn ( col ).hidden = false;
                        for ( var rows = 1; rows < 50; rows++ )  {
                          worksheet1.getRow ( rows ).hidden = false;
                        }
                      }
                        workbook1.xlsx.writeFile ( 'boxxspring.xlsx' );
                        row.commit ( );
                      } );
                  }
                  else {
                    //Write in the Spreadsheet: PASS Result
                    dragVideos.writeToExcelPass ( 'boxxspring.xlsx', 'VideodragAdd', ++rowCount, 11 );
                  }
                }
                else {
                  //Write in the Spreadsheet: FAIL Result and Reason
                  dragVideos.writeToExcelFail ( 'boxxspring.xlsx' , 'VideodragAdd' , ++rowCount , 11 , 12 , "Failed overall else"  );                  
                }
              } );
            }
            dragVideos.useXpath ( ).
            pause ( 3000 ).
            //Verify the Video menu in Content is visible
            verify.containsText ( "//ul/li/a[ text( ) = 'Videos' ]", "Videos" ).
            pause ( 3000 ).
            //Click on the Video menu in Content
            click ( "//ul/li/a[ text( ) = 'Videos' ]" ).
            useCss ( ).
            pause ( 3000 )
            // Check the spreadsheet input value
            if ( getData < dragUrl.length - 1 ) {
              dragVideos.getText ( '.content-count > strong', function ( currentCountResult ) {
                if ( currentCountResult.status !== -1 ) {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring ( 1, ( currentCount.length - 1 ) );
                }
                dragVideos.pause ( 3000 ).
                //Wait for the Add Video is visible
                waitForElementVisible ( ".btn.btn-primary.btn-add", 3000, false ).
                //Verify the Add Video button is visible
                verify.visible ( ".btn.btn-primary.btn-add" ).
                //Click on the Add video Button
                click ( ".btn.btn-primary.btn-add" )
              } );
            }
          } );
        }
      } );
    }
    //End the Browser
    dragVideos.end ( );
  }
}