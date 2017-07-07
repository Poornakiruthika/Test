//this command is for writing fail status in Excel sheet 
var Excel = require ( 'exceljs' );
var workbook = new Excel.Workbook ( );
exports.command = function ( fileName, sheetName, excelRow, excelColumn, failureReasonColumn, failureReason ) {
  this.pause ( 5000 );
  workbook.xlsx.readFile ( fileName, { cellStyles: true } ).then ( function ( ) {
    //get the excel worksheet data of row and column
    var worksheet = workbook.getWorksheet ( sheetName );
    var row = worksheet.getRow ( excelRow );
    row.getCell ( excelColumn ).font = {
      bold: true,
      color: {
        argb: 'FFFF0000'
      }
    };
    row.alignment = {
      wrapText: false
    };
    //write the status as "Fail" in the excel sheet
    row.getCell ( excelColumn ).value = 'FAIL';
    row.getCell ( failureReasonColumn ).font = {
      color: {
        argb: 'FFFF0000'
      }
    };
    //To write the relevant reason for failure status
    row.getCell ( failureReasonColumn ).value = failureReason;
    workbook.eachSheet ( function ( worksheet, sheetId ) {
      //Unhide the excel row after writing the status instead of overlapping
      for ( var excelRowAlign = 1; excelRowAlign < 50; excelRowAlign++ ) {
        worksheet.getRow ( excelRowAlign ).hidden = false;
        //Unhide the excel column after writing the status instead of overlapping
        for ( var excelColumnAlign = 1; excelColumnAlign < 50; excelColumnAlign++ ) {
          worksheet.getColumn ( excelColumnAlign ).hidden = false;
        }
      }
    } );
    //close the workbook 
    workbook.xlsx.writeFile ( fileName );
    row.commit ( );
  } );
  return this;
};