//This function is to check and delete the Subscription
var request = require( 'request' );
var getSearchResult;
var subIncrementer;
var temp;
var searchContent = [];
var ingestionTime = [];
var getSearchResult = "https://api.staging.boxxspring.com/properties/79/subscriptions?access_token=c4b4e9a62395f967d5b7738328d12a43&name.like=undefined"
var xlsx = require( 'xlsx' );
var fs = require( 'fs' );
var Excel = require( 'exceljs' );
var workbook1 = new Excel.Workbook();
if ( typeof require !== 'undefined' )  XLSX = require( 'xlsx' );
try
{
  var workbook = XLSX.readFile( 'boxxspring.xlsx', {
    cellStyles: true
  } );
  var worksheet = workbook.Sheets[ 'DeleteSubscription' ];
}
catch( err ) 
{
  console.log( "Please check File name" ); 
}
module.exports = {
  tags : [ 'subscriptionDelete' ],    
  before: function( browser )  {
    var profile = browser.globals.profile;
    browser.windowMaximize().
    login( profile.portalUri, profile.username, profile.password );
  },
  'Updating the Subscription Title': function( deleteSubscription )  {
    try{
      for ( z in worksheet )  {
        if( z[0] === '!' )  continue;
        else if( z.includes( 'B' )  )  {
          searchContent.push( worksheet[z].v );
        }
      }
    }
    catch( err ) {
      console.log ( "Unable to load file!" );
    }
    deleteSubscription.
    useXpath (). 
    click( "( //DIV[@class='content-header content ng-scope'] ) [3]" ).
    pause( 5000 )
    for ( subIncrementer = 1,temp = 1; subIncrementer <= searchContent.length-1; subIncrementer++ )  {
      deleteSubscription.
      pause( 7000 ).
      useXpath().
      //Checking the Subscription button is visibility
      waitForElementPresent ( "//ul/li/a[text() ='Subscriptions']",5000,false,function( activeStatus ){
        //if the Subscription button is not visible then Click on Curation button and then click on Subscription button 
        if ( activeStatus.value == true ) {
          deleteSubscription.
          useXpath ().
          //Clicking the Curation button from the sidebar
          click ( "( //DIV[@class='content-header content ng-scope'] ) [3]" ).
          pause ( 5000 ).
          //Clicking the Subscription button from the dropdown
          click ( "//ul/li/a[ text()  ='Subscriptions']" )
        }
        //if the Subscription button is visible then Click directly on the Subscription button
        else
        {
          deleteSubscription.
          useXpath ().
          pause ( 5000 ).
          //Clicking the Subscription button from the dropdown
          click ( "//ul/li/a[text() ='Subscriptions']" );
        }
      });
      deleteSubscription.
      //Checking the Search Input field visibility in the Subscription list page
      verify.visible ( "//DIV[@class='suggestion-dropdown-wrap']" ).
      pause ( 5000 ).
      useXpath ().
      //Entering the values in the Search field from Excel sheet
      setValue ( "( //INPUT[@autocomplete='off'])[2]",searchContent[ subIncrementer ] ).
      pause ( 5000 ).
      //Checking the Search functionality
      getText ( "//DIV[@class='container']",function( searchResult )
      {
        //Checking whether the Search results in the Subscription list page
        if ( searchResult.value != "⬇Last modified\nNo results found\nTry checking your spelling or using more general keywords" )
        {
          deleteSubscription.
          //Checking the  Visibility of Edit Button in Subscription list page
          waitForElementPresent( "(//SPAN[@class='btn-pullout'])[1]",5000,false ).
          pause ( 5000 ).//5 seconds
          //Checking the  Visibility of Update Button in Subscription list page
          waitForElementPresent ( "(//SPAN[@class='btn-pullout'])[2]",5000,false ).
          pause ( 5000 ).//5 seconds
          //Clicking the Searched Subscription
          click ( "//DIV[@class='content-title']" ).
          pause ( 5000 ).//5 seconds
          //Checking whether the Edit button is not present after navigating to Edit Subscription page
          waitForElementNotPresent( "(//SPAN[@class='btn-pullout'])[1]",5000,false ).
          pause ( 5000 ).//5 seconds
          //Checking whether the Edit button is not present after navigating to Edit Subscription page
          waitForElementNotPresent ( "(//SPAN[@class='btn-pullout'])[2]",5000,false ).
          pause ( 5000 ).
          useCss ().
          //Checking the Save button Visibility
          waitForElementPresent( ".btn-saved" , 5000, false ).
          pause ( 5000 ).
          useXpath ().
          //Checking the Subscription URL in the URL field
          waitForElementPresent ( "//INPUT[@id='subscription_source_url']",5000,false ).
          pause ( 5000 ).
          //Checking the Provider name in the Provider field
          waitForElementPresent ( "//DIV[@class='input-like subscriptions ng-binding ng-scope']",5000,false ).
          pause ( 5000 ).//5 seconds
          //Checking the Attribution name in the Attribution field
          waitForElementPresent ( "//DIV[@ng-if='attribution.name']",5000,false ).
          pause ( 5000 ).//5 seconds
          useCss ().
          //Checking the Delete button visibility
          verify.visible ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
          //Clicking the Delete button in the Subscription Edit page
          click ( ".btn-delete > span[ ng-click='showDeleteVerification();']" ).
          pause ( 7000 ).
          //Check the existance of delete confirmation to delete
          verify.visible ( "dialog[ name=deleteVerification ]" ).
          //Checking the existance of Delete button in the Delete dialog
          verify.visible ( "button.btn:nth-child(2)" ).
          //Clicking the Delete button in the Delete dialog box
          click ( "button.btn:nth-child(2)" ).
          pause ( 5000 ).
          useXpath ().
          //Clicking the Subscription button from the Side bar
          click( "//ul/li/a[text()  ='Subscriptions']" ).
          pause ( 5000 ).
          //Entering the Search content in the Search field
          setValue (" ( //INPUT[@autocomplete='off'])[2]",searchContent [ temp ] ).
          pause ( 5000 ).
          //Getting the Search results
          getText ( "//DIV[@class='container']",function ( res ){
            //Storing the values in getSearchResult variable
            getSearchResult = res.value;
          });
          //Requesting the API to get Search result count
          request ( 'https://api.staging.boxxspring.com/properties/81/subscriptions?access_token=c4b4e9a62395f967d5b7738328d12a43&name.like="'+searchContent[temp]+'"', function(err, res, body)
          {
            //storing the values in the searchResultCount variable
            var searchResultCount = JSON.parse ( body );
            //Checking the API results and Search results
            if( searchResultCount.$this.count == 0 && getSearchResult == "⬇Last modified\nNo results found\nTry checking your spelling or using more general keywords" )
            {
              deleteSubscription.
              //If condition results true PASS status will be updated in the Excel Sheet
              writeToExcelPass ( 'boxxspring.xlsx' , 'DeleteSubscription' , subIncrementer , 3 )
            }
            else
            {
              deleteSubscription.
              //If condition results false Fail status will be updated in the Excel Sheet
              writeToExcelFail ( 'boxxspring.xlsx' , 'DeleteSubscription' , subIncrementer , 3,4,"It seems that there are Duplicates Please delete and Try again" ).
              verify.fail ( "It seems that there are some duplicate exists in Subscription","Subscription should get deleted Successfully","Please delete the Duplicates and Try again" )
            }
          })
        }
        else
        {
          //If there is no search results found then Fail status will get updated in Excel sheet
          deleteSubscription.
          writeToExcelFail ( 'boxxspring.xlsx' , 'DeleteSubscription' , subIncrementer , 3,6, "Your Searched content is not available in the Subscription list page" ).
          verify.fail ( "Unable to find Subscription","Subscription should get deleted Successfully","Please provide valid Subscription name" )  
        }
      });
      deleteSubscription.end ();
    }
  }
}