//this function is for check and add the Subscription
var subscriptionURL = [];
var request = require( 'request' );
var getSearchResult = "https://api.staging.boxxspring.com/properties/79/subscriptions?access_token=c4b4e9a62395f967d5b7738328d12a43&name.like=undefined"
var temp;
var tempDelete;
var searchContent = [];
var ingestionTime = [];
var subscriptionTitle= [];
var searchContentDelete = [];
var countAfterAdd;
var countBeforeAdd;
var ingestionTime = [];
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
  var worksheet = workbook.Sheets[ 'SubscriptionDailymotionAdd' ];
  var editSubscriptionSheet = workbook.Sheets[ 'SubscriptionEdit' ];
  var deleteSubscriptionSheet = workbook.Sheets[ 'DeleteSubscription' ];


}
catch ( err ) 
{
  console.log ( "Please check File name" ); 
}
module.exports = {
  tags:[ 'subscriptionDailymotionAdd' ],
  before: function ( browser )  {
    var profile = browser.globals.profile;
    browser.windowMaximize ( ).
    login ( profile.portalUri, profile.username, profile.password );

  },
  'Adding New Subscription': function ( client )  {
    try{
      for  ( z in worksheet )  {
        if ( z[ 0 ] === '!' )  continue;
        else if ( z.includes ( 'B' )  )  {
          subscriptionURL.push ( worksheet[ z ].v );
          console.log(subscriptionURL);  
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
    pause ( 3000 ).
    //Click on the Curation Button from the SideBar
    click ( " ( //DIV[@class='content-header content ng-scope'] )[3]" ).
    pause ( 5000 )
    for  ( var incrementer = 1,temp=1; incrementer <= subscriptionURL.length-1; incrementer++ )
    {
      client.
      pause ( 3000 ).
      useXpath ().
      //Checking the Subscription button is visibility
      waitForElementPresent ( "//ul/li/a[text ( ) ='Subscriptions']",5000,false,function ( activeStatus ){
        //if the Subscription button is not visible then Click on Curation button and then click on Subscription button 
        if ( activeStatus.value == true ) {
          client.
          useXpath ( ).
          //Clicking the Curation link from the sidebar
          click ( " ( //DIV[@class='content-header content ng-scope'] )[3]" ).
          pause ( 5000 ).
          //Clicking the Subscription link from the Sidebar
          click ( "//ul/li/a[text ( )  ='Subscriptions']" )
        }
        //if the Subscription button is visible then Click directly on the Subscription button
        else
        {
          client.
          useXpath ( ).
          pause ( 5000 ).
          //clicking the Subscription button
          click ( "//ul/li/a[text() ='Subscriptions']" );
        }
      });
      client.
      useCss().
      pause ( 5000 ).
      //Fetching the Total count of Subscription before adding the Subscription
      getText( '.pull-left.content-count > .ng-binding', function( beforeCount ) {
        if ( beforeCount.status !== -1 ) 
        {
          //Storing the value in the countBeforeAdd variable.
          countBeforeAdd = beforeCount.value;
          console.log("Count",countBeforeAdd);
        }
      })
      client.
      pause ( 5000 ).
      useXpath().
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
      pause ( 7000 ).
      //Set the URL in the URL field only if the URL is Youtube and Valid
      useXpath ( ). 
      //Clicking the Youtube Subscription button
      verify.visible ( "//ul/li/a[contains ( .,'DailyMotion' ) ]" ).
      pause ( 5000 ).
      click ( "//ul/li/a[contains ( .,'DailyMotion' ) ]" ).
      useCss ( ).
      //checking whether the control is in Add Subscription Page
      verify.visible ( ".typeName-label" ).
      waitForElementPresent( ".text-input-headline" ,5000 ,false).
      setValue( ".text-input-headline" , "DailyMotion1").
      useXpath ( ).
      //Passing the Value to the Subscription URL text field.
      setValue ( "//INPUT[@id='subscription_url']",subscriptionURL [ incrementer ] ).
      useCss ( ).
      pause ( 5000 ).
      //Checking the next button visibility.
      verify.visible  ( "button.btn:nth-child(2)" ).
      //Clicking the Next button 
      click  ( "button.btn:nth-child(2)" ).
      pause( 5000 ).
      //Getting the Error message
      waitForElementNotPresent( "//SPAN[@class='ng-binding ng-scope'][text()='Not a valid  playlist or channel URL']" ,5000,function(invalidURL)
      {
        //If no error message is displayed then control proceeds further
        if(invalidURL.status != 0)
        {
          client.
          useCss  ( ).
          //Checking whether the Control has moved to next page.
          waitForElementVisible  (".typeName-label",5000,false).
          //Clicking the Ingestion frequency OFF dropdown      
          click  ( ".default-item > a" ).
          pause  ( 5000 ).
          useXpath  ( ).
          //Making the Ingestion frequency OFF
          click  ( "//a[@class='ellipsis ng-binding'][contains ( .,'"+ ingestionTime[temp] +"' ) ]" ).
          j++;
          client.
          pause  ( 5000 ).
          //Checking the Subscribe button visibility
          waitForElementVisible  (  "//A[@class='btn btn-primary pull-right button-fetch ng-scope'][contains(.,'Subscribe')]",5000,false ).
          //Clicking the Subscribe button
          click  ( "//A[@class='btn btn-primary pull-right button-fetch ng-scope'][contains(.,'Subscribe')]" ).
          pause  ( 15000 ).
          //Checking the Subscribe button visibility
          waitForElementNotPresent  ( "//A[@class='btn btn-primary pull-right button-fetch ng-scope'][contains(.,'Subscribe')]",5000,false ).
          pause  ( 5000 ).
          useCss  ( ).
          //Checking the Ingestion time visibility
          waitForElementVisible  ( "li.selected-item:nth-child(2) > a:nth-child(1)",5000,false ).
          pause  ( 5000 ).
          //Checking the Delete button visibility
          verify.visible  ( ".btn-delete" ).
          pause  ( 5000 ).
          //Checking the Copy Button in the Subscription URL field
          verify.visible  ( ".btn-pullout" ).
          pause  ( 5000 ).
          //Checking the Save button visibility
          verify.visible  ( ".btn-saved > span:nth-child(2)" ).
          pause(5000).
          useXpath().
          //Clicking the Subscription button from the Sidebar
          click ( "//ul/li/a[text ( )  ='Subscriptions']" ).
          pause(5000).
          setValue ( " ( //INPUT[@autocomplete='off'])[2]", "DailyMotion1"  ).
          pause ( 5000 ).
          //Fetching the results after Searching the Subscription
          getText ( "//DIV[@class='container']",function( result )
          {
            if (result.value != "⬇Last modified\nNo results found\nTry checking your spelling or using more general keywords" )
            {
              client.
              writeToExcelPass( 'boxxspring.xlsx' , 'SubscriptionDailymotionAdd' , incrementer , 4,5);
            }
            else
            {
              client.
              writeToExcelFail( 'boxxspring.xlsx' , 'SubscriptionDailymotionAdd' , incrementer , 4,5,"DailyMotion subscription not added" ).
              verify.fail ( "Unable to find Subscription","Subscription should get updated","Please provide valid Subscription name" )

            }
          });
        }
        else
        {
          client.
          //Writing the Fail Status in the Excel sheet
          writeToExcelFail( 'boxxspring.xlsx' , 'SubscriptionDailymotionAdd' , incrementer , 4,5,"Please Check your URL" ).
          //Updating the Fail status in Console
          verify.fail( "Invalid URL", "Valid URL", "Please Enter Valid URL in Excel" )
        }
      })
}
},
'Updating the Subscription Title': function ( editSubscription )  {
    try{
      for ( z in editSubscriptionSheet )  {
        if( z[0] === '!' )  continue;
        else if ( z.includes ( 'D' )  )  {
          ingestionTime.push ( editSubscriptionSheet[z].v );
        }
        else if ( z.includes ( 'B' )  )  {
          searchContent.push ( editSubscriptionSheet[z].v );
          console.log("Search Content",searchContent);
        }
        else if ( z.includes ( 'C' )  )  {
          subscriptionTitle.push ( editSubscriptionSheet[z].v );
        }
      }
    }
    catch ( err ) 
    {
      editSubscription.
      verify.fail("Unable to load Excel sheet");
    }
    for ( subIncrementer = 1,temp=1; subIncrementer <=subscriptionTitle.length-1; subIncrementer++ )  {
      editSubscription.
      useXpath ().
      pause ( 7000 ).
      //Checking the Visibility of the Search Field in the Subscription List page
      verify.visible ( "//DIV[@class='suggestion-dropdown-wrap']" ).
      pause ( 5000 ).//5 seconds
      clearValue("( //INPUT[@autocomplete='off'])[2]").
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
              writeToExcelPass ( 'boxxspring.xlsx' , 'SubscriptionEdit' , subIncrementer , 5 )
            }
            else
            {
              editSubscription.
              verify.fail ( "Edit Subscription Failed","Subscription should get updated","Please check for the Duplicates in Subscription" ).
              //If the Test fail Fail status will be updated in Excel sheet
              writeToExcelFail ( 'boxxspring.xlsx' , 'SubscriptionEdit' , subIncrementer , 5,6, "ActualResult:Subscription Title not updated - please try again" )
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
          writeToExcelFail('boxxspring.xlsx' , 'SubscriptionEdit' , subIncrementer , 5,6, "ActualResult:Subscription does not exist - please try again" ).
          verify.fail ( "Unable to find Subscription","Subscription should get updated","Please provide valid Subscription name" )
          //If the Test fail Fail status will be updated in Excel sheet
        }
      });
}
},
'Deleting the Subscription Title': function( deleteSubscription )  {
    try{
      for ( z in deleteSubscriptionSheet )  {
        if( z[0] === '!' )  continue;
        else if( z.includes( 'B' )  )  {
          searchContentDelete.push( deleteSubscriptionSheet[z].v );
        }
      }
    }
    catch( err ) {
      console.log ( "Unable to load file!" );
    }
    for ( var subIncrementer = 1,tempDelete = 1; subIncrementer <= searchContentDelete.length-1; subIncrementer++ )  {
      deleteSubscription.
      useXpath ().
      //Checking the Search Input field visibility in the Subscription list page
      // verify.visible ( "//DIV[@class='suggestion-dropdown-wrap']" ).
      // pause ( 5000 ).
      // clearValue("( //INPUT[@autocomplete='off'])[2]").
      // //Entering the values in the Search field from Excel sheet
      // setValue ( "( //INPUT[@autocomplete='off'])[2]",searchContentDelete[ subIncrementer ] ).
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
          setValue (" ( //INPUT[@autocomplete='off'])[2]",searchContentDelete [ tempDelete ] ).
          pause ( 5000 ).
          //Getting the Search results
          getText ( "//DIV[@class='container']",function ( res ){
            //Storing the values in getSearchResult variable
            getSearchResult = res.value;
          });
          //Requesting the API to get Search result count
          deleteSubscription.
          request ( 'https://api.staging.boxxspring.com/properties/81/subscriptions?access_token=c4b4e9a62395f967d5b7738328d12a43&name.like="'+searchContent[tempDelete]+'"', function(err, res, body)
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