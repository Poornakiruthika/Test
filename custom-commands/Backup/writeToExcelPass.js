//this function is for 
var Excel = require('exceljs');
var workbook = new Excel.Workbook();
exports.command = function ( fileName, sheetName, j ) {
workbook.xlsx.readFile( fileName )
    .then(function() {
var worksheet = workbook.getWorksheet( sheetName );
        var row = worksheet.getRow(++j);
        row.getCell(2).value = 'PASS'; 
        row.commit();
        workbook.xlsx.writeFile( fileName ); 
        
  
} );   
  return  j;

};
