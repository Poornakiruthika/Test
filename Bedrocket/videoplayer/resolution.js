var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require('exceljs');
var workbook1 = new Excel.Workbook( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx', {cellStyles: true});
var worksheet = workbook.Sheets['Resolution'];
var url = [ ];
var pixel = [ ];
var result = [ ];
module.exports = {
  tags: ['resolution'],
 'Player-Resolution' : function ( resolution ) {
      //Read values from Excel File
      for ( z in worksheet ) {
        if ( z[ 0 ] === '!' ) continue;
        //Read URL
        if ( z.includes ( 'A' ) ) {
          url.push ( worksheet[ z ].v );
        }
        //Read HD pixel
        if ( z.includes ( 'B' ) ) {
          pixel.push ( worksheet[ z ].v );
        } 
      }

    if ( url.length > 0 ) {
      console.log  ( "Excel row count: " +url.length );
      for ( var i = 0, j = 0; i != url.length; i++  ) {
        resolution.url( url[ i ] ).
        playvideo().
    waitForElementVisible( ".unimatrix-video-control-bar >.unimatrix-video-sourceGroups-button", 9000 ).
    pause( 9000 ).
	//Click the pixel in the video source group button
    moveToElement( ".unimatrix-video-sourceGroups-button", 0, 0 ).
    waitForElementVisible( "div[data-name='" + pixel[ i ] + "']", 9000 ).
    click( "div[data-name='" + pixel[ i ] + "']" ).
    pause( 600 )
	//Check the video start playing from the beginning after selecting the pixel
    resolution.getText( ".unimatrix-video-current-time-display > span", function ( currenttime ) {
      if ( currenttime.value == '00:00' || this.verify.visible( ".unimatrix-video-controls-indicator" ) ) {
        console.log( "Refresh and Playing from the beginning" );
            resolution.pause( 9000 ).
        //Verify the selected pixel and the video pixel are same
        getAttribute(".unimatrix-video-sourceGroups > div.active", "data-name", function( playerResolution ) {
          console.log(playerResolution.value);
          console.log( pixel[ i ]);
          if ( playerResolution.value.equal( pixel[ i ] ) ) {
          workbook1.xlsx.readFile('videoplayer.xlsx', {cellStyles: true})
              .then(function() {
              var worksheet1 = workbook1.getWorksheet('resolution');
              var row = worksheet1.getRow(++j);
              row.getCell(3).font = { bold: true, color: { argb: 'FF6BD92E'} }; 
              row.alignment= { wraptext: false } 
              row.getCell(3).value = 'PASS'; 
              result.push ('PASS');
              row.hidden = false;
              worksheet1.getColumn(j).hidden = false;              
              workbook1.xlsx.writeFile('videoplayer.xlsx');   
              row.commit();        
              } );
          //verify.attributeEquals( ".unimatrix-video-sourceGroups > div.active", 'data-name', pixel[ i ] )
        
            }
            else {
            workbook1.xlsx.readFile('videoplayer.xlsx', {cellStyles: true})
              .then(function() {
              var worksheet1 = workbook1.getWorksheet('resolution');
              var row = worksheet1.getRow(++j);
              row.getCell(3).font = { bold: true, color: { argb: 'FFFF0000'} }; 
              row.alignment= { wraptext: false } 
              row.getCell(3).value = 'FAIL'; 
              row.getCell(4).font = { color:{ argb: 'FFFF0000'} };
              row.getCell(4).value = "ActualResult: '" + playerResolution.value + "' . ExpectedResult: '" + pixel[ i ] + "'";  
              result.push ('FAIL');
              row.hidden = false;
              worksheet1.getColumn(j).hidden = false;              
              workbook1.xlsx.writeFile('videoplayer.xlsx');   
              row.commit();        
              } );
            }
          } );
         
      }
      else {
        this.verify.fail( currenttime.value, '00:00', 'Fail to refresh the player' );
              workbook1.xlsx.readFile('videoplayer.xlsx', {cellStyles: true})
              .then(function() {
              var worksheet1 = workbook1.getWorksheet('resolution');
              var row = worksheet1.getRow(++j);
              row.getCell(3).font = { bold: true, color:{ argb: 'FFFF0000'} }; 
              row.alignment= { wraptext: false } 
              row.getCell(3).value = 'FAIL'; 
              row.getCell(4).font = { color:{ argb: 'FFFF0000'} };
              row.getCell(4).value = "ActualResult: '" + currenttime.value + "' . ExpectedResult: '00:00' ( Fail to refresh the player )";  
              result.push ('FAIL');              
              row.hidden = false;
              worksheet1.getColumn(j).hidden = false; 
              workbook1.xlsx.writeFile('videoplayer.xlsx');
              row.commit(); 
              } ); 
      }
    } );
}

      resolution.pause(5000).
      sendMail(result);
  }
    resolution.end();
  },
};