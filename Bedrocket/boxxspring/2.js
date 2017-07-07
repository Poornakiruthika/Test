var xlsx = require('xlsx');
var fs = require('fs');
var Excel = require('exceljs');
var workbook1 = new Excel.Workbook();
if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('boxxspring.xlsx', {
  cellStyles: true
});
var currentCount;
var worksheet = workbook.Sheets['addcollection'];
var collectionTitle = [];
var contentTitle = [];
var searchContentTitle = [];
var result = [];
var expectedCount;
var actualCount;
var i, j, k = 1;

module.exports = {
  //tags: ['deletecollectionmenu'],

  before: function(browser) {
    var profile = browser.globals.profile;
    //browser.resizeWindow(1600, 900);
    //browser.windowMaximize();
    browser.
    login(profile.portalUri, profile.username, profile.password);
  },
  'BulkeditCollection': function(client) {
    //Read values from excel
    for (z in worksheet) {
      if (z[1] === '!') continue;
      //Read Search Collection Title
      if (z.includes('A')) {
        collectionTitle.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Collection Title
      if (z.includes('B')) {
        contentTitle.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      if (z.includes('C')) {
        searchContentTitle.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }

    }
    if (collectionTitle.length > 1) {




    
                  console.log("if Failed");
                  client.writeToExcelPasselse('boxxspring.xlsx', 'bulkeditcollection', 2, 5, 6);
              













   }
    client.end();

  }
}