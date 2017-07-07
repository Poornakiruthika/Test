var xlsx = require('xlsx');
var fs = require('fs');
var Excel = require('exceljs');
var workbook1 = new Excel.Workbook();
if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('boxxspring.xlsx', {
  cellStyles: true
});
var worksheet = workbook.Sheets['editauthors'];
var authorTitle = [];
var authorDescription = [];
var authorShortTitle = [];
var authorShortDesc = [];
var authorCategoryName = [];
var authorNote = [];
var authorImg = [];
var result = [];
var currentCount;
var actualCount;
var expectedCount;
var authorSearch = [];
var i = 0;
var j = 0;
var jj;

module.exports = {
  tags: ['editauthors'],
  before: function(browser) {
    var profile = browser.globals.profile;
    browser.resizeWindow(1600, 900);
    browser.maximizeWindow();
    browser.login(profile.portalUri, profile.username, profile.password);
  },

  'Edit Authors in CONTENT': function(client) {

    for (z in worksheet) {
      if (z[0] === '!') continue;
      //Read Category Title
      if (z.includes('A')) {
        authorTitle.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read authors Description
      if (z.includes('B')) {
        authorDescription.push(worksheet[z].v);
        console.log(worksheet[z].v);

      }
      //Read Short Title
      if (z.includes('C')) {
        authorShortTitle.push(worksheet[z].v);
        console.log(worksheet[z].v);

      }
      //Read Short Description
      if (z.includes('D')) {
        authorShortDesc.push(worksheet[z].v);
        console.log(worksheet[z].v);

      }
      //Read authors category Name
      if (z.includes('E')) {
        authorCategoryName.push(worksheet[z].v);
        console.log(worksheet[z].v);

      }
     
      //Read authors Note
      if (z.includes('F')) {
        authorNote.push(worksheet[z].v);
        console.log(worksheet[z].v);

      }
      //Read authors Image
      if (z.includes('G')) {
        authorImg.push(worksheet[z].v);
        console.log(worksheet[z].v);

      }
      if (z.includes('H')) {
        authorSearch.push(worksheet[z].v);
        console.log(worksheet[z].v);

      }

    }

    if (authorTitle.length > 1) {
      console.log("Length:", +authorTitle.length)
      //for ( var i in categoryTitle ) {
      client.pause(9000).
      //span.ng-isolate-scope:nth-child(4) > span:nth-child(1) > ng-transclude:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(6) > a:nth-child(1)
      //Check and click Article menu
      //verify.containsText ( "ng-transclude > div .sidenav > li:nth-child( 6 ) >a","Categories" ).
      useXpath().
      verify.containsText("//ul/li/a[ text() = 'Authors']", "Authors").
      pause(3000).
      click("//ul/li/a[ text() = 'Authors']").
      useCss().
      //click ( "ng-transclude > div .sidenav > li:nth-child( 6 ) > a" ).    
      pause(9000).

      getText('.content-count > strong', function(currentCountResult) {
        if (currentCountResult.status !== -1) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring(1, currentCount.length - 1);
          console.log('Count - Before adding an Categories: ' + currentCount);
        }
        for (i = 1; i < authorTitle.length; i++) {
          //for(var i in authorTitle ) {

          console.log('initial i: ', authorTitle[i], "i:", +i);

          client.pause(9000).waitForElementVisible(".search-field-input", 5000).
          verify.visible(".search-field-input").
          pause(5000).
          clearValue(".search-field-input").
          pause(7000).
          setValue(".search-field-input", authorSearch[i]).
          pause(5000).
          //input[type=text]:-ms-clear {
          // display: none;}
          keys(client.Keys.ENTER). // hold the control
          click(".search-field-input").
          keys(client.Keys.NULL). // release the control
          pause(10000)
          console.log("Before get:", authorTitle[i]);
          client.waitForElementVisible(".content-count>strong", 9000, false).

          verify.visible(".content-count>strong")
          console.log('Count - I First: ', i);
          var jj = 0;
          client.pause(9000).getText('.content-count > strong', function(currentCountResult1) {

            if (i >= (authorTitle.length-1)) {
              jj =( i - (authorTitle.length-1));
              i++;
            }
            console.log("first Inside search jj:", authorTitle[jj]);
            console.log("iiiiiii Inside search :", i);

            if (currentCountResult1.status !== -1) {
              searchCount = currentCountResult1.value;
              searchCount = searchCount.substring(1, searchCount.length - 1);
              //console.log ( 'Searched Authors Count: ' +searchCount );
              //console.log("Inside search :",authorTitle[i]);

            }
            //else{}
            if (searchCount > 0) {
              console.log("if statement searchcount:", +searchCount);

              //client.waitForElementVisible ( " li.content-container:nth-child(1) > ng-include:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > a:nth-child(1) > h2:nth-child(1)", 9000,false ).

              //pause(9000).
              //click ( "li.content-container:nth-child(1) > ng-include:nth-child(1) > div:nth-child(1) > section:nth-child(1) > div:nth-child(2) > a:nth-child(1) > h2:nth-child(1)" ).
              //pause( 10000 )
              client.pause(7000).
              waitForElementVisible(".btn-pullout", 9000, false).
              pause(7000).
              moveToElement(".btn-pullout", 0, 0).
              pause(9000).
              click(".btn-pullout").
              pause(7000)
              console.log('Count - I: ', jj);
              client.pause(9000).
              verify.visible(".video-tabs > a[ href='#content']").
              click(".video-tabs > a[ href='#content']").
              pause(9000)
              console.log("After get:", authorTitle[jj]);
              //Check and Enter Categories Title
              client.waitForElementVisible(".text-input-headline", 9000, false).
              clearValue(".text-input-headline").
              pause(9000).
              setValue(".text-input-headline", authorTitle[jj]).
              pause(9000).

              //Check and Enter Categories Text Description
              waitForElementVisible(".wmd-input", 9000, false).
              clearValue(".wmd-input").
              setValue(".wmd-input", authorDescription[jj]).
              pause(9000).

              //Check and click Save button
              waitForElementVisible('.btn-active', 9000, false).
              verify.visible(".btn-active").
              pause(9000).
              click(".btn-active").
              pause(10000).
              authorsproperties(authorShortTitle[jj], authorShortDesc[jj], authorCategoryName[jj], authorNote[jj], authorImg[jj], currentCount, jj).
              pause(9000).
              useXpath().
              verify.containsText("//ul/li/a[ text() = 'Authors']", "Authors").
              pause(3000).
              click("//ul/li/a[ text() = 'Authors']").
              useCss().
              pause(9000).
              getText('.content-count > strong', function(actualCountResult) {
                if (actualCountResult.status !== -1) {
                  actualCount = actualCountResult.value;
                  actualCount = actualCount.substring(1, actualCount.length - 1);
                  console.log('Count - After Edit Authors: ' + actualCount);
                  //expectedCount = ( ( +currentCount ) + ( +1 ) );
                  console.log('Count - Edit Authors: ' + currentCount);

                  if (actualCount == currentCount) {
                    console.log("Actual and Expected counts are equal");
                    client.writeToExcelPass('boxxspring.xlsx', 'editauthors', ++j, 10, 11);

                  }
                  else {
                    console.log("if Failed");
                    client.writeToExcelFail('boxxspring.xlsx', 'editauthors', ++j, 10, 11, actualCount, currentCount);
                  }

                }
              });

              if (i < authorTitle.length - 1) {
                client.getText('.content-count > strong', function(currentCountResult) {
                  if (currentCountResult.status !== -1) {
                    currentCount = currentCountResult.value;
                    //currentCount = currentCount.substring ( 1, currentCount.length - 1 );
                    console.log('Count - Edit Authors : ' + currentCount)
                  }

                });
              }
            }
            else {
              console.log('Count - Search Result : ' + searchCount);
              console.log('Else Result : ');
              client.writeToExcelFailSearch('boxxspring.xlsx', 'editauthors', ++j, 10, 11, searchCount);
            }

          });
        }

      });
    }
    client.end();

    //client.pause ( 5000 ).
    //sendMail(result);
  }
};