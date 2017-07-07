var xlsx = require('xlsx');
var fs = require('fs');
var Excel = require('exceljs');
var workbook1 = new Excel.Workbook();
if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('boxxspring.xlsx', {
  cellStyles: true
});
var currentCount;
var j;
var worksheet = workbook.Sheets['content'];
var contentTitle = [];
var categoryType = [];
var providerType = [];
var alignment = [];

var result = [];
var expectedCount;
var actualCount;
module.exports = {
  tags: ['content'],

  before: function(browser) {
    var profile = browser.globals.profile;
    browser.resizeWindow(1600, 900);
    //browser.windowMaximize();
    browser.
    login(profile.portalUri, profile.username, profile.password);
  },
  'Uploading a Video URL': function(client) {
    //Read values from excel
    for (z in worksheet) {
      if (z[1] === '!') continue;
      //Read video URL
      if (z.includes('A')) {
        contentTitle.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Video Title
      if (z.includes('B')) {
        categoryType.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Short Title
      if (z.includes('C')) {
        providerType.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Short Description
      if (z.includes('D')) {
        alignment.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      
    }
    if (contentTitle.length > 1) {
      console.log("length", +contentTitle.length);
      //console.log("video",+videoUrl);
      //for ( var i in videoUrl ) {
      //for (var i = 0; i < videoUrl.length; i++)  {
      //Search for videos link
      //console.log("First", i);
      client.pause(10000).

      useXpath(). 
      //a[@href="/properties/81/dashboards"][text()="All"][text()="All"])[2]
      waitForElementVisible("//a[@href='/properties/81/smart_collections'][text()='All']", 9000, false).
      pause(9000).
      click("//a[@href='/properties/81/smart_collections'][text()='All']").
      pause(10000).
      useCss().
      getText('.content-count > strong', function(currentCountResult) {
        if (currentCountResult.status !== -1) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring(1, currentCount.length - 1);
          console.log('Count - Before adding Content Menu: ' + currentCount)
        }
        for (var i = 1, j = 1; i < contentTitle.length; i++) {
          client.
          pause(9000).
          waitForElementVisible("div.content:nth-child(1) > a:nth-child(2)", 9000, false).
          pause(10000).
          verify.containsText("div.content:nth-child(1) > a:nth-child(2)", "CONTENT"). 
          pause(9000).
          waitForElementVisible("div.content:nth-child(1) > span:nth-child(3) > a:nth-child(1) > img:nth-child(1)", 9000).
          verify.visible("div.content:nth-child(1) > span:nth-child(3) > a:nth-child(1) > img:nth-child(1)").
          pause(5000).
          //moveToElement(".btn.btn-primary.btn-add",0,0).
          click("div.content:nth-child(1) > span:nth-child(3) > a:nth-child(1) > img:nth-child(1)").
          pause(9000).
          waitForElementVisible(".text-input-headline", 9000, false).
          pause(9000).
          verify.visible(".text-input-headline").
          pause(5000).
          setValue(".text-input-headline", contentTitle[i])
          //Check the valid URL from given URL

          console.log("Given URL:", contentTitle[i]);

          client.
          useXpath().
          verify.containsText("//label[text()='" + categoryType[i].trim() + "']", categoryType[i].trim()).
          pause(9000).
          click("//label[text()='" + categoryType[i].trim() + "']").
          pause(9000).
          verify.containsText("//label[text()='" + providerType[i].trim() + "']", providerType[i].trim()).
          pause(9000).
          click("//label[text()='" + providerType[i].trim() + "']").

          useCss().
          waitForElementVisible(.presentation, 9000, false).
          pause(9000)

          //getAttribute(".presentation > div.active", "ng-class", function( playerResolution ) {
        // console.log(playerResolution.value);


          if (alignment[i] === "Grid") {
            console.log("Grid passed:", alignment[i]);
            client.waitForElementVisible(".grid", 9000, false).
            pause(9000).
            click(".grid").
            pause(10000)
          }

          // "//*[@class='presentation']//*[text()='"+alignment[i]+"']"
          else if (alignment[i] === "List") {
            console.log("List passed:", alignment[i]);
            client.waitForElementVisible(".list", 9000, false).
            pause(9000).
            click(".list").
            pause(10000)
          }

          else {
            console.log("invalid input:", alignment[i]);

          }

          client.waitForElementVisible(".btn-active", 9000, false).
          pause(9000).
          click(".btn-active").
          pause(9000).
          useXpath().
          waitForElementVisible("//a[@href='/properties/81/smart_collections'][text()='All']", 9000, false).
          pause(9000).
          click("//a[@href='/properties/81/smart_collections'][text()='All']").
          pause(10000).
          useCss().
          getText('.content-count > strong', function(actualCountResult) {
            if (actualCountResult.status !== -1) {
              actualCount = actualCountResult.value;
              actualCount = actualCount.substring(1, actualCount.length - 1);
              console.log('Count - After adding an Video: ' + actualCount);
              expectedCount = ((+currentCount) + (+1));
              console.log('Count - incemented by 1 in Video: ' + expectedCount);
              if (actualCount == expectedCount) {
                console.log("Actual and Expected counts are equal");
                client.writeToExcelPass('boxxspring.xlsx', 'content', ++j, 6, 7);
              }
              else {
                console.log("if Failed");
                client.writeToExcelFail('boxxspring.xlsx', 'content', ++j,6, 7, actualCount, expectedCount);
              }
            }
          });
          if (i < contentTitle.length - 1) {
            client.getText('.content-count > strong', function(currentCountResult) {
              if (currentCountResult.status !== -1) {
                currentCount = currentCountResult.value;
                currentCount = currentCount.substring(1, currentCount.length - 1);
                console.log('Count - Before adding video: ' + currentCount)
              }
              client.useXpath().
              waitForElementVisible("//a[@href='/properties/81/smart_collections'][text()='All']", 9000, false).
              pause(9000).
              click("//a[@href='/properties/81/smart_collections'][text()='All']").
              pause(10000).
              useCss().
              getText('.content-count > strong', function(currentCountResult) {
                if (currentCountResult.status !== -1) {
                  currentCount = currentCountResult.value;
                  currentCount = currentCount.substring(1, currentCount.length - 1);
                  console.log('Count - current Content Menu: ' + currentCount)
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