module.exports = function(browser){
	this.deleteDashboard = function(){
		browser.
			useXpath().
			verify.visible( "(//A[@href='/properties/80/dashboards'][text()='All'][text()='All'])[2]" ).
			getText( "(//A[@href='/properties/80/dashboards'][text()='All'][text()='All'])[2]", function( result ) 
			{
				var currentLocation = result.value;
				console.log("current Location:" +currentLocation);
				browser.
				pause(5000).
				click("(//DIV[@class='content-title'])[1]").
				pause(5000).
				click("//A[@class='btn btn-icon btn-default']").
				pause(9000).
				verify.visible("(//H1[@class='ng-binding'])[1]").
				switchWindow().
				pause(5000).
				click("//BUTTON[@class='btn btn-primary btn-fluid btn-red'][text()='Delete']").
				pause(9000).
				click("//A[@href='/properties/80/dashboards'][text()='All'][text()='All'])[2]")
			});
			 return browser;	

	}

};