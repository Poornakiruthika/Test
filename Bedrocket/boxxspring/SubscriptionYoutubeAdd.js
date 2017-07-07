//this function is for check and add the Subscription
var YouTube = require ( 'youtube-node' );
var youTube = new YouTube ( );
var request = require ('request' );
var requestURL = "https://api.staging.boxxspring.com/properties/81/artifacts?access_token=bc217390eb363759cb1e2aa758ed7cc3&type_name.in[]=video_artifact&provider.in[]=YouTube&sort_by=updated_at&sort_direction=asc&include[artifact_locators]=true&count=200";
var videoID = [];
var response = [];
var ytPlaylistCount;
var unique = [];
var excelRow;
var countBeforeAdd;
var expectedCount;
var countAfterAdd;
var date = new Date;
var date1 = new Date;
substring = "list=";
var ingestionTime = [];
var ypi = require  ( 'youtube-playlist-info' );
var storeResponse = [];
var afterComma = [];
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook ( );
if  ( typeof require !== 'undefined' )  XLSX = require ( 'xlsx' );
try
{
  var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
    cellStyles: true
  } );
  var worksheet = workbook.Sheets[ 'SubscriptionYoutubeAdd' ];

}
catch ( err ) 
{
  console.log ( "Please check File name" ); 
}
var YoutubeURL = [];
var ingestionTime = [];
var youtube = "youtube";
module.exports = {
  tags:[ 'subscriptionYoutubeAdd' ],
  before: function ( browser )  {
    var profile = browser.globals.profile;
    browser.windowMaximize ( ).
    login ( profile.portalUri, profile.username, profile.password );

  },
  'Adding New Youtube Subscription': function ( client )  {
    try{
      for  ( z in worksheet )  {
        if ( z[ 0 ] === '!' )  continue;
        else if ( z.includes ( 'B' )  )  {
          YoutubeURL.push ( worksheet[ z ].v );
        }
        else if ( z.includes ( 'C' )  )  {
          ingestionTime.push ( worksheet[ z ].v );

        }
      }
    }
    catch ( err ) 
    {
      client.
      //Writing the Failed status in the Excel sheet
      verify.fail ( "Unable to load file","Excel file should get updated","Please check the Parameters in Excel Sheet" );
    }
    client.
    useXpath ( ).
    pause ( 120000 ).
    //Click on the Curation Button from the SideBar
    click ( " ( //DIV[@class='content-header content ng-scope'] ) [3]" ).
    pause ( 5000 )
    for  ( var incrementer = 1,temp=0,excelRow = 1,invalidRow = 1; incrementer <= YoutubeURL.length-1; incrementer++ )  {
      if ( YoutubeURL[ incrementer ].includes ( substring ) == true ){
        afterComma.push ( YoutubeURL[ incrementer ].substr ( YoutubeURL[ incrementer ].indexOf ( "list=" )  + 5 ) );
        var schedule = require ('node-cron');
      //Defining the Ingestion Time According to the Result from the Excel Sheet
      if ( ingestionTime[ incrementer ] == 'OFF')
      {
        date.setHours ( date.getHours ( ) );
        date.setMinutes ( date.getMinutes ( ) + 3 );
        var min = date.getMinutes ( ); 
        var hours = date.getHours ( );
      }
      else if ( ingestionTime[ incrementer ] == '5 MIN' )
      {
        date.setHours ( date.getHours ( ) );
        date.setMinutes ( date.getMinutes ( ) + 3 );
        var min = date.getMinutes ( );
        var hours = date.getHours ( );
      } 
      else if ( ingestionTime[ incrementer ] == '10 MIN' )
      {
        date.setHours ( date.getHours ( ) );
        date.setMinutes ( date.getMinutes ( ) + 10 );
        var min = date.getMinutes ( );
        var hours = date.getHours ( );
      }
      else if ( ingestionTime[ incrementer ] == '30 MIN' )
      {
        date.setHours ( date.getHours ( ) );
        date.setMinutes ( date.getMinutes ( ) + 30 );
        var min = date.getMinutes ( );
        var hours = date.getHours ( );
      }
      else if ( ingestionTime[ incrementer ] == '1 HOUR' )
      {
        date.setHours ( date.getHours ( ) + 1 );
        date.setMinutes ( date.getMinutes ( ) );
        var min = date.getMinutes ( );
        var hours = date.getHours ( );
      }else if ( ingestionTime[ incrementer ] == '3 HOURS' )
      {
        date.setHours ( date.getHours ( ) + 3 );
        date.setMinutes ( date.getMinutes ( ) );
        var min = date.getMinutes ( );
        var hours = date.getHours ( );
      }
      else if ( ingestionTime[ incrementer ] == '6 HOURS' )
      {
        date.setHours ( date.getHours ( ) + 6 );
        date.setMinutes ( date.getMinutes ( ) );
        var min = date.getMinutes ( );
        var hours = date.getHours ( );
      }
      else if ( ingestionTime[ incrementer ] == '12 HOURS' )
      {
        date.setHours ( date.getHours ( ) + 12 );
        date.setMinutes ( date.getMinutes ( ) );
        var min = date.getMinutes ( );
        var hours = date.getHours ( );
      }
      else if ( ingestionTime[ incrementer ] == '1 DAY' )
      {
        date.setHours ( date.getHours ( ) + 24);
        date.setMinutes ( date.getMinutes ( ) );
        var min = date.getMinutes ( );
        var hours = date.getHours ( );
      }
      //Scheduling the API's to fetch values 
      var schedulers = schedule.schedule ('0 '+min+' '+hours+' * * *', function ( ){
        excelRow++;
        //Fetching the Youtube playlists VideoID from Youtube API
        ypi.playlistInfo ( "AIzaSyCZ3TTqlOIlNxpozt1RpymW_af4I1c-2r8",afterComma[temp],  function ( playlistItems )  {
          playlistItems.forEach ( function ( entry )  {
            //Pushing the VideoID into playlistItems array
            videoID.push ( entry.resourceId.videoId );
          } );
          //Storing the Total Count of Videos ID and storing it in the ytPlaylistCount var
          ytPlaylistCount = videoID.length;
        } );  
        temp++;
        //Paused for 2Mins to fecth the Videos in Boxxspring Portal
        client.pause ( 120000 );
        //Fetching the Total Count of Boxxspring Youtube VideoID using BoxxSpring API
        request ( requestURL, function  ( error, response, body ) {
          //Converting the Response to JSON Object and Storing in temp variable
          var temp = JSON.parse ( body );
          //Storing the Total count of the Youtube Videos in Boxxspring in the totalYoutubeCount variable
          var totalYoutubeCount = temp.$this.unlimited_count;
          //Get the Loopcount 
          var loopCount = Math.ceil ( ( totalYoutubeCount )/100);
          var next =0;
          //Iterating the API for getting the VideoID
          for  ( var scheduler =0; scheduler < loopCount; scheduler++ ) 
          {
            unique.length =0;
            request ( requestURL+"&offset="+ ( scheduler*100 ), function  ( error, response, body ) {
              //Storing the Response in the Temporary variable
              var temporary = JSON.parse ( body );
              //Getting the Count of Vide ID from the API Response
              var actualCount = temporary.$this.count;
              for ( apiRes=0 ; apiRes < actualCount ; apiRes++ )
              {
                var a=apiRes+next;
                //Pusing the VideoID's into the storeResponse array
                storeResponse.push (temporary.artifacts[apiRes].provider_uid);
              }
              next = parseInt (next+100);
              var compare = videoID.length;
              var res = [];
              res.length = 0;
          //Checks the VideoID in Boxxspring Array and returns the matched videoID
          for  ( var checkLoop = 0; checkLoop < compare ; checkLoop++ ) {
            //Get the Index of the StoreResponse only if it contains the videoID from the Youtube
            res.push ( storeResponse.indexOf (videoID[ checkLoop ]) );
            //If Empty then continue with the Script
            if ( res.length == 0 )
            {
              client.
              this.return;
            }
            //Checks if the res Array contains Undefined and Null values
            else if  ( typeof res =='undefined' && res== 'null' ) 
            {
                //Updating the Fail Status in Excel
                client.
                verify.fail ( "Videos from your youtube Subscription is not updated properly","All the Videos from the Youtube Subscription should get updated","Please tryagain with some other youtube Subscriptions").
                writeToExcelFail ( 'boxxspring.xlsx' , 'SubscriptionYoutubeAdd' ,excelRow , 4,5, "ActualResult: 'Videos are getting updated in Video Property'.ExpectedResult:  ( Videos should not updated in Video Property ) " );
              }
              else
              {
              //Updating the Pass Status in the Excel
              client.
              writeToExcelPass ( 'boxxspring.xlsx' , 'SubscriptionYoutubeAdd' , excelRow , 4 );            
            }
          }
        });
          }
        }); 
      });
      client.
      pause ( 30000 ).
      useXpath ( ).
      //Checking the Subscription button is visibility
      waitForElementPresent ( "//ul/li/a[text ( ) ='Subscriptions']",5000,false,function ( activeStatus ){
        //if the Subscription button is not visible then Click on Curation button and then click on Subscription button 
        if ( activeStatus.value == true ) {
          client.
          useXpath ( ).
          click ( " ( //DIV[@class='content-header content ng-scope'] ) [3]" ).
          pause ( 5000 ).
          click ( "//ul/li/a[text ( )  ='Subscriptions']" )
        }
        //if the Subscription button is visible then Click directly on the Subscription button
        else
        {
          client.
          useXpath ( ).
          pause ( 5000 ).
          //clicking the Subscription button
          click ( "//ul/li/a[text ( ) ='Subscriptions']" );
        }
      });
      client.
      pause ( 5000 ).
      verify.visible ( "//DIV[@class='suggestion-dropdown-wrap']" ).
      pause ( 5000 ).
      useCss ( ).
      //clicking the Add subscription button from the list page
      waitForElementVisible ( "a.btn-primary",9000,false ).
      pause ( 7000 ).
      click ( "a.btn-primary" ).
      pause ( 5000 ).
      verify.visible ( "h1.ng-scope" ).
      pause ( 7000 ).
      //Checking the Add Subscription text visibility
      verify.containsText  ( "h1.ng-scope","Add Subscription" ).
      pause ( 7000 );
      //Set the URL in the URL field only if the URL is Youtube and Valid
      if  ( new RegExp ( youtube ).test ( YoutubeURL [ incrementer ] ) == true )  
      {
      client.
      useXpath ( ). 
      //Clicking the Youtube Subscription button
      verify.visible ( "//ul/li/a[contains ( .,'YouTube' ) ]" ).
      pause ( 5000 ).
      click ( "//ul/li/a[contains ( .,'YouTube' ) ]" ).
      useCss ( ).
      //checking whether the control is in Add Subscription Page
      verify.visible ( ".typeName-label" ).
      useXpath ( ).
      //Passing the Value to the Subscription URL text field.
      setValue ( "//INPUT[@id='subscription_url']",YoutubeURL [ incrementer ] ).
      useCss ( ).
      pause ( 5000 ).
      //Clicking the Next button in the Add Subscription button
      verify.visible  ( "button.btn:nth-child ( 2 )" ).
      click  ( "button.btn:nth-child ( 2 )" ).
      pause  ( 5000 ).
      useCss  ( ).
      //Checking whether the Control has moved to next page.
      waitForElementVisible  (".typeName-label",5000,false).
      //Clicking the Ingestion frequency OFF dropdown      
      click  ( ".default-item>a" ).
      pause  ( 5000 ).
      useXpath  ( ).
      //Making the Ingestion frequency OFF
      click  ( "//a[@class='ellipsis ng-binding'][contains ( .,'"+ ingestionTime [ incrementer ] +"' ) ]" ).
      pause  ( 5000 ).
      //Checking the Subscribe button visibility
      waitForElementVisible  (  "//A[@class='btn btn-primary pull-right button-fetch ng-scope'][contains ( .,'Subscribe' ) ]",5000,false ).
      //Clicking the Subscribe button
      click  ( "//A[@class='btn btn-primary pull-right button-fetch ng-scope'][contains ( .,'Subscribe' ) ]" ).
      pause  ( 5000 ).
      //Checking the Subscribe button visibility
      waitForElementNotPresent  ( "//A[@class='btn btn-primary pull-right button-fetch ng-scope'][contains ( .,'Subscribe' ) ]",5000,false ).
      pause  ( 5000 ).
      useCss  ( ).
      waitForElementVisible  ( "li.selected-item:nth-child (2) > a:nth-child (1)",5000,false ).
      pause  ( 5000 ).
      //Checking the Delete button visibility
      verify.visible  ( ".btn-delete" ).
      pause  ( 5000 ).
      //Checking the Copy Button in the Subscription URL field
      verify.visible  ( ".btn-pullout" ).
      pause  ( 5000 ).
      //Checking the Save button visibility
      verify.visible  ( ".btn-saved > span:nth-child (2)" ).
      useXpath  ( ).  
      //Navigates to the Video List page.
      click  ( "//ul/li/a[text ( ) ='Videos']" ).
      //Checks whether the Spinner is Present
      waitForElementVisible  ( "//DIV[@class='spinner']",5000,false ).
      //Checks whether the Spinner is not Present
      waitForElementNotVisible  ( "//DIV[@class='spinner']",5000,false ).
      useCss  ( ).
      pause  ( 120000 )
  }
}
else
{
  //Initializing the incrementer value to invalid row variable
  var invalidRow = incrementer;
  client.
  //If the URL is invalid then it will return as Test fail and updated in the Excel sheet
  verify.fail  ( "Invalid URL", "Vlid URL", "Please Enter Valid URL in Excel" ).
  //Writing the Fail result in the Excel Sheet with appropriate reason
  writeToExcelFail  ( 'boxxspring.xlsx' , 'SubscriptionYoutubeAdd' , ++invalidRow , 4,5,"Invalid URL" );
}
client.end ();
}
}
}