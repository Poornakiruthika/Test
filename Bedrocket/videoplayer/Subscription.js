var YouTube = require( 'youtube-node' );
var youTube = new YouTube();
var request = require('request');
var requestURL = "https://api.staging.boxxspring.com/properties/81/artifacts?access_token=bc217390eb363759cb1e2aa758ed7cc3&type_name.in[]=video_artifact&provider.in[]=YouTube&sort_by=updated_at&sort_direction=asc&include[artifact_locators]=true&count=200";
var titleYT = [];
var arrayed = [];
var videoID = [];
var response = [];
var cron = require('node-cron');
var ingestionTime = [];
var storeResponse = [];
var requestBedrocketAPI = "https://api.staging.boxxspring.com/properties/81/subscriptions?access_token=bc217390eb363759cb1e2aa758ed7cc3&url=";
var xlsx = require( 'xlsx' );
var fs = require( 'fs' );
var Excel = require( 'exceljs' );
var j=0;
var workbook1 = new Excel.Workbook();
if ( typeof require !== 'undefined' )  XLSX = require( 'xlsx' );
try
{
  var workbook = XLSX.readFile( 'boxxspring.xlsx', {
    cellStyles: true
  } );
  var worksheet = workbook.Sheets['g'];
}
catch( err ) 
{
  console.log( "Please check File name" ); 
}
var YoutubeURL = [];
var ingestionTime = [];
var youtube = "youtube";
module.exports = {
  before: function( browser )  {
    var profile = browser.globals.profile;
    browser.windowMaximize().
    login( profile.portalUri, profile.username, profile.password );

  },
  'Adding New Youtube Subscription': function( client )  {
    try{
      for ( z in worksheet )  {
        if( z[0] === '!' )  continue;
        else if( z.includes( 'D' )  )  {
          YoutubeURL.push( worksheet[z].v );
          // console.log( worksheet[z].v );
        }
        else if( z.includes( 'E' )  )  {
          ingestionTime.push( worksheet[z].v );
          // console.log( worksheet[z].v );
        }
      }
    }
    catch( err ) {
      console.log( "Unable to load file!" );
    }
    client.
    useXpath(). 
    click( "( //DIV[@class='content-header content ng-scope'] ) [3]" ).
    pause( 5000 )
   
      //Fetching the Youtube Playlist using the Youtube API
      var ypi = require ( 'youtube-playlist-info' );
     
      var schedule = require('node-schedule');
      let startTime = new Date(Date.now() + 5000);
      let endTime = new Date(startTime.getTime() + 1000);
      var sch = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
        console.log("Start time = ",startTime);
        console.log("Start time = ",endTime);
 for ( var i = 1; i < YoutubeURL.length; i++ )  {
   var afterComma = YoutubeURL[i].substr( YoutubeURL[i].indexOf( "list=" )  + 5 );
   console.log(afterComma);
        ypi.playlistInfo( "AIzaSyCZ3TTqlOIlNxpozt1RpymW_af4I1c-2r8",afterComma,  function( playlistItems  )  {
          playlistItems.forEach( function( entry )  {
            videoID.push( entry.resourceId.videoId );
          } );
         console.log(videoID.length); 
       for(var l=0;l<=videoID.length;l++)
       {
        console.log(videoID[l]);
       }
        } );  

      client.
      pause( 7000 ).
      useXpath().
      //Checking the Subscription button is visibility
      waitForElementPresent("//ul/li/a[text() ='Subscriptions']",5000,false,function( activeStatus ){
        //if the Subscription button is not visible then Click on Curation button and then click on Subscription button 
        if( activeStatus.value == true ) {
          client.
          useXpath().
          click( "( //DIV[@class='content-header content ng-scope'] ) [3]" ).
          pause(5000).
          click( "//ul/li/a[text()  ='Subscriptions']" );
          getText("//STRONG[@class='ng-binding']",function(subsCount){
            console.log(subsCount.value);
          });
          return this;
        }
        //if the Subscription button is visible then Click directly on the Subscription button
        else
        {
          client.
          useXpath().
          pause( 5000 ).
          //clicking the Subscription button
          click( "//ul/li/a[text() ='Subscriptions']" );
        }
      });
      client.
      pause( 9000 ).
      useCss().
      //clicking the Add subscription button from the list page
      waitForElementVisible( "a.btn-primary",9000,false ).
      pause( 7000 ).
      click( "a.btn-primary" ).
      pause( 5000 ).
      verify.visible( "h1.ng-scope" ).
      pause( 7000 ).
      //Checking the Add Subscription text visibility
      verify.containsText ( "h1.ng-scope","Add Subscription" ).
      pause( 7000 );
      //Set the URL in the URL field only if the URL is Youtube and Valid
      if ( new RegExp( youtube ).test( YoutubeURL[i] ) == true )  
      {
        client.
        useXpath(). 
      //Clicking the Youtube Subscription button
      verify.visible( "//ul/li/a[contains( .,'YouTube' ) ]" ).
      pause( 5000 ).
      click( "//ul/li/a[contains( .,'YouTube' ) ]" ).
      useCss().
      //checking whether the control is in Add Subscription Page
      verify.visible( ".typeName-label" ).
      useXpath().
      //Passing the Value to the Subscription URL text field.
      setValue( "//INPUT[@id='subscription_url']",YoutubeURL[i] ).
      useCss().
      pause( 4000 ).
      //Clicking the Next button in the Add Subscription button
      verify.visible( "button.btn:nth-child( 2 )" ).
      click( "button.btn:nth-child( 2 )" ).
      pause( 9000 ).
      useCss().
      //Checking whether the Control has moved to next page.
      waitForElementVisible(".typeName-label",5000,false).
      //Clicking the Ingestion frequency OFF dropdown      
      click( ".default-item>a" ).
      pause( 5000 ).
      useXpath().
      //Making the Ingestion frequency OFF
      click( "//a[@class='ellipsis ng-binding'][contains( .,'"+ ingestionTime[i] +"' ) ]" ).
      pause( 5000 ).
      //Clicking the Subscribe button
      waitForElementVisible( "//A[@class='btn btn-primary pull-right button-fetch ng-scope'][contains( .,'Subscribe' ) ]",5000,false ).
      click( "//A[@class='btn btn-primary pull-right button-fetch ng-scope'][contains( .,'Subscribe' ) ]" ).
      pause(9000).
      waitForElementNotPresent("//A[@class='btn btn-primary pull-right button-fetch ng-scope'][contains( .,'Subscribe' ) ]",5000,false).
      pause(3000).
      useCss().
      waitForElementVisible("li.selected-item:nth-child(2) > a:nth-child(1)",5000,false).
      pause(3000).
      verify.visible(".btn-delete").
      pause(3000).
      verify.visible(".btn-pullout").
      pause(3000).
      verify.visible(".btn-saved > span:nth-child(2)")
      // pause(300000).
    }
      //If the URL is invalid the control will pass to else block
      else 
      {
        client.
        writeToExcelFail( 'boxxspring.xlsx' , 'g' , i , 'C' , "Invalid URL");
        console.log( "Invalid URL" );
      }
    
 
  //This function will check whether the VideoID from youtube is present in Boxxspring portal.
   client.
    useXpath().
    //Navigates to the Video List page.
    click("//ul/li/a[text() ='Videos']").
    pause(5000);
    //API which will get the Youtube videoID from Boxxspring.
    //Gets the Total count of the Youtube vids present in the Boxxspring.
    request('https://api.staging.boxxspring.com/properties/81/artifacts?access_token=bc217390eb363759cb1e2aa758ed7cc3&type_name.in[]=video_artifact&provider.in[]=YouTube&sort_by=updated_at&sort_direction=asc&include[artifact_locators]=true&count=200', function (error, response, body) {
      var ob = JSON.parse( body );
      var arrayaa = ob.$this.unlimited_count;
      var loopCount = Math.ceil((arrayaa)/100);
      console.log("count:",loopCount);
      var next =0;
      for (var i =0; i < loopCount; i++) 
      {
        var date = new Date;
        // date.setHours(date.getHours() + 0);
        // date.setMinutes(date.getMinutes() + 0);
        var min = date.getMinutes();
        var timea = date.getHours();
        // var dateTime = require('get-date');
        request(requestURL+"&offset="+(i*100), function (error, response, body) {
          var oqb = JSON.parse( body );
          var arrayaa1 = oqb.$this.count;
          for(j=0 ; j < arrayaa1 ; j++)
          {
            var a=j+next;
            storeResponse.push(oqb.artifacts[j].provider_uid);
          }
          next = parseInt(next+100);
          var compare = videoID.length;
          var res = [];
          //Checks the VideoID in Boxxspring Array and returns the matched videoID
            for (var y = 0; y < compare ; y++) {
              var unique = [];
              res.push(storeResponse.indexOf(videoID[y]));
              console.log("Existing videoID in Boxxspring - ",storeResponse[res[y]]);
              unique = res.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
                return elem !== undefined;
              })
              console.log(unique);
            }
        });
      }
    });
       }
  } );
}}