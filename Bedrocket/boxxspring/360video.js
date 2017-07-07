var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if  ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ '360video' ];
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
var convertData;
module.exports = {
  tags: [ '360video' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  '360Videos': function ( videoThreeSixty ) {
    //Read values from excel
    for  ( z in worksheet ) {
      if  ( z[ 1 ] === '!' ) continue;
      //Read video URL
      if  ( z.includes ( 'A' ) ) {
        dragUrl.push ( worksheet[ z ].v );
      }
      //Read Video Title
      if  ( z.includes ( 'B' ) ) {
        videoTitle.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if  ( z.includes ( 'C' ) ) {
        shortTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if  ( z.includes ( 'D' ) ) {
        shortDesc.push ( worksheet[ z ].v );
      }
      //Read Author Name
      if  ( z.includes ( 'E' ) ) {
        author.push ( worksheet[ z ].v );
      }
      //Read Attribution Name
      if  ( z.includes ( 'F' ) ) {
        attribution.push ( worksheet[ z ].v );
      }
      //Read Category Name
      if  ( z.includes ( 'G' ) ) {
        categoryName.push ( worksheet[ z ].v );
      }
      //Read Short Notes
      if  ( z.includes ( 'H' ) ) {
        shortNote.push ( worksheet[ z ].v );
      }
      if  ( z.includes ( 'I' ) ) {
        dragImg.push ( worksheet[ z ].v );
      }
    }
    if  ( dragUrl.length > 1 ) {
      console.log ( dragUrl.length );
      var rowCount = 1;
      //Search for 360videos
      videoThreeSixty.pause ( 5000 ).
      useXpath ( ).
      verify.containsText ( "//ul/li/a[ text( ) = '360videos' ] ", "360videos" ).
      pause ( 3000 ).
      click ( "//ul/li/a[ text( ) = '360videos' ] " ).
      useCss ( ).
      pause ( 5000 ).
      getText ( '.content-count > strong', function ( currentCountResult ) {
        if  ( currentCountResult.status !== -1 ) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1, currentCount.length - 1 );
        }
        for  ( var getData = 1; getData < dragUrl.length; getData++ ) {
          videoThreeSixty.pause ( 5000 ).
          waitForElementVisible ( ".btn.btn-primary.btn-add", 5000, false ).
          pause ( 5000 ).
          verify.visible ( ".btn.btn-primary.btn-add" ).
          pause ( 5000 ).
          click ( ".btn.btn-primary.btn-add" ).
          pause ( 5000 ).
          setValue ( '.hidden-input > input:nth-child(1) ', require ( 'path' ).resolve ( dragUrl[ getData ] ) ).
          pause ( 150000 )
          var convertData = 0;
          videoThreeSixty.getText ( '.unimatrix-video-controls', function ( uploaderror ) {
            if  ( getData >=  ( dragUrl.length - 1 ) ) {
              convertData =  ( getData -  ( dragUrl.length - 1 ) );
              getData++;
            }
            uploadErrorMsg = uploaderror.status;
            if  ( uploaderror.status === -1 ) {
              uploadCount = uploaderror.value;
            }
            if  (  ( uploadErrorMsg !== -1 ) &&  (  ( dragUrl[ convertData ].match ( /mpeg\b/g ) ) ||  ( dragUrl[ convertData ].match ( /mp4\b/g ) ) ||  ( dragUrl[ convertData ].match ( /wmv\b/g ) ) ||  ( dragUrl[ convertData ].match ( /mts\b/g ) ) ||  ( dragUrl[ convertData ].match ( /m2ts\b/g ) ) ||  ( dragUrl[ convertData ].match ( /mov\b/g ) ) ) ) {
              videoThreeSixty.pause ( 10000 ).
              //Check Video Preview
              verify.visible ( ".uploaded-image" ).
              //Check Video Title
              verify.visible ( ".wmd-input" ).
              pause ( 5000 ).
              //Verify the Delete Button
              verify.visible ( ".btn-delete" ).
              threevideoproperties ( videoTitle[ convertData ], shortTitle[ convertData ], shortDesc[ convertData ], categoryName[ convertData ], shortNote[ convertData ], dragImg[ convertData ], currentCount ).
              pause ( 5000 ).
              getText ( '.content-count > strong', function ( actualCountResult ) {
                if  ( actualCountResult.status !== -1 ) {
                  actualCount = actualCountResult.value;
                  actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                  expectedCount =  (  ( + currentCount ) +  ( + 1 ) );
                  if  ( actualCount == expectedCount ) {
                    videoThreeSixty.writeToExcelPass ( 'boxxspring.xlsx', '360video', ++rowCount, 11, 12 );
                  }
                  else {
                    videoThreeSixty.writeToExcelFail ( 'boxxspring.xlsx', '360video', ++rowCount, 11, 12, actualCount, expectedCount );
                  }
                }
              } );
            }
            else {
              videoThreeSixty.waitForElementVisible ( '.field-error > span:nth-child(1) > span:nth-child(2) > span:nth-child(1) ', 15000, false ).
              getText ( '.field-error > span:nth-child(1) > span:nth-child(2) > span:nth-child(1) ', function ( urlErrorMsg ) {
                if  ( urlErrorMsg.status !== -1 ) {
                  var errmsg = urlErrorMsg.value;
                  var expectedmsg = "Invalid file type";
                  if  ( expectedmsg == errmsg ) {
                    workbook1.xlsx.readFile ( 'boxxspring.xlsx', {
                        cellStyles: true
                      } )
                      .then ( function ( ) {
                        var worksheet1 = workbook1.getWorksheet ( '360video' );
                        var row = worksheet1.getRow ( ++rowCount );
                        row.getCell ( 11 ).font = {
                          bold: true,
                          color: {
                            argb: 'FF6BD92E'
                          }
                        };
                        row.alignment = {
                          wrapText: true
                        }
                        row.getCell ( 11 ).value = 'Invalid-input-passed';
                        row.hidden = false;
                        row.getCell ( 12 ).font = {
                          color: {
                            argb: 'FFFF0000'
                          }
                        };
                        row.alignment = {
                          wrapText: true
                        }
                        row.getCell ( 12 ).value = " Invalid URL is not accepted in the field ";
                        result.push ( 'Invalid-input-passed' );
                        for  ( var col = 1; col < 50; col++ )  {
                        worksheet1.getColumn ( col ).hidden = false;
                        for  ( var rows = 1; rows < 50; rows++ )  {
                          worksheet1.getRow ( rows ).hidden = false;
                        }
                      }
                        workbook1.xlsx.writeFile ( 'boxxspring.xlsx' );
                        row.commit ( );
                      } );
                  }
                  else {
                    videoThreeSixty.writeToExcelPass ( 'boxxspring.xlsx', '360video', ++rowCount, 11, 12 );
                  }
                }
                else {
                  videoThreeSixty.writeToExcelFail ( 'boxxspring.xlsx', '360video', ++rowCount, 11, 12, actualCount, currentCount );
                }
              } );
            }
            videoThreeSixty.useXpath ( ).
            pause ( 5000 ).
            verify.containsText ( "//ul/li/a[ text( ) = '360videos' ] ", "360videos" ).
            pause ( 5000 ).
            click ( "//ul/li/a[ text( )  = '360videos' ] " ).
            useCss ( ).
            pause ( 5000 )
            if  ( get getData < dragUrl.length - 1 ) {
              videoThreeSixty.getText ( '.content-count > strong', function ( currentCountResult ) {
                if  ( currentCountResult.status !== -1 ) {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring ( 1, currentCount.length - 1 );
                }
                videoThreeSixty.pause ( 5000 ).
                waitForElementVisible ( ".btn.btn-primary.btn-add", 5000 , false ).
                verify.visible ( ".btn.btn-primary.btn-add" ).
                click ( ".btn.btn-primary.btn-add" )
              } );
            }
          } );
        }
      } );
    }
    videoThreeSixty.end ( );
  }
}