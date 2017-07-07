//this function is for deleting the reports of last run
var rimraf = require ( 'rimraf' );
var Path = require ( 'path' );
var data = Path.normalize ( __dirname + '/../reports/' );
const copy = require ( 'fs-copy' );
//copy the new spreadsheet to write the status of the input in videoplayer
copy ( __dirname + '/../videoplayerSource.xlsx', __dirname + '/../videoplayer.xlsx', {
  replace: true
} );
//copy the new spreadsheet to write the status of the input in Boxxspring
copy ( __dirname + '/../boxxspringSource.xlsx', __dirname + '/../boxxspring.xlsx', {
  replace: true
} );
rimraf ( data, function  ( err ) {
  if ( err ) {
    return console.log ( err );
  }
  else {
  	//get the message as the last run reports gets deleted 
    console.log ( 'Reports deleted successfully' );
  }
} );