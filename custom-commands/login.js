//this function is for check and add login in portal and check to change THEME
exports.command = function ( uri, username, password ) {
  this.url ( uri ).
  //waiting for Portal body presence
  waitForElementVisible ( 'body', 4000 ).
  //Entering Username in the login page
  setValue ( 'input[ type=email ]', username ).
  //Entering Password in the login page
  setValue ( 'input[ type=password ]', password ).
  //wait and click on submit button in the login page
  waitForElementVisible ( 'input[ name=commit ]', 4000, false ).
  click ( 'input[ name=commit ]' ).  
  //verify the Portal body presence
  verify.elementPresent ( "body" ).
  pause ( 4000 ).
  //wait and verify the Portal property panel presence
  waitForElementVisible ( '.property-panel', 4000, false ).
  pause ( 4000 ).
  // wait and verify Current theme presence
  waitForElementVisible ( ".current-property-name", 4000, false ).
  pause ( 4000 ).
  //Get the Actual Theme in the page
  getText ( ".current-property-name", function ( checkTheme ) {
    var expectedTheme = "SPORTSROCKET AUTO QA";
    var actualTheme = checkTheme.value;
    console.log ( actualTheme );
    if ( actualTheme == expectedTheme ) {
      console.log ( "passed" );
    }
    else {    
      this.pause ( 4000 ).
      //Verify the Hamburger menu is visible
      verify.visible ( ".hamburger" ).
      pause ( 4000 ).
      //Click on the Hamburger menu
      click ( ".hamburger" ).
      pause ( 4000 ).
      //wait and search the themes in the property
      waitForElementVisible ( ".property-search", 4000 , false).
      pause ( 4000 ).
      //Enter the data in the search input field
      setValue ( ".property-search", 'SPORTSROCKET AUTO QA' ).
      pause ( 4000 ).
      //click on the searched theme
      click ( ".property-panel > ul > li:nth-child( 1 ) > a:nth-child( 1 )" ).
      pause ( 4000 ).
      //check and verify the current Theme in the property
      verify.containsText ( ".current-property-name", "SPORTSROCKET AUTO QA" ).
      pause ( 4000 );
    }
  } );
  return this;
};