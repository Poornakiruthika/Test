var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require('exceljs');
var workbook1 = new Excel.Workbook( );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'videoplayer.xlsx', {cellStyles: true});
var worksheet = workbook.Sheets['Volume'];
var url = [ ];
var volumelevel = [ ];
var result = [ ];
module.exports = {
  tags: ['volume'],
  'Player-Volume' : function ( volume ) {
      //Read values from Excel File
      for ( z in worksheet ) {
        if ( z[ 0 ] === '!' ) continue;
        //Read URL
        if ( z.includes ( 'A' ) ) {
          url.push ( worksheet[ z ].v );
        }
        //Read volume data
        if ( z.includes ( 'B' ) ) {
          volumelevel.push ( worksheet[ z ].v );
        } 
      }
    if ( url.length > 0 ) {
      console.log  ( "Excel row count: " +url.length );
      for ( var i = 0, j = 0; i != url.length; i++ ) {
        volume.url( url[ i ] ).
    playvideo().
    //Click video volume button
    waitForElementVisible( ".unimatrix-video-volume-button", 9000 ).
    pause( 9000 ).
    click( ".unimatrix-video-volume-button" ).
    pause( 9000 ).	
	//To check the mute in video player 
    waitForElementVisible( ".unimatrix-video-control-bar > div.muted", 9000 ).
    click( ".unimatrix-video-control-bar > div.muted" ).
    pause( 2000 ).
	//Drag the video volume handle 
    moveToElement( ".unimatrix-video-volume-container > div[style='bottom: 64px;']", 0, 0 ).
    pause( 2000 ).
    mouseButtonDown( 0 ).
    pause( 2000 ).
    moveToElement( ".unimatrix-video-volume-container > div[style='bottom: 64px;']", 0, volumelevel[ i ] ).
    pause( 2000 ).
    mouseButtonUp( 0 ).
    //Expect whether volume handle working properly
   getAttribute(".unimatrix-video-volume-handle", "style", function( volumeHandle ) {
    
//expect.element( '.unimatrix-video-volume-handle' ).to.have.attribute( "style" ).which.does.not.equals( 'bottom: 64px;' );
//console.log(volume.value);
    if ( volumeHandle.value != "bottom: 64px;" ) {
      workbook1.xlsx.readFile('videoplayer.xlsx', {cellStyles: true})
      .then(function() {
      var worksheet1 = workbook1.getWorksheet('volume');
      var row = worksheet1.getRow(++j);
      row.getCell(3).font = { bold: true, color:{ argb: 'FF6BD92E'} }; 
      row.alignment= { wraptext: false } 
      row.getCell(3).value = 'PASS';   
       result.push ('PASS');             
      row.hidden = false;
      worksheet1.getColumn(j).hidden = false; 
      workbook1.xlsx.writeFile('videoplayer.xlsx');
      row.commit(); 
      } );
  
    }
    else 
    {
      workbook1.xlsx.readFile('videoplayer.xlsx', {cellStyles: true})
      .then(function() {
      var worksheet1 = workbook1.getWorksheet('volume');
      var row = worksheet1.getRow(++j);
      row.getCell(3).font = { bold: true, color:{ argb: 'FFFF0000'} }; 
      row.alignment= { wraptext: false } 
      row.getCell(3).value = 'FAIL';
      row.getCell(4).font = { color:{ argb: 'FFFF0000'} }; 
      row.getCell(4).value = "ActualResult: '" + volumeHandle.value + "'. ExpectedResult: less than the pixel of 'bottom: 64px;' (Player volume is not working)";
      result.push ('FAIL');              
      row.hidden = false;
      worksheet1.getColumn(j).hidden = false; 
      workbook1.xlsx.writeFile('videoplayer.xlsx');
      row.commit(); 
      } );
    }

} );
   
}

volume.pause(5000).
sendMail(result);
}
volume.end();
},

};