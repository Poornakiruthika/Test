//this function is for check and Add the Videos URL 
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs-rtl' );
var workbook1 = new Excel.Workbook ( );
if ( typeof require !== 'undefined' )  XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets [ 'VideourlAdd' ] ;
var videoUrl =  [ ] ;
var videoTitle =  [ ] ;
var shortTitle =  [ ] ;
var shortDesc =  [ ] ;
var author =  [ ] ;
var attribution =  [ ] ;
var categoryName =  [ ] ;
var shortNote =  [ ] ;
var dragImg =  [ ] ;
var result =  [ ] ;
var currentCount;
var getData,rowCount = 1;
var expectedCount;
var actualCount;
module.exports = {
  tags:  [ 'videourlAdd' ] ,
  //Login in to Application
  before: function ( portallogin )  {
    var profile = portallogin.globals.profile;
    portallogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Videourl Add': function ( urlVideo )  {
    //Read values from excel
    for ( z in worksheet )  {
      if ( z [ 1 ]  === '!' )  continue;
      //Read video URL
      if ( z.includes ( 'A' ) )  {
        videoUrl.push ( worksheet [ z ].v );
      }
      //Read Video Title
      if ( z.includes ( 'B' ) )  {
        videoTitle.push ( worksheet [ z ].v );
      }
      //Read Short Title
      if ( z.includes ( 'C' ) )  {
        shortTitle.push ( worksheet [ z ].v );
      }
      //Read Short Description
      if ( z.includes ( 'D' ) )  {
        shortDesc.push ( worksheet [ z ].v );
      }
      //Read Author Name
      if ( z.includes ( 'E' ) )  {
        author.push ( worksheet [ z ].v );
      }
      //Read Attribution Name
      if ( z.includes ( 'F' ) )  {
        attribution.push ( worksheet [ z ].v );
      }
      //Read Category Name
      if ( z.includes ( 'G' ) )  {
        categoryName.push ( worksheet [ z ].v );
      }

      //Read Short Notes
      if ( z.includes ( 'H' ) )  {
        shortNote.push ( worksheet [ z ].v );
      }
      //Read Replace Thumbnail
      if ( z.includes ( 'I' ) )  {
        dragImg.push ( worksheet [ z ].v );
      }
    }
    if ( videoUrl.length > 1 )  {
      urlVideo.pause ( 4000 ).
      useXpath ( ).
      //Verify the Videos menu in CONTENT is visible
      verify.containsText ( "//ul/li/a[ text ( ) = 'Videos' ] " , "Videos" ).
      pause ( 4000 ).
      //Click on the Videos Menu in CONTENT
      click ( "//ul/li/a[ text ( ) = 'Videos' ] " ).
      useCss ( ).pause ( 4000 ).
      //Getting Current Total video count
      getText ( '.content-count > strong', function ( currentCountResult )  {
        if ( currentCountResult.status !== -1 )  {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring ( 1 , ( currentCount.length - 1 ) );
        }
        //Verify and click Add videos button 
        urlVideo.waitForElementVisible ( ".btn.btn-primary.btn-add", 4000, false ).
        verify.visible ( ".btn.btn-primary.btn-add" ).
        pause ( 4000 ).
        click ( ".btn.btn-primary.btn-add" ).
        pause ( 4000 ) 
        for ( var getData = 1,rowCount=1; getData < videoUrl.length; getData++ )  {
          //Wait for the Video url field is visible
          urlVideo.waitForElementVisible ( "#video_url" , 4000, false ).
          pause ( 4000 ).
          //Verify the Video url field is visible
          verify.visible ( "#video_url" ).
          pause ( 4000 ).
          //Enter the Video url in the Field
          setValue ( "#video_url" , videoUrl [ getData ]  ) 
          //Check and valid the URL from given spreadsheet input URL
          if ( videoUrl [ getData ].match ( /www.dailymotion.com/g )  || ( videoUrl [ getData ].match ( /www.youtube.com/g ) )  || ( videoUrl [ getData ].match ( /www.youtube.com/g ) )  )  {
            urlVideo.pause ( 4000 ).
            //Wait for the Video Preview field is visible
            waitForElementVisible ( '.video-preview', 4000, false ).
            //Verify the Video Preview field is visible
            verify.visible ( ".video-preview" ).
            //Verify the Video Title is visible
            verify.visible ( ".video-title" ).
            //Verify the save button is visible
            verify.visible ( ".edit-form > div >.btn-primary" ) 
            //Check in the Properties Tab for verifying all the fields:
            urlVideo.videoproperties ( videoTitle [ getData ] , shortTitle [ getData ] , shortDesc [ getData ] , author [ getData ] , attribution [ getData ] , categoryName [ getData ] , shortNote [ getData ] , dragImg [ getData ] , currentCount ).
            pause ( 4000 ).
            //Check the Actual Count after each video added
            getText ( '.content-count > strong', function ( actualCountResult )  {
              if ( actualCountResult.status !== -1 )  {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                expectedCount = ( ( +currentCount )  + ( +1 ) );
                if ( actualCount == expectedCount )  {
                  //Write in the spreadsheet: Pass Result and Reason
                  urlVideo.writeToExcelPass ( 'boxxspring.xlsx' , 'VideourlAdd' , ++rowCount , 11 );
                }
                else {
                  //Write in the spreadsheet: Fail Result and Reason
                  urlVideo.writeToExcelFail ( 'boxxspring.xlsx' , 'VideourlAdd' , ++rowCount , 11 , 12 ,"ActualResult: '"+ actualCount +"' in the Total Count After Added New Videos(URL). ExpectedResult: should be'"+ expectedCount +"' in the Total Count " );
                }
              }
            } );
            //Check the input after each video added
            if ( getData < videoUrl.length - 1 )  {
              urlVideo.getText ( '.content-count > strong', function ( currentCountResult )  {
                if ( currentCountResult.status !== -1 )  {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring ( 1 , currentCount.length - 1 );
                }
                urlVideo.pause ( 4000 ).
                //Check and click on Add Video button
                waitForElementVisible ( ".btn.btn-primary.btn-add" , 4000, false ).
                verify.visible ( ".btn.btn-primary.btn-add" ).
                click ( ".btn.btn-primary.btn-add" ) 
              } );
            }
          }
          else {
            //Check the Invalid URL and total video count
            urlVideo.pause ( 4000 ).
            waitForElementVisible ( '.field-error > span:nth-child( 1 ) > span:nth-child( 2 ) > span:nth-child( 1 ) ', 7000, false ).
            getText ( '.field-error > span:nth-child( 1 ) > span:nth-child( 2 ) > span:nth-child( 1 ) ', function ( urlErrorMsg )  {
              if ( urlErrorMsg.status !== -1 )  {
                var errmsg = urlErrorMsg.value;
                var expectedmsg = "Please enter a valid URL.";
                if ( expectedmsg == errmsg )  {
                  urlVideo.pause ( 7000 );
                  //Write in the spreadsheet: Invalid url pass Result and Reason
                  workbook1.xlsx.readFile ( 'boxxspring.xlsx' , {
                      cellStyles: true
                    } ) 
                   .then ( function (  )  {
                      var worksheet1 = workbook1.getWorksheet ( 'VideourlAdd' );
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
                      row.getCell ( 11 ).value = "PASS";
                      row.getCell ( 12 ).font = {
                        color: {
                          argb: '0c891e'
                        }
                      };
                      row.getCell ( 12 ).value = "Invalid Url alert is displayed in the Videos";
                      result.push ( 'Invalid URL Passed' );
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
                  urlVideo.pause ( 4000 ).
                  //Write in the spreadsheet: Invalid url pass Result and Reason
                  writeToExcelFail ( 'boxxspring.xlsx' , 'VideourlAdd' , ++rowCount , 11 , 12 ,"Invalid Url alert is not displayed in the Videos" );                      
                }
              }
            } );
            urlVideo.pause ( 4000 ).
            useXpath ( ).
            //Verify and click on the video content menu
            verify.containsText ( "//ul/li/a[ text ( )  = 'Videos'] " , "Videos" ).
            pause ( 4000 ).
            click ( "//ul/li/a[ text( )  = 'Videos'] " ).
            useCss (  ).
            pause ( 4000 ) 
            //check on the total videos count
            if ( getData < videoUrl.length - 1 )  {
              urlVideo.getText ( '.content-count > strong' , function ( currentCountResult )  {
                if ( currentCountResult.status !== -1 )  {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring ( 1 , currentCount.length - 1 );
                }
                urlVideo.pause ( 4000 ).
                //Wait for the Add video button is visible
                waitForElementVisible ( ".btn.btn-primary.btn-add", 4000,false ).
                //Verify the Add video button is visible
                verify.visible ( ".btn.btn-primary.btn-add" ).
                //Click on the Add video button
                click ( ".btn.btn-primary.btn-add" ) 
              } );
            }
          }
        }
      } );
    }
    //End the browser
    urlVideo.end ( );
  }
}