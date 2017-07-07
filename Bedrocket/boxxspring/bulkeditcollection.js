var xlsx = require('xlsx');
var fs = require('fs');
var Excel = require('exceljs');
var workbook1 = new Excel.Workbook();
if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('boxxspring.xlsx', {
  cellStyles: true
});
var currentCount;
var worksheet = workbook.Sheets['bulkeditcollection'];
var collectionTitle = [];
var categoryTitle = [];
var searchcategoryTitle = [];
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
        categoryTitle.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      if (z.includes('C')) {
        searchcategoryTitle.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }

    }
    if (collectionTitle.length > 1) {
      console.log("length", +collectionTitle.length);

      var v = 1;

      console.log("V value:", v);

      client.pause(10000).

      useXpath().
      verify.containsText("//ul/li/a[ text() = '" + collectionTitle[v] + "']", collectionTitle[v]).
      pause(9000).
      click("//ul/li/a[ text() = '" + collectionTitle[v] + "']").
      pause(10000).
      useCss()

      for(var i=1; i<collectionTitle.length;i++){
      client.getText('.content-count > strong', function(currentCountResult) {
          console.log("function started")


          //console.log("i1 value:", i)
          //console.log("value generated:", i)
          if (currentCountResult.status !== -1) {
            currentCount = currentCountResult.value;
            currentCount = currentCount.substring(1, currentCount.length - 1);
            console.log('Count - Before editing collection Menu: ' + currentCount)
          }

          if (i >= (collectionTitle.length - 1)) {

            var k = ((i - 1) - (collectionTitle.length - 2));
            i++;
          }
          console.log("K value:", k);

          console.log("i2 value:", i);

          if (currentCount > 0){
          console.log("currentCount:", currentCount);

client.pause(7000).
waitForElementVisible("a.btn:nth-child(2)",9000,false).
pause(7000).
verify.visible("a.btn:nth-child(2)").
pause(7000).
click("a.btn:nth-child(2)").
pause(7000).
waitForElementVisible(".dialog-large",9000,false).
pause(7000).
verify.visible(".dialog-large").
pause(7000).
verify.visible("section.ng-scope:nth-child(1) > h1:nth-child(1) > i:nth-child(1)").
pause(7000).

waitForElementVisible("input.ng-pristine:nth-child(3)",9000,false).
pause(7000).
verify.visible("input.ng-pristine:nth-child(3)").
pause(7000).
setValue("input.ng-pristine:nth-child(3)",categoryTitle[k]).
//input.ng-pristine:nth-child(3)
pause(9000).
click(".suggestion-list-wrap > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)").
pause(7000).
verify.visible("section.field-input > a:nth-child(1)").
pause(7000).
waitForElementVisible("button.ng-scope",9000,false).
pause(7000).
click("button.ng-scope").
pause(7000).
useXpath().
               verify.containsText ( "//ul/li/a[ text() = 'Categories']","Categories" ).
               pause(3000).
               click ( "//ul/li/a[ text() = 'Categories']" ).
               useCss().
//*[contains(@class,'content-title')]/h2

pause(9000).
waitForElementVisible(".search-field-input",5000).
     assert.visible(".search-field-input").

    setValue(".search-field-input",categoryTitle[k]).
//input[type=text]:-ms-clear {
   // display: none;}
    keys(client.Keys.ENTER). // hold the control
   click(".search-field-input").
   keys(client.Keys.NULL). // release the control
   pause(7000).
waitForElementVisible(".content-container > ng-include:nth-child(1)",9000,false).
pause(7000).
verify.visible(".content-container > ng-include:nth-child(1)").
pause(7000).
waitForElementVisible(".content-title > a:nth-child(2)",9000,false).
pause(7000).
verify.visible(".content-title > a:nth-child(2)").
pause(7000).
click(".content-title > a:nth-child(2)").
pause(7000).
getText('.content-count > strong', function(actualCountResult) {
 if (k > 0) {

                    var j = k + 1;

                  }
                  console.log("j value:", j);
                  console.log("K value:", k)
              if (actualCountResult.status !== -1) {
                actualCount = actualCountResult.value;
                actualCount = actualCount.substring(1, actualCount.length - 1);
                console.log('Count - After adding an bulkeditcollection: ' + actualCount);
                //expectedCount = ((+currentCount) + (+1));
                expectedCount = currentCount;
                console.log('Count - equal in bulkeditcollection: ' + expectedCount);
                if (actualCount == expectedCount) {
                  console.log("Actual and Expected counts are equal");
                  client.writeToExcelPass('boxxspring.xlsx', 'bulkeditcollection', ++j, 5,6);
                }
                else {
                  console.log("if Failed");
                  client.writeToExcelFail('boxxspring.xlsx', 'bulkeditcollection', ++j, 5, 6, actualCount, expectedCount);
                }
              }
            });




          }
      


else{


if (k > 0) {

                    var j = k ;

                  }
                  console.log("j value in else:", j);
                  console.log("K value in else:", k);
console.log("Failed");
                  client.writeToExcelPasselse('boxxspring.xlsx', 'bulkeditcollection', ++j, 5,6);


}

if (k < collectionTitle.length - 1) {
              console.log("K End value :", k)
                  if(k >0){

                    k=k+1;
                    console.log("K if End value :", k)
                  }

  client.pause(10000).

      useXpath().
      verify.containsText("//ul/li/a[ text() = '" + collectionTitle[k] + "']", collectionTitle[k]).
      pause(9000).
      click("//ul/li/a[ text() = '" + collectionTitle[k] + "']").
      pause(10000).
      useCss()
            
            }
                  
   });}}
    client.end();

  }
}