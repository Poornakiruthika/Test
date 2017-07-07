var deleteDashboard = {
	'deleteDashboard' : function(){
		this.
		getText('.content-count > strong' , function( result )
		{
			var actualTotal=result.value;
			console.log("Current Total",actualTotal);
		});
		return this.
		waitForElementVisible('@clickOrderBy',5000,false).
		click('@clickOrderBy').
		waitForElementVisible('@selectLastupdated',5000,false).
		click('@selectLastupdated').
		waitForElementVisible('@searchField',5000,false).
		setValue('@searchField','Automation1').
		waitForElementVisible("@clickDashboard",5000,false).
		click("@clickDashboard").
		waitForElementVisible('@deleteButton',5000,false).
		click("@deleteButton").
		waitForElementVisible("@alertBody",5000,false).
		waitForElementVisible("@confirmDelete",5000,false).
		click("@confirmDelete").
		waitForElementVisible("@clickAll",5000,false).
		click("@clickAll")
		return this;	
	}

};
module.exports = 
{
	url: function() { 
		return this;
	},
	commands: [deleteDashboard],
	elements:
	{
		searchField :{
			locateStrategy : 'xpath',
			selector : "//INPUT[@autocomplete='off']"
		},
		clickDashboard : {
			locateStrategy : 'xpath',
			selector : "(//DIV[@class='content-title'])[1]"
		},
		clickOrderBy : {
			selector : ".btn.btn-dropdown.dropdown-toggle"
		},
		selectLastupdated  : {
			selector : "ul.dropdown-menu:nth-child(3) > li:nth-child(2) > a:nth-child(1)"
		},

		selectDateAdded : 
		{
			selector : 'ul.dropdown-menu:nth-child(3) > li:nth-child(3) > a:nth-child(1)'
		},
		selectOrder :{
			selector: 'ul.dropdown-menu:nth-child(3) > li:nth-child(1) > a:nth-child(1)'
		},
		deleteButton :{
			selector : ".btn-default"
		},
		alertCheck : {
			locateStrategy : 'xpath',
			selector:"(//H1[@class='ng-binding'])[1]"
		},
		alertBody : {
			locateStrategy : 'xpath',
			selector : "(//SECTION[@class='dialog-content'])[1]"
		},
		confirmDelete : {
			selector : ".btn.btn-primary.btn-fluid.btn-red"
		},
		clickAll : {
		    selector : "ng-include.sidebar:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(11) > a:nth-child(1)"
	}	
}
}