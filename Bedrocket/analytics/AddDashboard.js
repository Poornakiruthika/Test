var actualTotal;
var currentTheme;
module.exports = function(browser){
  this.AddingDashboard = function() {
    browser.
       pause(10000).
       waitForElementVisible('.boxx-resource-server-title',90000,false).
       pause(9000).
       verify.visible(".boxx-resource-server-title" , "ANALYTICS").
       pause(9000).
       //Getting the Current Total of Dashboards from Dashboard listpage
       getText('.content-count > strong' , function( result )
     		{
       		var actualTotal=result.value;
       		console.log("Current Total",actualTotal);
       		browser.
	   		verify.visible("body > div:nth-child(2) > span > ng-include > nav > div.sidebar-container > div > div.sidebar-header.ng-isolate-scope > span" , "SPORTSROCKET AUTO QA LIBRARY").
   			pause(19000).
       		verify.visible("ng-include.sidebar:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > div:nth-child(1) > a:nth-child(2)" , "DASHBOARDS").
       		pause(5000).
       		click("ng-include.sidebar:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > div:nth-child(1) > span:nth-child(3) > a:nth-child(1)").
       		pause(5000).
       		click('.text-input-headline').
       		pause(5000).
       		setValue('.text-input-headline','Automation1').
       		pause(5000).verify.visible(".empty-page-description" , "Add charts to your dashboard to track different sets of data.").
      		 //Verifies the Add button visibility
      		verify.visible('.btn-primary' , "Add").
   			//Clicks on Add button
       		click(".col-3 > button:nth-child(1)").
      		 //Checks the Contents displayed after Clicking Add button
       		verify.visible('li.content > div:nth-child(1)').
       		click('div.dashboard-dropdown:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)').
       		pause(5000).
       		//Selects the Metric Type as Plays
       		click('.dropdown-list > li:nth-child(1) > a:nth-child(1)').
       		pause(5000).
       		//Selects the Chart type as Total.
       		click('div.dashboard-dropdown:nth-child(3) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)').
       		pause(5000).
      		 // Clicks on Add Chart button
       		click('.dropdown-list > li:nth-child(1) > a:nth-child(1)').
       		pause(5000).
       		//Clicks on Save Button
       		click('div.centered-content:nth-child(4) > a:nth-child(1) > button:nth-child(1)').
       		pause(5000).
      		//Clicks on Save button to Save a Dashboard
       		click('.btn-active').
       		pause(5000).
       		useCss().
       		//Clicks on All link in Contents Tab
       			getText('ng-include.sidebar:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)' , function( result )
       			{
       				var currentTheme=result.value;
       				console.log("Changed Current theme",currentTheme);
       				if( currentTheme == "SPORTSROCKET AUTO QA LIBRARY" )
       				{
       					browser.
       					useXpath().
      					click('(//A[@href="/properties/80/dashboards"][text()="All"][text()="All"])[2]')
      				}
      				else
      				{
      					browser.
      					click('(//A[@href="/properties/80/dashboards"][text()="All"][text()="All"])[2]')
      				}
       			});
       		browser.
       		pause(9000)
       		var expectedTotal = parseInt( actualTotal ) + 1
       		browser.
       		useCss().
       		//Checking the Updated Total in the Dashboard List Page
       		verify.visible('.content-count > strong',expectedTotal)
   		});
       return browser;
    },
    this.addDashboardwithMoreDashboards = function()
    {

      browser.
            click()



    }
};



