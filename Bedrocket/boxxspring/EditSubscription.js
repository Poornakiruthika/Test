//This function is to check and Edit the Subscription
var request = require( 'request' );
var subIncrementer;
var temp;
var searchContent = [];
var subscriptionTitle= [];
var categoryName = [];
var unique = [];
var countBeforeAdd;
var expectedCount;
var countAfterAdd;
var rowCount = 1;
var ingestionTime = [];
var afterComma = [];
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
  var worksheet = workbook.Sheets[ 'SubscriptionEdit' ];
}
catch( err ) 
{
  console.log ( "Please check File name" ); 
}
module.exports = {
  tags : [ 'subscriptionEdit' ],
  before: function ( browser )  {
    var profile = browser.globals.profile;
    browser.windowMaximize().
    login ( profile.portalUri, profile.username, profile.password );
  },
  'Updating the Subscription Title': function ( editSubscription )  {
    try{
      for ( z in worksheet )  {
        if( z[0] === '!' )  continue;
        else if ( z.includes ( 'D' )  )  {
          ingestionTime.push ( worksheet[z].v );
        }
        else if ( z.includes ( 'B' )  )  {
          searchContent.push ( worksheet[z].v );
          console.log("Search Content",searchContent);
        }
        else if ( z.includes ( 'C' )  )  {
          subscriptionTitle.push ( worksheet[z].v );
        }
      }
    }
    catch ( err ) 
    {
      editSubscription.
      verify.fail("Unable to load Excel sheet");
    }
    editSubscription.
    useXpath (). 
    click ( "( //DIV[@class='content-header content ng-scope'] )[3]" ).
    pause ( 5000 )
    for ( subIncrementer = 1,temp=1; subIncrementer <=subscriptionTitle.length-1; subIncrementer++ )  {
      editSubscription.
      pause ( 7000 ).
      useXpath ().
      //Checking the Subscription button is visibility
      waitForElementPresent ( "//ul/li/a[text() ='Subscriptions']",5000,false,function( activeStatus ){
        //if the Subscription button is not visible then Click on Curation button and then click on Subscription button 
        if ( activeStatus.value == true ) {
          editSubscription.
          useXpath ().
          click ( "( //DIV[@class='content-header content ng-scope'] )[3]" ).
          pause ( 5000 ).
          click ( "//ul/li/a[text()  ='Subscriptions']" );
        }
        //if the Subscription button is visible then Click directly on the Subscription button
        else
        {
          editSubscription.
          useXpath().
          pause ( 5000 ).
          //Clicking the Subscription button from the Side Bar
          click ( "//ul/li/a[text() ='Subscriptions']" );
        }
      });
      editSubscription.
      //Checking the Visibility of the Search Field in the Subscription List page
      verify.visible ( "//DIV[@class='suggestion-dropdown-wrap']" ).
      pause ( 5000 ).//5 seconds
      //Passing the Values in the Search Field from Excel sheet
      setValue ( " ( //INPUT[@autocomplete='off'])[2]",searchContent[ subIncrementer ]  ).
      pause ( 5000 ).
      //Fetching the results after Searching the Subscription
      getText ( "//DIV[@class='container']",function( result )
      {
        if (result.value != "⬇Last modified\nNo results found\nTry checking your spelling or using more general keywords" )
        {
          editSubscription.
          //Checking the Edit button visibility
          waitForElementPresent ( "(//SPAN[@class='btn-pullout'])[1]",5000,false ).
          pause ( 5000 ).//5 seconds
          //Checking the Update now button visibility
          waitForElementPresent ( "(//SPAN[@class='btn-pullout'])[2]",5000,false ).
          pause ( 5000 ).//5 seconds
          //clicking the Subscription
          click ( "//DIV[@class='content-title']" ).
          pause ( 5000 ).//5 seconds
          //Checking the Edit button visibility
          waitForElementNotPresent ( "(//SPAN[@class='btn-pullout'])[1]",5000,false ).
          pause ( 5000 ).//5 seconds
          //Checking the Update now button visibility
          waitForElementNotPresent ( "(//SPAN[@class='btn-pullout'])[2]",5000,false ).
          pause ( 5000 ).//5 seconds
          useCss ().
          //Checking the Save button visibility
          waitForElementPresent ( ".btn-saved" , 5000, false ).
          //Clearing the datas in Subscription title field
          clearValue ( '.text-input-headline').
          //Enetering the Subscription values in the Title field
          setValue ( ".text-input-headline", subscriptionTitle[temp] ).
          pause ( 5000 ).//5 seconds
          //Clearing the Categories in the Categories field
          pause ( 5000 ).//5 seconds
          useXpath ().
          //Checking the Subscription URl field visibility
          waitForElementPresent ( "//INPUT[@id='subscription_source_url']",5000,false ).
          pause ( 5000 ).//5 seconds
          //Checking the Provider name field visibility
          waitForElementPresent ( "//DIV[@class='input-like subscriptions ng-binding ng-scope']",5000,false ).
          pause ( 5000 ).//5 seconds
          //Checking the Attribution field visibility
          waitForElementPresent ( "//DIV[@ng-if='attribution.name']",5000,false ).
          pause ( 5000 ).//5 seconds
          //Adding Categories to the Subscription
          pause ( 3000 ).
          useCss ().
          pause ( 5000 ).//5 seconds
          waitForElementNotPresent ( ".btn-saved" , 5000, false ).
          pause ( 5000 ).//5 seconds
          //Clicking on the Save Button
          click ( ".btn-active " ).
          pause ( 5000 ).
          useXpath ().
          //Navigating Back to the Subscription liat page
          click ( "//ul/li/a[text()  ='Subscriptions']" ).
          pause ( 5000 ).
          //Searching for updated Subscription in the Subscription list page
          setValue ( " ( //INPUT[@autocomplete='off'])[2]",subscriptionTitle[temp] ).
          pause ( 5000 ).
          //Fetching the Search results in Subscription list page
          getText( "//H2[@class='ng-binding']",function( results )
          {
            // checkig the updated Subscription title with the Excel sheet data.
            if ( results.value == subscriptionTitle[ temp ] )
            {
              editSubscription.
              //If the Condition pass then Pass status is updated in the Excel sheet
              writeToExcelPass ( 'boxxspring.xlsx' , 'EditSubscription' , subIncrementer , 5 )
            }
            else
            {
              editSubscription.
              verify.fail ( "Edit Subscription Failed","Subscription should get updated","Please check for the Duplicates in Subscription" ).
              //If the Test fail Fail status will be updated in Excel sheet
              writeToExcelFail ( 'boxxspring.xlsx' , 'EditSubscription' , subIncrementer , 5,6, "ActualResult:Subscription Title not updated - please try again" )
            }
            if ( temp <= subscriptionTitle.length-1 )
            {
              temp++;  
            }
          });
        }
        else
        {
          editSubscription.
          writeToExcelFail('boxxspring.xlsx' , 'EditSubscription' , subIncrementer , 5,6, "ActualResult:Subscription does not exist - please try again" ).
          verify.fail ( "Unable to find Subscription","Subscription should get updated","Please provide valid Subscription name" )
          //If the Test fail Fail status will be updated in Excel sheet
        }
        editSubscription.end ();
      });
}
}
}