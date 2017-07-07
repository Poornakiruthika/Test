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
var worksheet = workbook.Sheets['editcollection'];
var searchCollection = [];
var collectionTitle = [];
var collectiondesc = [];
var collectionPublic = [];
var result = [];
var expectedCount;
var actualCount;
var j=1;
var k=1;

module.exports = {
	//tags: ['videoupload'],

  before: function(browser) {
    var profile = browser.globals.profile;
    //browser.resizeWindow(1600, 900);
    //browser.windowMaximize();
    browser.
    login(profile.portalUri, profile.username, profile.password);
  },
  'Edit Collections': function(client) {
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
      //Read Collection Description
      if (z.includes('C')) {
        collectiondesc.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Collection Public
      if (z.includes('D')) {
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
          //Check the valid URL from given URL
          waitForElementVisible(".btn-slider", 9000, false).
          pause(9000).
         // var expectedYES = "YES";
         // var expectedNO = "NO";

useXpath().
  getText("//*[contains(@class,'field-input')]/span",function(collectionPub){
var collectPub = collectionPub.value;
console.log("value:",collectPub)
console.log("i:",+i)

if (i >= (collectionTitle.length-1)) {
              k = i - (collectionTitle.length-1);
              i++;
            }
      console.log("i2:",+i)
      console.log("K:",+k)
      client.useCss()
if (collectPub !==collectionPublic[ k ] && ((collectionPublic[ k ]=== "YES") || (collectionPublic[ k ]=== "NO")))
{

client.waitForElementVisible(".btn-false", 9000, false).
          pause(9000).
          verify.visible(".btn-false").
          pause(5000).
          click(".btn-false").
          pause(9000)


}
else{

console.log("same value:",collectPub,collectionPublic[ k ])


}



  });















/*if ( expectedYES === collectionPublic[ i ] ){

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
          click(".btn-secondary").
          pause(9000).
          waitForElementVisible(".text-private", 9000, false).
          pause(9000).
          verify.visible(".text-private").
          pause(5000)
          //verify.containsText("//SPAN[@ng-if='!collection.public'][text()='NO']", collectionPublic[i])
          console.log("collectionPublic:",collectionPublic[i])


}*/
          client.
          waitForElementVisible("textarea.ng-pristine", 9000, false).
          pause(9000).
          verify.visible("textarea.ng-pristine").
          pause(7000).
          clearValue("textarea.ng-pristine").
          pause(7000).
          setValue("textarea.ng-pristine", collectiondesc[i]).
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
              //expectedCount = ((+currentCount) + (+1));
              expectedCount = currentCount;
              console.log('Count - incremented by 1 in collection: ' + expectedCount);
              if (actualCount == expectedCount) {
                console.log("Actual and Expected counts are equal");
                client.writeToExcelPass('boxxspring.xlsx', 'editcollection', ++j, 6, 7);
                              result.push ('PASS');         

              }
              else {
                console.log("if Failed");
                client.writeToExcelFail('boxxspring.xlsx', 'editcollection', ++j, 6, 7, actualCount, expectedCount);
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



