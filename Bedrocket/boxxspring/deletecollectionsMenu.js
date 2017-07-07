var xlsx = require('xlsx');
var fs = require('fs');
var Excel = require('exceljs');
var workbook1 = new Excel.Workbook();
if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('boxxspring.xlsx', {
  cellStyles: true
});
var currentCount;
var i;
var worksheet = workbook.Sheets['deletecollection'];
var searchCollection = [];
var collectionTitle = [];

var result = [];
var expectedCount;
var actualCount;
var j=1;

module.exports = {
	//tags: ['deletecollectionmenu'],

  before: function(browser) {
    var profile = browser.globals.profile;
    //browser.resizeWindow(1600, 900);
    //browser.windowMaximize();
    browser.
    login(profile.portalUri, profile.username, profile.password);
  },
  'Delete Collections': function(client) {
    //Read values from excel
    for (z in worksheet) {
      if (z[1] === '!') continue;
      //Read Search Collection Title
      if (z.includes('A')) {
        searchCollection.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Collection Title
      if (z.includes('B')) {
        collectionTitle.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
          
    }
    if (collectionTitle.length > 1) {
      console.log("length", +collectionTitle.length);
      
      client.pause(10000).

      useXpath(). 
      waitForElementVisible("//a[@href='/properties/81/collections'][text()='All']", 9000, false).
      pause(9000).
      click("//a[@href='/properties/81/collections'][text()='All']").
      pause(10000).
      useCss().
      getText('.content-count > strong', function(currentCountResult) {
        if (currentCountResult.status !== -1) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring(1, currentCount.length - 1);
          console.log('Count - Before editing collection Menu: ' + currentCount)
        }
        for (var i = 1; i < collectionTitle.length; i++) {
          client.
          pause(9000).
          useXpath().
          waitForElementVisible("//h2[contains(.,'"+searchCollection[i]+"')]", 9000, false).
          pause(9000).
          click("//h2[contains(.,'"+searchCollection[i]+"')]").
          useCss().
          pause(9000).
          waitForElementVisible(".text-input-headline", 9000, false).
          pause(9000).
          verify.visible(".text-input-headline").
          pause(7000).
          clearValue(".text-input-headline").
          pause(7000).
          setValue(".text-input-headline", collectionTitle[i]).
          pause(9000).
          verify.visible(".btn-delete  > span[ ng-click='showDeleteVerification();']").
  click(".btn-delete  > span[ ng-click='showDeleteVerification();']").
  pause(5000).
  //Check the existance of delete confirmation dialog
  verify.visible("dialog[ name=deleteVerification ]").
  pause(5000).
  //Click Cancel Button in Delete Dialog
  verify.visible(".link-secondary").
  click(".link-secondary").
  pause(5000).   
  verify.visible(".btn-delete  > span[ ng-click='showDeleteVerification();']").
  click(".btn-delete  > span[ ng-click='showDeleteVerification();']").
  pause(7000).
  //Check the existance of delete confirmation to delete
  verify.visible("dialog[ name=deleteVerification ]").
  verify.visible("button.btn:nth-child(2)").
  pause(7000).
  click("button.btn:nth-child(2)").

          pause(9000).
          useXpath().
          waitForElementVisible("//a[@href='/properties/81/collections'][text()='All']", 9000, false).
          pause(9000).
          click("//a[@href='/properties/81/collections'][text()='All']").
          pause(10000).
          useCss().
          getText('.content-count > strong', function(actualCountResult) {
            if (actualCountResult.status !== -1) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring(1, actualCount.length - 1);
              console.log('Count - After adding an collection: ' + actualCount);
              expectedCount = ((+currentCount) - 1);
              
              console.log('Count - incremented by 1 in collection: ' + expectedCount);
              if (actualCount == expectedCount) {
                console.log("Actual and Expected counts are equal");
                client.writeToExcelPass('boxxspring.xlsx', 'deletecollection', ++j, 4, 5);
                              result.push ('PASS');         

              }
              else {
                console.log("if Failed");
                client.writeToExcelFail('boxxspring.xlsx', 'deletecollection', ++j, 4, 5, actualCount, expectedCount);
                              result.push ('FAIL');         

              }
            }
          });
          if (i < collectionTitle.length - 1) {
            client.getText('.content-count > strong', function(currentCountResult) {
              if (currentCountResult.status !== -1) {
                currentCount = currentCountResult.value;
                currentCount = currentCount.substring(1, currentCount.length - 1);
                console.log('Count - Before adding collection: ' + currentCount)
              }
              client.useXpath().
              waitForElementVisible("//a[@href='/properties/81/collections'][text()='All']", 9000, false).
              pause(9000).
              click("//a[@href='/properties/81/collections'][text()='All']").
              pause(10000).
              useCss().
              getText('.content-count > strong', function(currentCountResult) {
                if (currentCountResult.status !== -1) {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring(1, currentCount.length - 1);
                  console.log('Count - current collection Menu: ' + currentCount)
                }
              });
            });
          }
        }
      });

    }
    client.end();

  }
}



