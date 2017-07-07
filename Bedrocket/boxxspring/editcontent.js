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
var author = [];
var attribution = [];
var categoryName = [];
var categoryType = [];
var shortNote = [];
var dragImg = [];
var result = [];
var expectedCount;
var actualCount;
module.exports = {
  before: function(browser) {
    var profile = browser.globals.profile;
    browser.resizeWindow(1600, 900);
    //browser.windowMaximize();
    browser.
    login(profile.portalUri, profile.username, profile.password);
  },
  'Edit Content': function(client) {
    //Read values from excel
    for (z in worksheet) {
      if (z[0] === '!') continue;
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
      //Read Author Name
      if (z.includes('E')) {
        author.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Attribution Name
      if (z.includes('F')) {
        attribution.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Category Name
      if (z.includes('G')) {
        categoryName.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Category Type
      if (z.includes('H')) {
        categoryType.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Short Notes
      if (z.includes('I')) {
        shortNote.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Replace Thumbnail
      if (z.includes('J')) {
        dragImg.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
    }
    if (contentTitle.length > 0) {

      console.log("length", +contentTitle.length);
      //console.log("video",+videoUrl);
      for ( var i in contentTitle ) {
      //for (var i = 0; i < videoUrl.length; i++)  {
      //Search for videos link
      //console.log("First", i);
      client.pause(10000).

      useXpath(). 
      //a[@href="/properties/81/dashboards"][text()="All"][text()="All"])[2]
      waitForElementVisible("//a[@href='/properties/81/smart_collections'][text()='All']", 9000, false).
      pause(9000).
      click("//a[@href='/properties/81/smart_collections'][text()='All']").
      pause(9000).
waitForElementVisible("//h2[contains(.,' Videos')]", 9000, false).
pause(9000).
click("//h2[contains(.,' Videos')]").
useCss().
      //verify.visible("#story_259 > ng-include:nth-child(1) > div:nth-child(1) > section:nth-child(1) > a:nth-child(1) > div:nth-child(1) > h2:nth-child(1)").
      pause(9000).
      //click("#story_259 > ng-include:nth-child(1) > div:nth-child(1) > section:nth-child(1) > a:nth-child(1) > div:nth-child(1) > h2:nth-child(1)").
      pause(9000).

waitForElementVisible(".text-input-headline",9000,false).
pause(9000).
clearValue(".text-input-headline").
pause(9000).
setValue(".text-input-headline",contentTitle[i]).
pause(9000).

 elements('css selector', '.checkbox>label.select', function(result) {
          console.log("check value:",result.value)
        for(var k=0;k<18;k++) {
          this.elementIdAttribute(result.value[k].ELEMENT, 'checked', function(result2) {
            console.log("result2",result2.value);});
        }
              });
client.
pause(9000).
verify.visible(".btn-active").
pause(9000).
verify.visible(".btn-delete").
pause(9000).
verify.visible(".presentation").
pause(9000)




      /*useXpath().
          verify.containsText("//label[text()='Videos']", "Videos").
          pause(9000).
          click("//label[text()='Videos']").
          pause(9000).useCss().
getValue(".checkbox-container",function(res){

  var test = res.value;
  console.log("res:",res);
  console.log("check status:",res.status)
  console.log("check:",test)
});*/

}

    }
    client.end();

  }
}