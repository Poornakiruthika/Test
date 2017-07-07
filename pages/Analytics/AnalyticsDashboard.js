var xlsx = require('xlsx');
var fs = require('fs');
var Excel = require('exceljs');
var workbook1 = new Excel.Workbook();
if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('Analytic.xlsx', 
{
	cellStyles: true
});
var currentCount;
var worksheet = workbook.Sheets['Analytics'];
var dashboardName = [];
var result = [];
var expectedCount;
var j=0;
var z;
var addDashboards = {
	'addDashboard' : function() {
		for (z in worksheet) {
			if (z[0] === '!') continue;
      //Read Dashboard Title
      if (z.includes('F')) {	
      	dashboardName.push(worksheet[z].v);
      	console.log(worksheet[z].v);
      }
  }
  for (var i = 1; i < dashboardName.length; i++) {
  	this.api.pause(9000).
  	useCss().
  	//Getting the initial count of the Dashboards present
  	getText('.content-count > strong' , function( result )
  	{
  		var actualTotal=result.value;
  		console.log("Current Total",actualTotal);
  	});
  	return this.
  	//Clicking on the Add button from the Index page
  	waitForElementVisible('@addButtonListPageCss', 9000,false).
  	click('@addButtonListPageCss').
  	waitForElementNotPresent('@addButtonListPageCss',5000,false).
  	//Waiting for the Title field to be present
  	waitForElementVisible('@dashboardTitleField', 1000).
  	verify.visible('@visibleText' , "Add").
  	//clicking the Title field
  	click('@dashboardTitleField').
  	//Entering the Title field from Excel doc
  	setValue('@dashboardTitleField',dashboardName[i]).
  	//Clicking on Add Chart button Near the title field
  	click('@addChartButtonCss').
  	//Clicking the Choose metrics Drop down
  	waitForElementVisible('@chooseMetricCss', 5000).
  	click('@chooseMetricCss').
  	//Selecting the Metrics from the Drop down
  	waitForElementVisible('@playsCss', 5000).
  	click('@playsCss').
  	//Clicking the Choose Chart type Drop down
  	waitForElementVisible('@chooseCharttypeCss', 5000).
  	click('@chooseCharttypeCss').
  	//Selecting the Chart type from the Drop down
  	waitForElementVisible('@TotalCss', 5000).
  	click('@TotalCss').
  	//Clicking the Add chart button in the Add a chart section
  	waitForElementVisible('@addChartCss',5000).
  	click('@addChartCss').
  	waitForElementNotPresent('@addChartCss',5000,false).
  	//Clicking the Save button
  	waitForElementVisible('@saveButtonCss', 5000).
  	click('@saveButtonCss').
  	//Checking Save button is not present after saving
  	waitForElementNotPresent('@saveButtonCss',9000).
  	//Clicking the All link from the side bar
  	waitForElementVisible('@sportsRocketQaIndexPage',5000).
  	click('@sportsRocketQaIndexPage').
  	//getting the Updated totla of Dashboard present in the Index page
  	waitForElementVisible('@dashboardCount',9000).
  	getText('@dashboardCount' , function( resullt )
  	{
  		var expectedCount=resullt.value;
  		console.log("Updated Total",expectedCount);
  	});
  }
}
};
module.exports = 
{
	url: function() { 
		return this;
	},
	commands: [addDashboards],
	elements:
	{
		//Add button either by Sidebar or Listpage
		addIconSidebar : "(//IMG[@src='assets/icons/plus_icon_white@2x.png'])[2]",
		addButtonListPageXpath : "//BUTTON[@class='btn btn-primary btn-add ng-binding']",
		// addButtonListPageCss : "ng-include.sidebar:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > div:nth-child(1) > span:nth-child(3) > a:nth-child(1)",
		addButtonListPageCss : "button.ng-binding",  
		//Visible Text before adding the Chart
		visibleText : ".empty-page-description",  								
		//Dashboard Title Filed
		dashboardTitleField : '.text-input-headline',
		//Add Chart button
		addChartButtonXpath : "//BUTTON[@class='btn btn-primary']",
		addChartButtonCss : ".col-3 > button:nth-child(1)",
		//Click on DropDown Choosing the Metric
		chooseMetricXpath : "//A[@ng-click='toggleFilterDropdown()'][text()='Choose metric']",
		chooseMetricCss : "div.dashboard-dropdown:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)",
		//Selecting the Metric
		playsXpath : "//A[@ng-click='component.metric = metricType; toggleFilterDropdown()'][text()='Plays']",
		playsCss : ".dropdown-list > li:nth-child(1) > a:nth-child(1)",
		AdPlaysXpath : "//A[@ng-click='component.metric = metricType; toggleFilterDropdown()'][text()='Ad plays']",
		AdPlaysCss : ".dropdown-list > li:nth-child(2) > a:nth-child(1)",
		ImpressionsXpath : "//A[@ng-click='component.metric = metricType; toggleFilterDropdown()'][text()='Impressions']",
		ImpressionsCss : ".dropdown-list > li:nth-child(3) > a:nth-child(1)",
		pausesXpath : "//A[@ng-click='component.metric = metricType; toggleFilterDropdown()'][text()='Pauses']",
		pausesCss : ".dropdown-list > li:nth-child(4) > a:nth-child(1)",
		adCompletionXpath : "//A[@ng-click='component.metric = metricType; toggleFilterDropdown()'][text()='Ad Completions']",
		adCompletionCss : ".dropdown-list > li:nth-child(5) > a:nth-child(1)",		
		visitorsXpath : "//A[@ng-click='component.metric = metricType; toggleFilterDropdown()'][text()='Visitors']",
		visitorsCss : ".dropdown-list > li:nth-child(6) > a:nth-child(1)",
		sessionsXpath : "//A[@ng-click='component.metric = metricType; toggleFilterDropdown()'][text()='Sessions']",
		sessionsCss : ".dropdown-list > li:nth-child(7) > a:nth-child(1)",
		//Click on DropDown Choosing the Charttype
		chooseCharttypeXpath : "//A[@ng-click='toggleFilterDropdown()'][text()='Choose chart type']",
		chooseCharttypeCss : "div.dashboard-dropdown:nth-child(3) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)",
		//Selecting the Charttype
		TotalXpath : "//A[@ng-click='component.chartType = chartType; toggleFilterDropdown()'][text()='Total']",
		TotalCss: ".dropdown-list > li:nth-child(1) > a:nth-child(1)",
		rankedListXpath : "//A[@ng-click='component.chartType = chartType; toggleFilterDropdown()'][text()='Ranked List']",
		segmentedByLocationXpath : "//A[@ng-click='component.chartType = chartType; toggleFilterDropdown()'][text()='Segmented by Location']",
		segmentedByDevicesXpath : "//A[@ng-click='component.chartType = chartType; toggleFilterDropdown()'][text()='Segmented by Device']",
		//Add ChartButton
		addChartXpath :"//BUTTON[@class='btn btn-primary'][text()='Add Chart']",
		addChartCss : "div.centered-content:nth-child(4) > a:nth-child(1) > button:nth-child(1)",
		//Delete Icon in Add Chart
		deleteIconXpath : "(//I[@class='ss-gizmo ss-icon'][text()='␡'][text()='␡'])[3]",
		//Save Button
		saveButtonCss : ".btn.btn-icon.btn-active",
		//Search field
		searchFieldCss : ".categories-widget",
		searchFieldXpath : "//DIV[@class='categories-widget']",
		//All link from sidebar
		sportsRocketQaIndexPage : "ng-include.sidebar:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(11) > a:nth-child(1)",
		//Dashboard count in Index page
		dashboardCount : "strong.ng-binding",
		initialCount : ".content-count > strong"

	}	
}
