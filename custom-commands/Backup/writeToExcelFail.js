//this function is for 
var Excel = require('exceljs');
var workbook = new Excel.Workbook();
exports.command = function ( fileName, i ) {
workbook.xlsx.readFile( fileName )
    .then(function() {
var worksheet = workbook.getWorksheet('Sheet1');
        var row = worksheet.getRow(++i-2);
        row.getCell(2).value = 'FAIL'; 
        row.commit();
        workbook.xlsx.writeFile( fileName );    
  
} );
    this.end();
};
