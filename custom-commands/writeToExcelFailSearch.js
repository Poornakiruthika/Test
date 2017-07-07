//Write to Excel for Else Statement Fail Result
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
var result = [ ];
exports.command = function ( fileName , sheetName , excelRow , excelColumn , failureReasonColumn , failureReasonActual ) {
  this. pause ( 5000 );
  workbook1.xlsx.readFile ( fileName, {
      cellStyles: true
    } )
    .then ( function ( ) {
      var worksheet1 = workbook1.getWorksheet ( sheetName );
      var row = worksheet1.getRow ( excelRow );
      row.getCell ( excelColumn ).font = {
        bold: true,
        color: {
          argb: 'FF6BD92E'
        }
      };
      row.alignment = {
        wrapText: true
      }
      row.getCell ( excelColumn ).value = 'Scenario PASS';
      row.getCell ( failureReasonColumn ).font = {
        color: {
          argb: 'FF6BD92E'
        }
      };
      row.getCell ( failureReasonColumn ).value = "Searched Result Count,'" + failureReasonActual + "'";
      result.push ( 'Scenario PASS' );
      for  ( var col = 1; col < 50; col++ ) {
        worksheet1.getColumn ( col ).hidden = false;
        for  ( var rows = 1; rows < 50; rows++ ) {
          worksheet1.getRow ( rows ).hidden = false;
        }
      }
      workbook1.xlsx.writeFile ( fileName );
      row.commit ( );
    } );
  return this;
};