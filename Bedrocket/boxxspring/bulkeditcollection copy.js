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
      console.log("length", +collectionTitle.length);

      var v = 1;

      console.log("V value:", v);

      client.pause(10000).

      useXpath().
      verify.containsText("//ul/li/a[ text() = '" + collectionTitle[v] + "']", collectionTitle[v]).
      pause(9000).
      click("//ul/li/a[ text() = '" + collectionTitle[v] + "']").
      pause(10000).
      useCss().
      getText('.content-count > strong', function(currentCountResult) {
          console.log("function started")
          //console.log("i1 value:", i)
          //console.log("value generated:", i)
          if (currentCountResult.status !== -1) {
            currentCount = currentCountResult.value;
            currentCount = currentCount.substring(1, currentCount.length - 1);
            console.log('Count - Before editing collection Menu: ' + currentCount)
          }
          if (currentCount !== 0){

//client.source(function(result1){
	//console.log("result",result1.value)
//});


var testvar1 = [];
for(var t=0, l =3;t<l;t++){
client.
useXpath().
  getText("//*[contains(@class,'content-title')]/h2",function arrAdd(bulkSearchCate){
  	//getText("//ul[@class='index-list']//*[contains(@class,'content-title')]",function (bulkSearchCate){
  	//getText("h2.ng-binding",function(bulkSearchCate){
console.log("t",t)


if( t>=l ){

var y =t-l;
t++;

}

  		//ul[@class='index-list']//*[@class='content-title']
    //client.useCss();
//var bulkSearch = [];
console.log("12342",bulkSearchCate.value)
        console.log("wholevalue",bulkSearchCate)

    testvar1.push(bulkSearchCate.value.append);

        console.log("tsetvar?:",testvar1);
/*
for(var r=0, l =3;r<l;++r){
    console.log("R-value:",r)

    arr.push(bulkSearchCate.value);
    


    console.log("inside_value:",arr)
 }

console.log("lastvalue:",arr)
//console.log("value fully:",bulkSearch)*/

});}
client.useCss().elements('xpath',"//ul[@class='index-list']//*[contains(@class,'content-title')]", function(result1){
	console.log("result",result1.value)
        console.log("wholevalue",result1)
var dates = [];
       els = result1.value;
       var i = 0;
       els.forEach(function(el, j, elz){
       	console.log("foreach",el.textContent, j.textContent, elz.textContent)
       	console.log("foreach value",el.value, j.value, elz.value)
           client.elementIdText(el.ELEMENT,id,function(text) {
           	console.log("text:",result1)
                dates[i] = text.value;
               i++;
           console.log("lastvalue:",dates[i])


           });
       });
   });


/*client.elements('css selector', 'h2.ng-binding', function(result) {
          console.log("check value:",result.value)
          console.log("check value22:",result)
        for(var k=0;k<18;k++) {
          this.elementIdText(result.value[k].ELEMENT, 'id', function(result2) {
            console.log("result2",result2.value);});
        }
              });*/
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
setValue("input.ng-pristine:nth-child(3)","Play").
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

    setValue(".search-field-input","PlaylistMay4").
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
pause(7000)
var arr = [];

for(var t=0, l =3;t<l;t++){
client.
useXpath().
  getText("//*[contains(@class,'content-title')]/h2",function arrAdd(bulkSearchCate){
  	//getText("//ul[@class='index-list']//*[contains(@class,'content-title')]",function (bulkSearchCate){
  	//getText("h2.ng-binding",function(bulkSearchCate){

  		//ul[@class='index-list']//*[@class='content-title']
    //client.useCss();
//var bulkSearch = [];
console.log("12342",bulkSearchCate.value)
        console.log("wholevalue",bulkSearchCate)
var testvar = [];
testvar = bulkSearchCate.value.append;
        console.log("tsetvar?:",testvar);
/*
for(var r=0, l =3;r<l;++r){
    console.log("R-value:",r)

    arr.push(bulkSearchCate.value);
    


    console.log("inside_value:",arr)
 }

console.log("lastvalue:",arr)
//console.log("value fully:",bulkSearch)*/

});}

client.elements('xpath',"//ul[@class='index-list']//*[contains(@class,'content-title')]", function(result1){
	console.log("result",result1.value)
        console.log("wholevalue",result1)
var dates = [];
       els = result1.value;
       var i = 0;
       els.forEach(function(el, j, elz){
       	console.log("foreach",el, j, elz)
           client.elementIdText(el.ELEMENT,id,function(text) {
           	console.log("text:",result1)
                dates[i] = text.value;
               i++;
           console.log("lastvalue:",dates[i])


           });
       });
   });

/*var s1=document.getElementsByClassName("index-list")[0].getElementsByTagName("h2");
alert(s1.length);
var s2=[];
for (i = 0; i < s1.length; i++) {
s2[i]=s1[i].textContent;
}*/





          }
      


else{

console.log("Failed")

}



















    });}
    client.end();

  }
}