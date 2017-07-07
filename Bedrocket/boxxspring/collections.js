var xlsx = require('xlsx');
var fs = require('fs');
var Excel = require('exceljs');
var workbook1 = new Excel.Workbook();
if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('boxxspring.xlsx', {
  cellStyles: true
});
var currentCount;
var worksheet = workbook.Sheets['collection'];
var collectionTitle = [];
var collectiondesc = [];
var collectionPublic = [];
var result = [];
var expectedCount;
var actualCount;
var j=1;
module.exports = {
	tags: ['collections'],

  before: function(browser) {
    var profile = browser.globals.profile;
    //browser.resizeWindow(1600, 900);
    //browser.windowMaximize();
    browser.
    login(profile.portalUri, profile.username, profile.password);
  },
  'Create Collections': function(client) {
    //Read values from excel
    for (z in worksheet) {
      if (z[1] === '!') continue;
      //Read Collection Title
      if (z.includes('A')) {
        collectionTitle.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Collection Description
      if (z.includes('B')) {
        collectiondesc.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Collection Public
      if (z.includes('C')) {
        collectionPublic.push(worksheet[z].v);
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
          console.log('Count - Before adding collection Menu: ' + currentCount)
        }
        for (var i = 1; i < collectionTitle.length; i++) {
          client.
          pause(9000).
          waitForElementVisible("div.content-header:nth-child(4) > a:nth-child(2)", 9000, false).
          pause(10000).
          verify.containsText("div.content-header:nth-child(4) > a:nth-child(2)", "COLLECTIONS"). 
          pause(9000).
          
          waitForElementVisible("div.content-header:nth-child(4) > span:nth-child(3)", 9000).
          pause(9000).
          verify.visible("div.content-header:nth-child(4) > span:nth-child(3)").
          pause(7000).
          //moveToElement(".btn.btn-primary.btn-add",0,0).
          click("div.content-header:nth-child(4) > span:nth-child(3)").
          pause(9000).
          waitForElementVisible(".text-input-headline", 9000, false).
          pause(9000).
          verify.visible(".text-input-headline").
          pause(5000).
          setValue(".text-input-headline", collectionTitle[i]).
          pause(9000).
          //Check the valid URL from given URL
          waitForElementVisible(".btn-slider", 9000, false).
          pause(9000)
          var expectedYES = "YES";
          var expectedNO = "NO";
if ( expectedYES === collectionPublic[ i ] ){

client.
          waitForElementVisible(".btn-secondary", 9000, false).
          pause(9000).
          verify.visible(".btn-secondary").
          pause(5000).
          click(".btn-secondary").
          pause(9000).
          waitForElementVisible(".text-success", 9000, false).
          pause(9000).
          verify.visible(".text-success").
          pause(5000)
          //verify.containsText("//SPAN[@ng-if='collection.public'][text()='YES']", collectionPublic[i])
          console.log("collectionPublic:",collectionPublic[i])
}
else if ( expectedNO === collectionPublic[ i ] ){
client.
          
          waitForElementVisible(".btn-secondary", 9000, false).
          pause(9000).
          verify.visible(".btn-secondary").
          pause(5000).
          //click(".btn-secondary").
          //pause(9000).
          waitForElementVisible(".text-private", 9000, false).
          pause(9000).
          verify.visible(".text-private").
          pause(5000)
          //verify.containsText("//SPAN[@ng-if='!collection.public'][text()='NO']", collectionPublic[i])
          console.log("collectionPublic:",collectionPublic[i])


}
          client.waitForElementVisible("#artifact-url>.ng-pristine", 9000, false).
          pause(9000).
          verify.visible("#artifact-url>.ng-pristine").
          pause(5000).
          setValue("#artifact-url>.ng-pristine", collectiondesc[i]).
          pause(9000).        

          waitForElementVisible(".btn-active", 9000, false).
          pause(9000).
          click(".btn-active").
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
              expectedCount = ((+currentCount) + (+1));
              console.log('Count - incremented by 1 in collection: ' + expectedCount);
              if (actualCount == expectedCount) {
                console.log("Actual and Expected counts are equal");
                client.writeToExcelPass('boxxspring.xlsx', 'collection', ++j, 5, 6);
                              result.push ('PASS');         

              }
              else {
                console.log("if Failed");
                client.writeToExcelFail('boxxspring.xlsx', 'collection', ++j, 5, 6, actualCount, expectedCount);
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



