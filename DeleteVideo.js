module.exports = {
	before: function( browser )  {
		var profile = browser.globals.profile;
		browser.windowMaximize().
		login( profile.portalUri, profile.username, profile.password );
	},
	delete: function( client )
	{
		for (var i =1; i <= 300; i++) 
		{
			client.
			pause(5000).
			useXpath().
			click("//DIV[@class='list']").
			pause(5000).
			click("(//SECTION[@class='content-info generic'])[1]").
			pause(5000).
			useCss().
			verify.visible ( ".btn-delete > span[ ng-click='showDeleteVerification();'] ").
			click ( ".btn-delete > span[ ng-click='showDeleteVerification();'] " ).
			pause ( 7000 ).
            //Check the existance of delete confirmation to delete
            verify.visible ( "dialog[ name=deleteVerification ]" ).
            verify.visible ( "button.btn:nth-child(2)" ).
            click( "button.btn:nth-child(2)" ).
            useXpath().
            click("//A[@class='collection-name ng-binding'][text()='Videos']")
            console.log(i)
        }

    }
}