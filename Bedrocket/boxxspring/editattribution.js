var xlsx = require('xlsx');
var fs = require('fs');
var Excel = require('exceljs');
var workbook1 = new Excel.Workbook();
if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('boxxspring.xlsx', {
  cellStyles: true
});
var worksheet = workbook.Sheets['editattributions'];
var attributionTitle = [];
var attributionSearch = [];
var attributionDescription = [];
var attributionShortTitle = [];
var attributionShortDesc = [];
var attributionCategoryName = [];
var attributionNote = [];
var attributionImg = [];
var result = [];
var currentCount;
var actualCount;
var expectedCount;
var jj;
module.exports = {
  tags: ['editattributions'],
  before: function(browser) {
    var profile = browser.globals.profile;
    browser.resizeWindow(1600, 900);
    browser.maximizeWindow();
    browser.login(profile.portalUri, profile.username, profile.password);
  },

  'Edit Attributions in CONTENT': function(client) {

    for (z in worksheet) {
      if (z[0] === '!') continue;
      //Read Category Title
      if (z.includes('A')) {
        attributionTitle.push(worksheet[z].v);
      }
      //Read authors Description
      if (z.includes('B')) {
        attributionSearch.push(worksheet[z].v);
      }
      if (z.includes('C')) {
        attributionDescription.push(worksheet[z].v);
      }
      //Read Short Title
      if (z.includes('D')) {
        attributionShortTitle.push(worksheet[z].v);
      }
      //Read Short Description
      if (z.includes('E')) {
        attributionShortDesc.push(worksheet[z].v);
      }
      //Read authors category Name
      if (z.includes('F')) {
        attributionCategoryName.push(worksheet[z].v);
      }
      
      //Read authors Note
      if (z.includes('G')) {
        attributionNote.push(worksheet[z].v);
      }
      //Read authors Image
      if (z.includes('H')) {
        attributionImg.push(worksheet[z].v);
      }

    }

    if (attributionTitle.length > 1) {
      console.log("Length:", +attributionTitle.length)
      //for ( var i in categoryTitle ) {
      var j = 1;
      client.pause(9000).
      //span.ng-isolate-scope:nth-child(4) > span:nth-child(1) > ng-transclude:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(6) > a:nth-child(1)
      //Check and click Article menu
      //verify.containsText ( "ng-transclude > div .sidenav > li:nth-child( 6 ) >a","Categories" ).
      useXpath().
      verify.containsText("//ul/li/a[ text() = 'Attributions']", "Attributions").
      pause(3000).
      click("//ul/li/a[ text() = 'Attributions']").
      useCss().
      //click ( "ng-transclude > div .sidenav > li:nth-child( 6 ) > a" ).    
      pause(9000).

      getText('.content-count > strong', function(currentCountResult) {
        if (currentCountResult.status !== -1) {
          currentCount = currentCountResult.value;
          currentCount = currentCount.substring(1, currentCount.length - 1);
          console.log('Count - Before adding an Categories: ' + currentCount);
        }
        for (var i = 1; i < attributionTitle.length; i++) {
          client.pause(9000).waitForElementVisible(".search-field-input", 5000).
          verify.visible(".search-field-input").

          setValue(".search-field-input", attributionSearch[i])
          console.log("New One", attributionSearch[i]);
          client.
          //input[type=text]:-ms-clear {
          // display: none;}
          keys(client.Keys.ENTER). // hold the control
          click(".search-field-input").
          keys(client.Keys.NULL). // release the control
          pause(10000).
          waitForElementVisible(".content-count>strong", 9000, false).
          verify.visible(".content-count>strong")
          console.log('Count - I First: ', i);
          var jj = 0;
          client.getText('.content-count > strong', function(currentCountResult) {
            console.log("ket Inside currentCountResult:", i);

            if (i >= (attributionTitle.length-)) {
              jj = (i - (attributionTitle.length-));
              i++;
            }

            console.log("ket Inside currentCountResult JJ:", jj);
            console.log("ket Inside currentCountResult I:", i);

            if (currentCountResult.status !== -1) {

              searchCount = currentCountResult.value;
              console.log("Two test", attributionTitle[jj]);
              searchCount = searchCount.substring(1, searchCount.length - 1);
              console.log('Searched Article Count: ' + searchCount);
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
              pause(9000).
              //Check and Enter Categories Title
              waitForElementVisible(".text-input-headline", 9000, false).
              clearValue(".text-input-headline").
              setValue(".text-input-headline", attributionTitle[jj]).
              pause(9000).

              //Check and Enter Categories Text Description
              waitForElementVisible(".wmd-input", 9000, false).
              clearValue(".wmd-input").
              setValue(".wmd-input", attributionDescription[jj]).
              pause(9000).

              //Check and click Save button
              waitForElementVisible('.btn-active', 9000, false).
              verify.visible(".btn-active").
              pause(9000).
              click(".btn-active").
              pause(10000)
              console.log("JJ ValueFirst:", jj);
              client.
              authorsproperties(attributionShortTitle[jj], attributionShortDesc[jj], attributionCategoryName[jj], attributionNote[jj], attributionImg[i], currentCount, jj).
              pause(9000).
              useXpath().
              verify.containsText("//ul/li/a[ text() = 'Attributions']", "Attributions").
              pause(3000).
              click("//ul/li/a[ text() = 'Attributions']").
              useCss().
              pause(9000).
              getText('.content-count > strong', function(actualCountResult) {
                if (actualCountResult.status !== -1) {
                  actualCount = actualCountResult.value;
                  actualCount = actualCount.substring(1, actualCount.length - 1);
                  console.log('Count - After Edit Attributions: ' + actualCount);
                  //expectedCount = ( ( +currentCount ) + ( +1 ) );
                  console.log('Count - Edit Attributions: ' + currentCount);

                  if (actualCount == currentCount) {
                    console.log("Actual and Expected counts are equal");
                    client.writeToExcelPass('boxxspring.xlsx', 'editattributions', ++j, 11, 12);

                  }
                  else {
                    console.log("if Failed");
                    client.writeToExcelFail('boxxspring.xlsx', 'editattributions', ++j, 11, 12, actualCount, currentCount);
                  }

                }
              });

              if (i < attributionTitle.length - 1) {
                client.getText('.content-count > strong', function(currentCountResult) {
                  if (currentCountResult.status !== -1) {
                    currentCount = currentCountResult.value;
                    //currentCount = currentCount.substring ( 1, currentCount.length - 1 );
                    console.log('Count - Edit Attribution : ' + currentCount)
                  }

                });
              }
            }
            else {
              console.log('Count - Search Result : ' + searchCount)
              client.writeToExcelFailSearch('boxxspring.xlsx', 'editattributions', ++j, 11, 12, searchCount);
            }

          });
        }
      });

client.pause ( 5000 ).
        sendMail(result);
    }
    client.end();

  }
};