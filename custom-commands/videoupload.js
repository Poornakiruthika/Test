var xlsx = require('xlsx');
var fs = require('fs');
var Excel = require('exceljs');
var workbook1 = new Excel.Workbook();
if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('boxxspring.xlsx',{ cellStyles: true });
var countBeforeAdd;
var worksheet = workbook.Sheets['videoupload'];
var videoUrl = [];
var videoTitle = [];
var shortTitle = [];
var shortDesc = [];
var author = [];
var attribution = [];
var categoryName = [];
var categoryType = [];
var shortNote = [];
var dragImg = [];
var result = [];


module.exports = {
 before: function(browser)  {
    var profile = browser.globals.profile;
    browser.resizeWindow(1585, 2187);
    //browser.windowMaximize();
    browser.
    login(profile.portalUri, profile.username, profile.password);
  },
  'Uploading a Video URL': function(client) {
    //Read values from excel
    for (z in worksheet)   {
      if (z[0] === '!') continue;
      //Read video URL
      if (z.includes('A'))  {
        videoUrl.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Video Title
      if (z.includes('B'))  {
        videoTitle.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Short Title
      if (z.includes('C'))  {
        shortTitle.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Short Description
      if (z.includes('D'))  {
        shortDesc.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Author Name
      if (z.includes('E'))  {
        author.push(worksheet[z].v);
        console.log(worksheet[z].v);
      }
      //Read Attribution Name
      if (z.includes('F'))  {
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
    if (videoUrl.length > 0) {
      console.log("length",+videoUrl.length);
      //console.log("video",+videoUrl);
      //for ( var i in videoUrl ) {
         //for (var i = 0; i < videoUrl.length; i++)  {
        
        //Search for videos link
        //console.log("First", i);
        client.pause(9000).
        waitForElementVisible("span.ng-isolate-scope:nth-child(4) > span:nth-child(1) > ng-transclude:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)", 5000).
        //"li.active > a:first-child" 
        verify.containsText("span.ng-isolate-scope:nth-child(4) > span:nth-child(1) > ng-transclude:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)", "Videos").
        click("span.ng-isolate-scope:nth-child(4) > span:nth-child(1) > ng-transclude:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)").
        pause(10000)
        
        client.getText('.content-count > strong', function(result) {
          if (result.status !== -1) {
            countBeforeAdd = result.value;
            countBeforeAdd = countBeforeAdd.substring(1, countBeforeAdd.length - 1);
            console.log('Count - Before adding video: ' + countBeforeAdd)
          }
          client.waitForElementVisible(".btn.btn-primary.btn-add", 9000).
          verify.visible(".btn.btn-primary.btn-add").
          pause(5000).
          //moveToElement(".btn.btn-primary.btn-add",0,0).
          click(".btn.btn-primary.btn-add").
          pause(9000)
           for (var i = 0; i < videoUrl.length; i++) {
            client.
          waitForElementVisible("#video_url", 9000,false).
          pause(9000).
          verify.visible("#video_url")
          //geturl = 'https://vimeo.com/29247071';
          // geturl = videoUrl [ i ];
          //var geturl ='https://facebook.com/';
         
          client.
          pause(5000).
          setValue("#video_url", videoUrl[i])

          //Check the valid URL from given URL
          //client.url(function ( test ) {
          console.log("Given URL:", videoUrl[i]);
          console.log("Given URL:", i.length + " = " + videoUrl[i]);
          console.log("Given URL:", i + " = " + videoUrl.length);
          if (videoUrl[i].match(/www.dailymotion.com/g))
          //  if ( videoUrl [ i ].match ( /www.youtube.com/g ))
          {
            client.pause(5000).
            waitForElementVisible('.video-preview', 15000).
            //Check Video Preview and Title
            verify.visible(".video-preview").
            verify.visible(".video-title").
            //Check - Continue Button
            verify.visible(".edit-form > div > .btn-primary")
            console.log("Dailymotion url is passed");
            client.videoproperties(videoTitle[i], shortTitle[i], shortDesc[i], author[i], attribution[i], categoryName[i], shortNote[i], dragImg[i], countBeforeAdd);
            //client.properties( profile1.videoTitle[i]);
          if(i<videoUrl.length-1) {

                this.getText('.content-count > strong', function(result) {
          if (result.status !== -1) {
            countBeforeAdd = result.value;
            countBeforeAdd = countBeforeAdd.substring(1, countBeforeAdd.length - 1);
            console.log('Count - Before adding video: ' + countBeforeAdd)
          }
          this.pause ( 10000).
        waitForElementVisible(".btn.btn-primary.btn-add", 9000).
          verify.visible(".btn.btn-primary.btn-add").
          //moveToElement(".btn.btn-primary.btn-add",0,0).
          click(".btn.btn-primary.btn-add")
          //Get no of Videos
        });
              }
          }
          else if (videoUrl[i].match(/www.youtube.com/g)) {
            client.pause(5000).
            waitForElementVisible('.video-preview', 15000,false).
            //Check Video Preview and Title
            verify.visible(".video-preview").
            pause(5000).
            verify.visible(".video-title").
            //Check - Continue Button
            verify.visible(".edit-form > div > .btn-primary")
            console.log("Youtube url is passed");
            client.videoproperties(videoTitle[i], shortTitle[i], shortDesc[i], author[i], attribution[i], categoryName[i], shortNote[i], dragImg[i], countBeforeAdd);
          
          if(i<videoUrl.length-1) {

                this.getText('.content-count > strong', function(result) {
          if (result.status !== -1) {
            countBeforeAdd = result.value;
            countBeforeAdd = countBeforeAdd.substring(1, countBeforeAdd.length - 1);
            console.log('Count - Before adding video: ' + countBeforeAdd)
          }
          this.pause ( 10000).
        waitForElementVisible(".btn.btn-primary.btn-add", 9000).
        pause(5000).
          verify.visible(".btn.btn-primary.btn-add").
          //moveToElement(".btn.btn-primary.btn-add",0,0).
          click(".btn.btn-primary.btn-add")
          //Get no of Videos
        });
              }
          }
          else if (videoUrl[i].match(/vimeo.com/g))  {
            client.pause(15000).
            waitForElementVisible('.video-preview', 15000,false).
            pause(15000).
            //Check Video Preview and Title
            verify.visible(".video-preview").
            pause(15000).
            verify.visible(".video-title").
            //Check - Continue Button
            verify.visible(".edit-form > div > .btn-primary")
            console.log("Vimeo url is passed");
             console.log("Beforefor loop:" +i);
            client.videoproperties(videoTitle[i], shortTitle[i], shortDesc[i], author[i], attribution[i], categoryName[i], shortNote[i], dragImg[i], countBeforeAdd);
         if(i<videoUrl.length-1) {

                this.getText('.content-count > strong', function(result) {
          if (result.status !== -1)  {
            countBeforeAdd = result.value;
            countBeforeAdd = countBeforeAdd.substring(1, countBeforeAdd.length - 1);
            console.log('Count - Before adding video: ' + countBeforeAdd)
          }
          this.pause ( 10000).
        waitForElementVisible(".btn.btn-primary.btn-add", 9000).
          verify.visible(".btn.btn-primary.btn-add").
          //moveToElement(".btn.btn-primary.btn-add",0,0).
          click(".btn.btn-primary.btn-add")
          //Get no of Videos
        });
              }
          }
        
          else {
            console.log("Invalid url :Failed");
            client.
            pause(5000).
            waitForElementVisible('.field-error > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)', 15000, false).
            getText('.field-error > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)', function(urlErrorMsg) {
              if (urlErrorMsg.status !== -1) {
                var errmsg = urlErrorMsg.value;
                console.log("Invalid message" + errmsg)
                var expectedmsg = "Please enter a valid URL.";
                if (expectedmsg == errmsg) {
                  
                 workbook1.xlsx.readFile('boxxspring.xlsx', { cellStyles: true })
                    .then(function() {

                        var worksheet1 = workbook1.getWorksheet( 'videoupload' );
                        var row = worksheet1.getRow(2);
                        row.getCell(11).font = { bold: true, color:{ argb: 'FFFF0000' } }; 
                        row.alignment= { wrapText: true } 
                        row.getCell(11).value = 'FAIL';  
                        row.getCell(12).font = { color:{ argb: 'FFFF0000'} };
                        row.alignment= { wrapText: true } 
                        row.getCell(12).value = "ActualResult: '" + countAfterAdd + "' in the Total Videos Count After Added New story. ExpectedResult: should be'" + countBeforeAdd1 + "' in the Total Videos Count "; 
                        result.push ( 'FAIL' );              
                        row.hidden = false;
                        worksheet1.getColumn(j).hidden = false; 
                        workbook1.xlsx.writeFile( 'boxxspring.xlsx' );
                        row.commit(); 
                    console.log("if error passed");
                    });

                }
                else  {
                  console.log("not found in the page")
                  workbook1.xlsx.readFile('boxxspring.xlsx', { cellStyles: true })
                    .then(function() {
                      var worksheet1 = workbook1.getWorksheet('videoupload');
                      var row = worksheet1.getRow(++j);
                      row.getCell(11).font = { bold: true, color: { argb: 'FFFF0000' }
                      };
                      row.alignment = { wrapText: true }
                      row.getCell(11).value = 'FAIL';
                      row.getCell(12).font = { color: { argb: 'FFFF0000' }
                      };
                      row.alignment = { wrapText: true }
                      row.getCell(12).value = "ActualResult: '" + countAfterAdd + "' in the Videos Total Count After Added New. ExpectedResult: should be'" + countBeforeAdd1 + "' in the Video Total Count ";
                      result.push('FAIL');
                      row.hidden = false;
                      worksheet1.getColumn(j).hidden = false;
                      workbook1.xlsx.writeFile('boxxspring.xlsx');
                      row.commit();
                    });
                }
              }
             
            });
           client.pause(5000).
           waitForElementVisible ( "span.ng-isolate-scope:nth-child(4) > span:nth-child(1) > ng-transclude:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)", 5000 ).
          verify.containsText ( "span.ng-isolate-scope:nth-child(4) > span:nth-child(1) > ng-transclude:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)", "Videos" ).
          click ( "span.ng-isolate-scope:nth-child(4) > span:nth-child(1) > ng-transclude:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)" ).
          pause ( 9000 )
            if( i<videoUrl.length-1) {

                client.getText('.content-count > strong', function(result1) {
          if (result1.status !== -1) {
            countBeforeAdd = result1.value;
            countBeforeAdd = countBeforeAdd.substring(1, countBeforeAdd.length - 1);
            console.log('Count - Before adding video: ' + countBeforeAdd)
          }
          client.pause ( 10000).
        waitForElementVisible(".btn.btn-primary.btn-add", 9000).
          verify.visible(".btn.btn-primary.btn-add").
          //moveToElement(".btn.btn-primary.btn-add",0,0).
          click(".btn.btn-primary.btn-add")
          //Get no of Videos
        });
              }
          }
      } } ); 
          //}
        //});
        //this.assert.fail( undefined, undefined , "Invalid url" ) });
        //client.waitForElementVisible ( '.field-error', 15000 ).
        //verify.visible ( ".field-error" )
        //  });    
      client.end();
    }
    //else { console.log("overall scenario failed")}
    
  }
}
