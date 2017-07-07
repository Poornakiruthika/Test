//this function is for checking the video direct link and embed code 
var xlsx = require ( 'xlsx' );
var Excel = require ( 'exceljs' );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx', { cellStyles: true } );
var worksheet = workbook.Sheets [ 'Share' ];
//get the excel sheet data in each array
var url = [ ];
module.exports = {
  tags: ['share'],
  'Share': function ( share ) {
    //Read values from Excel sheet
    for ( z in worksheet ) {
      if ( z[ 0 ] === '!' ) continue;
      //Read URL from Excel sheet
      if ( z.includes ( 'A' ) ) {
        url.push ( worksheet[ z ].v );
      }
    }
    if ( url.length > 0 ) {
      console.log ( "Excel row count: " + url.length );
      for ( var excelColumn = 1, excelRow = 1; excelColumn != url.length; excelColumn++ ) {
        //click the video control button to play using custom commands
        share.share ( url[ excelColumn ] ).
        url ( function ( getUrl ) {
          var urlstr = getUrl.value;
          share.pause ( 5000 ).
          waitForElementVisible ( ".unimatrix-video-sharing-overlay", 2000 ).
          pause ( 20000 ).
          //compare the Direct link in the text area with the video URL
          getText ( ".unimatrix-video-sharing-overlay-container > textarea:nth-of-type( 1 )", function ( directLink ) {
            var directLinkUrl = directLink.value;
            if ( directLinkUrl == urlstr ) {
              this.verify.ok ( true, "Display Valid Direct link url in video sharing" );
              share.
              //filter the URL from the iframe tag in the Embed code text area
              getText ( ".unimatrix-video-sharing-overlay-container > textarea:nth-of-type( 2 )", function ( embedCode ) {
                var embedCodeUrl = embedCode.value.match ( urlstr );
                //compare the URL in the Embed Code with the video URL
                if ( embedCodeUrl == urlstr ) {
                  this.verify.ok ( true, "Display valid Embed code in video sharing textbox" );
                  share.writeToExcelPass ( 'videoplayer.xlsx', 'Share', ++excelRow, 2, 3 );
                }
                else {
                  this.verify.fail ( embedCodeUrl, urlstr, "Display invalid Embed code in video sharing textbox" );
                  share.writeToExcelFail ( 'videoplayer.xlsx', 'Share', ++excelRow, 2, 3, "ActualResult: '" + embedCodeUrl + "'. ExpectedResult: '" +
                    urlstr + "'. ( Display invalid Embed code in video sharing textbox )" );
                }
              } );
            }
            else {
              this.verify.fail ( directLinkUrl, urlstr, "Display invalid Direct link url in video sharing" );
              share.writeToExcelFail ( 'videoplayer.xlsx', 'Share', ++excelRow, 2, 3, "ActualResult: '" + directLinkUrl + "'. ExpectedResult: '" + urlstr +
                "'. ( Display invalid Direct link url in video sharing )" );
            }
          } );
        } );
      }
    }
    share.end ( );
  },
};