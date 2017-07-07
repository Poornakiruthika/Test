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
  'AddCollection': function(client) {
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
      console.log("length", +collectionTitle.length);

      var v = 1;

      console.log("i value:", v);

      client.pause(10000).

      useXpath().
      verify.containsText("//ul/li/a[ text() = '" + collectionTitle[v] + "']", collectionTitle[v]).
      pause(9000).
      click("//ul/li/a[ text() = '" + collectionTitle[v] + "']").
      pause(10000).
      useCss()
      for (var i = 1; i < collectionTitle.length; i++) {
        client.
        getText('.content-count > strong', function(currentCountResult) {
          console.log("function started")
          console.log("i1 value:", i)
          console.log("value generated:", i)
          if (currentCountResult.status !== -1) {
            currentCount = currentCountResult.value;
            currentCount = currentCount.substring(1, currentCount.length - 1);
            console.log('Count - Before editing collection Menu: ' + currentCount)
          }
          if (i >= (collectionTitle.length - 1)) {

            var k = ((i - 1) - (collectionTitle.length - 2));
            i++;
          }
          console.log("K value:", k)

          console.log("i2 value:", i)
          client.pause(10000).

          useXpath().
          verify.containsText("//ul/li/a[ text() = '" + contentTitle[k] + "']", contentTitle[k]).
          pause(9000).
          click("//ul/li/a[ text() = '" + contentTitle[k] + "']").
          pause(10000).
          useCss().

          pause(9000).waitForElementVisible(".search-field-input", 5000).
          verify.visible(".search-field-input").

          setValue(".search-field-input", searchContentTitle[k]).
          //input[type=text]:-ms-clear {
          // display: none;}
          keys(client.Keys.ENTER). // hold the control
          click(".search-field-input").
          keys(client.Keys.NULL). // release the control
          pause(7000).

          //waitForElementVisible("span.collection", 5000).
          //pause(7000).
          //verify.visible("span.collection").
          //click("span.collection").

          waitForElementVisible("ul.content-menu > li:nth-child(2)", 5000, false).
          pause(7000).
          verify.visible("ul.content-menu > li:nth-child(2)").
          pause(7000).
          click("ul.content-menu > li:nth-child(2)").

          pause(7000).
          waitForElementVisible("dialog.dialog-small:nth-child(1)", 5000).
          pause(7000).
          verify.visible("dialog.dialog-small:nth-child(1)").
          pause(7000).
          useXpath().
          verify.containsText("//label[text()='" + collectionTitle[k] + "']", collectionTitle[k]).
          pause(9000).
          click("//label[text()='" + collectionTitle[k] + "']").
          pause(7000).useCss().
          waitForElementVisible("button.btn-primary:nth-child(2)", 5000, false).
          pause(7000).
          click("button.btn-primary:nth-child(2)").

          pause(9000).
          useXpath().
          verify.containsText("//ul/li/a[ text() = '" + collectionTitle[k] + "']", collectionTitle[k]).
          pause(9000).
          click("//ul/li/a[ text() = '" + collectionTitle[k] + "']").
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
                //client.writeToExcelPass('boxxspring.xlsx', 'deletecollection', ++j, 4, 5);
                //result.push ('PASS');   
                client.useXpath().waitForElementVisible("//h2[contains(.,' " + searchContentTitle[k] + "')]", 9000, false).
                getText("//h2[contains(.,' " + searchContentTitle[k] + "')]", function(titleCheck) {
                  if (k > 0) {

                    var j = k + 1;

                  }
                  console.log("j value:", j);
                  console.log("K value:", k)

                  var titleChecked = titleCheck.value;
                  //console.log("Title",titleCheck)
                  console.log("Title:", titleChecked)
                  client.useCss()
                  var collectionz = searchContentTitle[k]
                  if (titleChecked === collectionz) {

                    console.log("Actual and Expected counts are equal");

                    client.writeToExcelPass('boxxspring.xlsx', 'addcollection', j, 5, 6);
                    result.push('PASS');

                  }
                  else {

                    console.log("Title is not displayed");
                    client.writeToExcelFail('boxxspring.xlsx', 'addcollection', j, 5, 6, titleChecked, collectionz);
                    result.push('FAIL');
                  }

                });

              }
              else {
                console.log("Count is incorrect");
                client.writeToExcelFail('boxxspring.xlsx', 'addcollection', j, 5, 6, actualCount, expectedCount);
                result.push('FAIL');

              }
            }
          });
          console.log("out");
          client.
          useXpath().pause(9000).
          verify.containsText("//ul/li/a[ text() = '" + collectionTitle[k] + "']", collectionTitle[k]).
          pause(9000).
          click("//ul/li/a[ text() = '" + collectionTitle[k] + "']").
          pause(10000).
          useCss()

        });
      }
    }
    client.end();

  }
}