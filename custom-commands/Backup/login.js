exports.command = function( uri, username, password ) {
  this.
    url( uri ).
    waitForElementVisible( 'body', 7000 ).
	assert.visible( "input[type=email]" ).
    setValue( 'input[type=email]', username ).
	assert.visible( "input[type=password]" ).
    setValue('input[type=password]', password ).
    waitForElementVisible( 'input[name=commit]', 1000 ).
    click( 'input[name=commit]' ).
    pause(2000).
	waitForElementVisible( '.content', 2000 ).
    assert.visible( ".content" ).
    assert.attributeEquals( "body", "ng-controller",  "ApplicationController" )

  return this;
};