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
  'Create Content Menu': function(client) {
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
      //for ( var i in videoUrl ) {
      //for (var i = 0; i < videoUrl.length; i++)  {
      //Search for videos link
      //console.log("First", i);
      client.pause(10000).     
      waitForElementVisible("div.content:nth-child(1) > a:nth-child(2)",9000,false).
      pause(10000).
      verify.containsText("div.content:nth-child(1) > a:nth-child(2)", "CONTENT").  //Contentdiv.note-input:nth-child(2) > div:nth-child(3)
      pause(9000).   
      
      waitForElementVisible("div.content:nth-child(1) > span:nth-child(3) > a:nth-child(1) > img:nth-child(1)", 9000).
      verify.visible("div.content:nth-child(1) > span:nth-child(3) > a:nth-child(1) > img:nth-child(1)").
        pause(5000).
        //moveToElement(".btn.btn-primary.btn-add",0,0).
        click("div.content:nth-child(1) > span:nth-child(3) > a:nth-child(1) > img:nth-child(1)").
        pause(9000)


        for (var i = 0, j = 0; i < contentTitle.length; i++) {
          client.
          waitForElementVisible(".text-input-headline", 9000, false).
          pause(9000).
          verify.visible(".text-input-headline").
          pause(5000).
          setValue(".text-input-headline", contentTitle[i])
          //Check the valid URL from given URL

          console.log("Given URL:", contentTitle[i]);
                   
client.
useXpath(). 
         verify.containsText("//label[text()='"+categoryType[i].trim()+"']",categoryType[i].trim()).
         pause(9000).
         click("//label[text()='"+categoryType[i].trim()+"']").
         pause(9000).
         // verify.containsText("//label[text()='"+providerType[i].trim()+"']",providerType[i].trim()).
         //pause(9000).
         //click("//label[text()='"+providerType[i].trim()+"']").
useCss().

         elements('css selector', '.checkbox>label.select', function(result) {
          console.log("check value:",result.value)
        for(var k in result.value) {
          this.elementIdAttribute(result.value[k].ELEMENT, 'boolean', function(result2) {
            console.log("result2",result2.value);});}
              });

         client.element('xpath',"//label[text()='Groups']", function(response) {
     console.log("check value1:",response.value)
   // client.click(response);
   // for(var k in response.value) {
       client.elementIdSelected(response.value.ELEMENT, function(test){
        client.verify.ok(test.value, 'Checkbox is selected');
     console.log("Result value:",test.value)

      });});
//useCss().
client.waitForElementVisible(".presentation",9000,false).
pause(9000)
if(alignment[i] === "Grid"){
	console.log("Grid passed:",alignment[i]);
client.waitForElementVisible(".grid",9000,false).
pause(9000).
click(".grid").
pause(10000)
}

// "//*[@class='presentation']//*[text()='"+alignment[i]+"']"
else if(alignment[i] === "List"){
	console.log("List passed:",alignment[i]);
	client.waitForElementVisible(".list",9000,false).
pause(9000).
click(".list").
pause(10000)
        }

        else{
	console.log("invalid input:",alignment[i]);


        }
    }
  }
      client.end();
    
 }
}