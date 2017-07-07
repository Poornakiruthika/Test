//Write to Excel for Else statement Pass
var Excel = require ( 'exceljs' );
var HtmlTableColumnHider = require ( 'html-table-column-hider' );
var workbook1 = new Excel.Workbook ( );
var result = [ ];
exports.command = function ( fileName , sheetName , excelRow , excelColumn , failureReasonColumn ) {
  this.pause ( 5000 );
  workbook1.xlsx.readFile ( fileName, {
      cellStyles: true
    } )
    .then ( function ( ) {
      var worksheet1 = workbook1.getWorksheet ( sheetName );
      var row = worksheet1.getRow ( excelRow );
      var column = worksheet1.getRow ( excelColumn );
      row.getCell ( excelColumn ).font = {
        bold: true,
        color: {
          argb: '0c891e'
        }
      };
      row.alignment = {
        wrapText: true
      }
      row.getCell ( excelColumn ).value = 'Scenario Pass';
      row.getCell ( failureReasonColumn ).font = {
        color: {
          argb: '0c891e'
        }
      };
      row.getCell ( failureReasonColumn ).value = " Working as Expected  ";
      result.push ( 'Scenario Pass' );
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